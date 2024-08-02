import {useState, useEffect, useCallback, useContext} from 'react';
import './game.css';
import {UserContext} from "../context/UserContext";
import axios from 'axios';
import {API_BASE_URL} from '../helpers/api';
import {RewardsContext} from "../context/RewardsContext";
function Platforms({ platforms }) {
    return platforms.map((platform, index) => (
        <div
            key={index}
            className={`platform ${platform.type === 3 ? 'deadly' : ''} ${platform.type === 4 ? 'game-over' : ''}`}
            style={{ left: `${platform.left}px`, bottom: `${platform.bottom}px` }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/resources_directory/platform_type_${platform.type}.webp`}
                alt={`Platform type ${platform.type}`}
            />
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
    const [lastPlatformHeight, setLastPlatformHeight] = useState(0);
    const { user, setUser,updateUserBalance  } = useContext(UserContext);
    const [isGameOver, setIsGameOver] = useState(true);
    const [platforms, setPlatforms] = useState([]);
    const [doodler, setDoodler] = useState({});
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState('none');
    const [platformCount, setPlatformCount] =  useState(20);;
    const startPoint = 100;
    const { rewards, setRewards } = useContext(RewardsContext);
    const makeOneNewPlatform = useCallback((bottom, score) => {
        const left = Math.random() * (window.innerWidth - 85);
        let type = 1; // Статичні платформи за замовчуванням

        if (score > 35) {
            if (Math.random() < 0.4) { // 50% шанс для рухомих платформ
                type = 2;
            }
        }

        if (score > 50) {
            if (Math.random() < 0.2) { // 30% шанс для ломаючих платформ
                type = 3;
            }
        }

        if (score > 100) {
            if (Math.random() < 0.1) { // 10% chance for game over platforms
                type = 4;
            }
        }
        if (score > 500) {
            if (Math.random() < 0.3) { // 10% chance for game over platforms
                type = 4;
            }
        }
        return { bottom, left, type, direction: 'right' };
    }, []);
    const movePlatforms = useCallback((platformOffset = 0) => {
        setPlatforms((prevPlatforms) => {
            const screenHeight = window.innerHeight;
            const platformSpeedBase = 8;
            const platformSpeedIncrement = 2;

            // Calculate the speed increment based on how much of the screen is filled or if any platform is out of view
            const filledHeight = screenHeight - (prevPlatforms[0]?.bottom || 0);
            const isFilledMoreThan75Percent = filledHeight > (0.75 * screenHeight);

            // Check if any platform is out of view
            const isAnyPlatformOutOfView = prevPlatforms.some(platform => platform.bottom <= 0);

            // Increase speed if screen is more than 75% filled or any platform is out of view
            const platformSpeed = platformSpeedBase + platformOffset / 50 + (isFilledMoreThan75Percent || isAnyPlatformOutOfView ? platformSpeedIncrement : 0);

            const newPlatforms = prevPlatforms.map((platform) => {
                let newLeft = platform.left;

                // Move platforms downward, faster if the screen is filled more or platforms are out of view
                const newBottom = platform.bottom - platformSpeed - 4;

                // Handle moving platforms
                if (platform.type === 2) {
                    if (platform.direction === 'right') {
                        newLeft += 2;
                        if (newLeft >= window.innerWidth - 85) {
                            platform.direction = 'left';
                        }
                    } else {
                        newLeft -= 2;
                        if (newLeft <= 0) {
                            platform.direction = 'right';
                        }
                    }
                }

                return { ...platform, bottom: newBottom, left: newLeft };
            });

            // Add new platforms when existing platforms disappear
            if (newPlatforms[0].bottom < 150) {
                newPlatforms.shift();
                setScore((prevScore) => {
                    const newScore = prevScore + 1;
                    newPlatforms.push(makeOneNewPlatform(window.innerHeight, newScore));  // Add a new platform
                    return newScore;
                });
            }

            return newPlatforms;
        });
    }, []);


    const moveMovingPlatforms = useCallback(() => {
        setPlatforms((prevPlatforms) => {
            return prevPlatforms.map((platform) => {
                if (platform.type === 2) { // Check if the platform is of type 2
                    let newLeft = platform.left;

                    // Move the platform left or right based on its direction
                    if (platform.direction === 'right') {
                        newLeft += 2;
                        if (newLeft >= window.innerWidth - 85) { // Change direction when hitting the edge
                            platform.direction = 'left';
                        }
                    } else {
                        newLeft -= 2;
                        if (newLeft <= 0) {
                            platform.direction = 'right';
                        }
                    }

                    return { ...platform, left: newLeft }; // Update the platform's left position
                }
                return platform; // Return the platform unchanged if not type 2
            });
        });
    }, []);


    const jump = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;

            // Character movement to the left and right
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 5;
            } else if (direction === 'right' && prevDoodler.left < 340) {
                newLeft = prevDoodler.left + 5;
            }

            // Fixed jump height
            const maxJumpHeight = 200;  // Define a consistent jump height

            if (prevDoodler.bottom > prevDoodler.startPoint + maxJumpHeight) {
                // Make the doodler stop jumping further
                return { ...prevDoodler, isJumping: false };
            }

            // Move platforms only if jumping higher
            if (prevDoodler.bottom > window.innerHeight/2) {
                movePlatforms();  // Move platforms to give illusion of doodler moving upward
            }

            return { ...prevDoodler, bottom: prevDoodler.bottom + 16, left: newLeft };
        });
    }, [direction, movePlatforms]);


    const fall = useCallback(() => {
        setDoodler((prevDoodler) => {
            let newLeft = prevDoodler.left;
            if (direction === 'left' && prevDoodler.left > 0) {
                newLeft = prevDoodler.left - 8;
            } else if (direction === 'right' && prevDoodler.left < (window.innerWidth - 85)) {
                newLeft = prevDoodler.left + 8;
            }
            if (prevDoodler.bottom <= 10) {
                gameOver();
            }
            return { ...prevDoodler, bottom: prevDoodler.bottom - 17, left: newLeft };
        });
    }, [direction]);

    const gameOver = useCallback(() => {
        console.log(user.balance)
        console.log(score)
        const updatedBalance = user.balance + score;
        updateUserBalance(updatedBalance);
        setRewards(prevRewards => ({
            ...prevRewards,
            game: prevRewards.game + score,
            total: prevRewards.total + score
        }));
        setIsGameOver(true);
    }, []);

    const checkCollision = useCallback(() => {
        if (doodler.left <= 0) {
            setDirection('right');
        } else if (doodler.left >= 500) {
            setDirection('left');
        }
    }, [doodler.left]);

    useEffect(() => {
        if (!isGameOver) {
            const interval = setInterval(() => {
                checkCollision();
                moveMovingPlatforms();
                if (doodler.isJumping) {
                    jump();
                } else {
                    fall();
                }

                platforms.forEach((platform, index) => {
                    const doodlerTop = doodler.bottom + 100;
                    const doodlerLeft = doodler.left;
                    const doodlerRight = doodler.left + 50;

                    const platformTop = platform.bottom + 20;
                    const platformLeft = platform.left;
                    const platformRight = platform.left + 40;

                    if (
                        doodlerTop >= platform.bottom &&
                        doodler.bottom <= platformTop &&
                        doodlerRight >= platformLeft &&
                        doodlerLeft <= platformRight &&
                        !doodler.isJumping &&
                        doodler.bottom >= platform.bottom - 10 &&
                        doodler.bottom <= platformTop + 10
                    ) {
                        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
                        if (platform.type === 3) {
                            setPlatforms((prevPlatforms) => prevPlatforms.filter((_, i) => i !== index)); // Remove broken platform
                        } else if (platform.type === 4) {
                            gameOver(); // Game over if touching a game over platform
                        }

                        // Check if the platform is higher than the last one
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
        const platformGap = 600 / platformCount;  // Reduce platform gap

        for (let i = 0; i < platformCount; i++) {
            const newPlatBottom = 200 + i * platformGap;
            const newPlatform = makeOneNewPlatform(newPlatBottom, 0); // Initial score is 0
            newPlatforms.push(newPlatform);
        }
        setPlatformCount(12)
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
        const halfScreenWidth = window.innerWidth / 2 + 100;
        if (isGameOver ) {
            fetchUserAttempts(telegram_Id)
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
        <div className="grid" onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}  tabIndex="0" >
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
