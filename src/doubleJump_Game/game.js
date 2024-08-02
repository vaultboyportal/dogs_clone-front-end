import {useState, useEffect, useCallback, useContext} from 'react';
import './game.css';
import {UserContext} from "../context/UserContext";
import axios from 'axios';
import {API_BASE_URL} from '../helpers/api';
function Platforms({ platforms }) {
    return platforms.map((platform, index) => (
        <div
            key={index}
            className={`platform ${platform.isDeadly ? 'deadly' : ''}`}
            style={{ left: `${platform.left}px`, bottom: `${platform.bottom}px` }}
        >
            <img src={`${process.env.PUBLIC_URL}/resources_directory/platform_type_${platform.type}.webp`} />
        </div>
    ));
}

function Doodler({ doodler }) {
    return (
        <img
            className="doodler"
            src={`${process.env.PUBLIC_URL}/resources_directory/13A8E8C5-B501-4EA6-B4AC-6BD22BD7A9BA.webp`}
            style={{
                left: `${doodler.left}px`,
                bottom: `${doodler.bottom}px`,
            }}
        />
    );
}

function Game({telegram_Id}) {
    const { user, setUser,updateUserBalance  } = useContext(UserContext);
    const [isGameOver, setIsGameOver] = useState(true);
    const [platforms, setPlatforms] = useState([]);
    const [doodler, setDoodler] = useState({});
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState('none');
    const platformCount = 7;
    const startPoint = 100;

    const makeOneNewPlatform = useCallback((bottom, score) => {
        const left = Math.random() * 315;
        let type = 1; // Статичні платформи за замовчуванням

        if (score > 100) {
            if (Math.random() < 0.5) { // 50% шанс для рухомих платформ
                type = 2;
            }
        }

        if (score > 200) {
            if (Math.random() < 0.3) { // 30% шанс для ломаючих платформ
                type = 3;
            }
        }

        return { bottom, left, type, direction: 'right' };
    }, []);
    const movePlatforms = useCallback(() => {
        if (doodler.bottom > 200) {
            setPlatforms((prevPlatforms) => {
                const newPlatforms = prevPlatforms.map((platform) => {
                    let newLeft = platform.left;
                    if (platform.type === 2) { // Рухомі платформи
                        if (platform.direction === 'right') {
                            newLeft += 2;
                            if (newLeft >= 315) {
                                platform.direction = 'left';
                            }
                        } else {
                            newLeft -= 2;
                            if (newLeft <= 0) {
                                platform.direction = 'right';
                            }
                        }
                    }
                    return { ...platform, bottom: platform.bottom - 7, left: newLeft };
                });
                if (newPlatforms[0].bottom < 50) {
                    newPlatforms.shift();
                    setScore((prevScore) => {
                        const newScore = prevScore + 5;
                        newPlatforms.push(makeOneNewPlatform(850, newScore));
                        return newScore;
                    });
                }
                return newPlatforms;
            });
        }
    }, [doodler.bottom, makeOneNewPlatform]);


    const fall = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 8;
            } else if (direction === 'right' && prevDoodler.left < 340) {
                newLeft = prevDoodler.left + 8;
            }
            if (prevDoodler.bottom <= 0) {
                gameOver();
            }
            return { ...prevDoodler, bottom: prevDoodler.bottom - 12, left: newLeft };
        });
    }, [direction]);

    const jump = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 5 ;
            } else if (direction === 'right' && prevDoodler.left < 340) {
                newLeft = prevDoodler.left + 5 ;
            }
            if (prevDoodler.bottom > prevDoodler.startPoint + 250) {
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
                    const doodlerTop = doodler.bottom + 60; // Висота doodler
                    const doodlerLeft = doodler.left;
                    const doodlerRight = doodler.left + 60;

                    const platformTop = platform.bottom + 15;
                    const platformLeft = platform.left;
                    const platformRight = platform.left + 85;

                    if (
                        doodlerTop >= platform.bottom &&
                        doodler.bottom <= platformTop &&
                        doodlerRight >= platformLeft &&
                        doodlerLeft <= platformRight &&
                        !doodler.isJumping &&
                        doodler.bottom >= platformTop - 10 && // Покращення точності колізії
                        doodler.bottom <= platformTop + 10
                    ) {
                        if (platform.type === 3) {
                            setPlatforms((prevPlatforms) => prevPlatforms.filter(p => p !== platform)); // Видалити ломаючу платформу
                        }
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
            const platGap = 800 / platformCount;
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
            fetchUserAttempts(telegram_Id)
            start();
        } else if (event.key === 'ArrowLeft') {
            setDirection('left');
        } else if (event.key === 'ArrowRight') {
            setDirection('right');
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            setDirection('none');
        }
    }, [isGameOver, start]);

    const fetchUserAttempts = async (telegram_Id) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/update_attempts/`,
                { telegram_id: telegram_Id, action: 'use' });
            if (response.status === 200) {
                // Handle success
                setUser((prevUser) => ({
                    ...prevUser,  // Preserve existing user data
                    attempts_left: response.data.attempts_left  // Update attempts_left field
                }));
                console.log(response.data.attempts_left);
            }
        } catch (error) {
            console.error("Error fetching or using user attempts:", error);
        }
    };
    return (
        <div className="grid" onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
            {!isGameOver ? (
                <>
                    <div className="score">{score}</div>
                    <Doodler doodler={doodler} />
                    <Platforms platforms={platforms} />
                </>
            ) : (
                <div className="instructions">
                    DoodleJump <br/>
                    Press Enter or tap the screen to start. <br/>
                    Use arrow keys or swipe to navigate. Don't hit the floor! <br/>
                    Your balance: {user.balance} <br/>
                    Your charges: {user.attempts_left}
                </div>
            )}
        </div>
    );
}

export default Game;
