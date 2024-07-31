import "../styles/Second_page.css";
import React, { useState, useEffect,useRef,useContext  } from "react";
import axios from "axios"; // Импорт axios
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { RewardsContext } from '../context/RewardsContext';
const SecondPage = () => {
    const [isCompleted, setIsCompleted] = useState({
        accountAge: false,
        activityLevel: false,
        telegramPremium: false,
        ogStatus: false,
    });
    const { setUser } = useContext(UserContext);
    const { setRewards } = useContext(RewardsContext);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const [accountAgePercentage, setAccountAgePercentage] = useState(0);

    const calculateAccountAgePercentage = (ageInDays) => {
        const telegramCreationDate = new Date(2013, 7, 14); // 14th August 2013
        const currentDate = new Date();
        const totalDays = Math.floor((currentDate - telegramCreationDate) / (1000 * 60 * 60 * 24));
        return Math.round(((totalDays - ageInDays) / totalDays) * 100);
    };

    // Функция для создания пользователя
    const createUser = async () => {
        try {
            const randomUsername = `bogdan_krvsk`;
            const randomTelegramId = `874423521`;
            const isPremium = false; // Случайное значение true/false
            const reference = `874423521djiawiid`;
            const randomAge = 3611;
            const percentage = calculateAccountAgePercentage(randomAge);
            const userData = {
                age: randomAge,
                username: randomUsername,
                telegram_id: randomTelegramId,
                is_premium: isPremium,
                reference: reference,
                balance: randomAge,
                percentage
            };
            setUser(userData);
            const rewardsData = {
                age: userData.age,  // Assuming age is one of the rewards
                boost: 0,
                game: 0,
                daily: 0,
                frens: 0,
                premium: 0,
                tasks: 0,
                total: 0
            };
            setRewards(rewardsData);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users/",
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                console.log("User created successfully:", response.data);

            } else {
                console.error("Failed to create user:", response.data);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            createUser();
            isFirstRender.current = false;
        }

        const timers = [
            setTimeout(() => {
                setIsCompleted((prev) => ({ ...prev, accountAge: true }));
                const randomAge = 3611; // This should come from your user data
                const percentage = calculateAccountAgePercentage(randomAge);
                setAccountAgePercentage(percentage);
            }, 1500),
            setTimeout(() => setIsCompleted((prev) => ({ ...prev, activityLevel: true })), 2500),
            setTimeout(() => setIsCompleted((prev) => ({ ...prev, telegramPremium: true })), 3500),
            setTimeout(() => setIsCompleted((prev) => ({ ...prev, ogStatus: true })), 2000),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const handleClickToNextPage = () => {
        localStorage.setItem('isRegistered', true);
        if (Object.values(isCompleted).every((val) => val)) {
            navigate("/last_check");
        }
    };
    return (
        <div className="_view_sf2n5_1 _view_jzemx_1" style={{ opacity: 1 }}>
            <div className="_title_jzemx_9">Checking your account</div>
            <div className="_loaders_jzemx_15">
                <div style={{ opacity: 1, transform: "none" }}>
                    <div>
                        <div className="_top_jzemx_39">
                            <div className="_name_jzemx_33">Account Age Verified</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`_checkmark_jzemx_23 ${isCompleted.accountAge ? "_isCompleted_jzemx_26" : ""}`}
                            >
                                <path
                                    d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                    stroke="#FFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="_loader_jzemx_15">
                            <div
                                className={`_loaderProgress_jzemx_51 ${isCompleted.accountAge ? "_isCompleted_jzemx_26" : ""}`}
                                style={{
                                    width: isCompleted.accountAge ? "100%" : "0%",
                                    transitionDuration: "2100ms",
                                    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div style={{ opacity: 1, transform: "none" }}>
                    <div>
                        <div className="_top_jzemx_39">
                            <div className="_name_jzemx_33">Activity Level Analyzed</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`_checkmark_jzemx_23 ${isCompleted.activityLevel ? "_isCompleted_jzemx_26" : ""}`}
                            >
                                <path
                                    d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                    stroke="#FFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="_loader_jzemx_15">
                            <div
                                className={`_loaderProgress_jzemx_51 ${isCompleted.activityLevel ? "_isCompleted_jzemx_26" : ""}`}
                                style={{
                                    width: isCompleted.activityLevel ? "100%" : "0%",
                                    transitionDuration: "3400ms",
                                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div style={{ opacity: 1, transform: "none" }}>
                    <div>
                        <div className="_top_jzemx_39">
                            <div className="_name_jzemx_33">Telegram Premium Checked</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`_checkmark_jzemx_23 ${isCompleted.telegramPremium ? "_isCompleted_jzemx_26" : ""}`}
                            >
                                <path
                                    d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                    stroke="#FFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="_loader_jzemx_15">
                            <div
                                className={`_loaderProgress_jzemx_51 ${isCompleted.telegramPremium ? "_isCompleted_jzemx_26" : ""}`}
                                style={{
                                    width: isCompleted.telegramPremium ? "100%" : "0%",
                                    transitionDuration: "3000ms",
                                    transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div style={{ opacity: 1, transform: "none" }}>
                    <div>
                        <div className="_top_jzemx_39">
                            <div className="_name_jzemx_33">OG Status Confirmed</div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`_checkmark_jzemx_23 ${isCompleted.ogStatus ? "_isCompleted_jzemx_26" : ""}`}
                            >
                                <path
                                    d="M15 10L11 14L9 12M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                    stroke="#FFF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="_loader_jzemx_15">
                            <div
                                className={`_loaderProgress_jzemx_51 ${isCompleted.ogStatus ? "_isCompleted_jzemx_26" : ""}`}
                                style={{
                                    width: isCompleted.ogStatus ? "100%" : "0%",
                                    transitionDuration: "4000ms",
                                    transitionTimingFunction: "ease-in",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`_root_oar9p_1 _type-blue_oar9p_88 _fixedBottom_oar9p_110 _action_jzemx_61 ${
                    Object.values(isCompleted).every((val) => val) ? "_isCompleted_jzemx_26" : ""
                }`} onClick={handleClickToNextPage}
            >
                Continue
            </div>
        </div>
    );
};

export default SecondPage;
