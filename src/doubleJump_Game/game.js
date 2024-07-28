import { useState, useEffect, useCallback } from 'react';
import './game.css';

function Platforms({ platforms }) {
    return platforms.map((platform, index) => (
        <div
            key={index}
            className="platform"
            style={{ left: `${platform.left}px`, bottom: `${platform.bottom}px` }}
        />
    ));
}

function Doodler({ doodler }) {
    return (
        <div
            className="doodler"
            style={{
                left: `${doodler.left}px`,
                bottom: `${doodler.bottom}px`,
            }}
        />
    );
}

function Game() {
    const [isGameOver, setIsGameOver] = useState(true);
    const [platforms, setPlatforms] = useState([]);
    const [doodler, setDoodler] = useState({});
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState('none');

    const platformCount = 5;
    const startPoint = 150;

    const makeOneNewPlatform = useCallback((bottom) => {
        const left = Math.random() * 315;
        return { bottom, left };
    }, []);

    const movePlatforms = useCallback(() => {
        if (doodler.bottom > 200) {
            setPlatforms((prevPlatforms) => {
                const newPlatforms = prevPlatforms.map((platform) => ({
                    ...platform,
                    bottom: platform.bottom - 4,
                }));
                if (newPlatforms[0].bottom < 10) {
                    newPlatforms.shift();
                    setScore((prevScore) => prevScore + 1);
                    newPlatforms.push(makeOneNewPlatform(600));
                }
                return newPlatforms;
            });
        }
    }, [doodler.bottom, makeOneNewPlatform]);

    const fall = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 5;
            } else if (direction === 'right' && prevDoodler.left < 340) {
                newLeft = prevDoodler.left + 5;
            }
            if (prevDoodler.bottom <= 0) {
                gameOver();
            }
            return { ...prevDoodler, bottom: prevDoodler.bottom - 5, left: newLeft };
        });
    }, [direction]);

    const jump = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 5;
            } else if (direction === 'right' && prevDoodler.left < 340) {
                newLeft = prevDoodler.left + 5;
            }
            if (prevDoodler.bottom > prevDoodler.startPoint + 200) {
                return { ...prevDoodler, isJumping: false };
            }
            return { ...prevDoodler, bottom: prevDoodler.bottom + 20, left: newLeft };
        });
    }, [direction]);

    const gameOver = useCallback(() => {
        setIsGameOver(true);
    }, []);

    const checkCollision = useCallback(() => {
        if (doodler.left <= 0) {
            setDirection('right');
        } else if (doodler.left >= 340) {
            setDirection('left');
        }
    }, [doodler.left]);

    useEffect(() => {
        if (!isGameOver) {
            const interval = setInterval(() => {
                checkCollision();
                movePlatforms();
                if (doodler.isJumping) {
                    jump();
                } else {
                    fall();
                }

                platforms.forEach((platform) => {
                    if (
                        doodler.bottom >= platform.bottom &&
                        doodler.bottom <= platform.bottom + 15 &&
                        doodler.left + 60 >= platform.left &&
                        doodler.left <= platform.left + 85 &&
                        !doodler.isJumping
                    ) {
                        setDoodler((prevDoodler) => ({
                            ...prevDoodler,
                            isJumping: true,
                            startPoint: prevDoodler.bottom,
                        }));
                    }
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [checkCollision, doodler, fall, isGameOver, jump, movePlatforms, platforms]);

    const createPlatforms = useCallback(() => {
        const newPlatforms = [];
        for (let i = 0; i < platformCount; i++) {
            const platGap = 600 / platformCount;
            const newPlatBottom = 100 + i * platGap;
            const newPlatform = makeOneNewPlatform(newPlatBottom);
            newPlatforms.push(newPlatform);
        }
        return [newPlatforms, newPlatforms[0].left];
    }, [makeOneNewPlatform]);

    const createDoodler = useCallback((doodlerBottom, doodlerLeft) => ({
        bottom: doodlerBottom,
        left: doodlerLeft,
        isJumping: true,
        direction: 'none',
        startPoint: startPoint,
    }), []);

    const start = useCallback(() => {
        const [newPlatforms, doodlerLeft] = createPlatforms();
        setIsGameOver(false);
        setScore(0);
        setPlatforms(newPlatforms);
        setDoodler(createDoodler(startPoint, doodlerLeft));
    }, [createDoodler, createPlatforms]);

    const handleTouchStart = useCallback((event) => {
        const touchX = event.touches[0].clientX;
        const halfScreenWidth = window.innerWidth / 2;
        if (isGameOver) {
            start();
        }
        if (touchX < halfScreenWidth) {
            setDirection('left');
        } else {
            setDirection('right');
        }
    }, [isGameOver, start]);

    const handleTouchEnd = useCallback(() => {
        setDirection('none');
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter' && isGameOver) {
            start();
        } else if (event.key === 'ArrowLeft') {
            setDirection('left');
        } else if (event.key === 'ArrowRight') {
            setDirection('right');
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            setDirection('none');
        }
    }, [isGameOver, start]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleKeyDown, handleTouchStart, handleTouchEnd]);

    return (
        <div className="grid">
            {!isGameOver ? (
                <>
                    <div className="score">{score}</div>
                    <Doodler doodler={doodler} />
                    <Platforms platforms={platforms} />
                </>
            ) : (
                <div className="instructions">
                    DoodleJump <br />
                    Press Enter or tap the screen to start. <br />
                    Use arrow keys or swipe to navigate. Don't hit the floor!
                </div>
            )}
        </div>
    );
}

export default Game;
