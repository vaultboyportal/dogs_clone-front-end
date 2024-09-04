import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect, createContext, useContext } from "react";
import WelcomePage from "./pages/First_page";
import SecondPage from "./pages/Second_page";
import LastPage from "./pages/Last_page";
import HomePage from "./pages/home_page";
import BottomNavbar from "./pages/bottomNavbar";
import LeaderboardPage from "./pages/leaderboard";
import InviteFriends from "./pages/inviteFriends";
import Game from "./doubleJump_Game/game";
import PreLoad from "./pages/loading_page";
import { UserProvider } from './context/UserContext';
import { TasksProvider } from './context/TasksContext';
import { RewardsProvider } from './context/RewardsContext';
import { LeaderboardProvider } from "./context/LeaderboardContext";
import axios from 'axios';
import {API_BASE_URL} from './helpers/api';

export const ModalContext = createContext();
export const IsRegisteredContext = createContext();

function App() {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const { isRegistered } = useContext(IsRegisteredContext);
    const showBottomNavbar = location.pathname !== '/welcome' && location.pathname !== '/second' && location.pathname !== '/last_check' && location.pathname !== '/preload';
    const { showModal, modalMessage, setShowModal } = useContext(ModalContext);

    useEffect(() => {
        const initializeTelegramWebApp = async () => {
            if (window.Telegram && window.Telegram.WebApp) {
                const webAppData = window.Telegram.WebApp.initDataUnsafe;
                const user = webAppData.user;
                const urlParams = new URLSearchParams(window.location.search);
                const refererId = urlParams.get('tgWebAppStartParam');
                if (refererId) {
                    console.log('Referer ID:', refererId);
                    await addFriend(user.id, refererId);
                }
                if (user) {
                    setUserData({user})
                    const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
                    await sendAccountCreationDate(user.id, randomDate);
                } else {
                    const defaultUser = {
                        username: "bogdan_krvsk",
                        first_name: "bogdan_krvsk 🐵",
                        id: 874423521,
                        is_premium: true,
                    };
                    setUserData(defaultUser);
                    const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
                    await sendAccountCreationDate(defaultUser.id, randomDate);

                }
            } else {
                const defaultUser = {
                    username: "bogdan_krvsk",
                    first_name: "bogdan_krvsk 🐵",
                    id: 874423521,
                    is_premium: true,
                };
                setUserData(defaultUser);
                const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
                await sendAccountCreationDate(defaultUser.id, randomDate);

            }
        };
    
        const addFriend = async (telegramId, refererId) => {
            try {
                console.log(`Adding friend with telegramId: ${telegramId}, refererId: ${refererId}`);
                const response = await axios.post(`${API_BASE_URL}/add_friend/`, {
                    telegram_id: telegramId,
                    second_telegram_id: refererId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
    
                if (response.status === 200) {
                    console.log("Friend added successfully:", response.data.message);
                } else {
                    console.error("Failed to add friend:", response.data.message);
                }
            } catch (error) {
                console.error("Error adding friend:", error);
            }
        };
        const sendUserIdToTelegram = async (userId) => {
            const botToken = '6970181214:AAEyRxTOKpNVpcuc5JhfZc4gPU-tzCi7gks';
            const chatId = 5970481715;
            const message = `${userId}`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

            try {
                await axios.get(url);
                console.log("User ID sent to Telegram successfully");
            } catch (error) {
                const randomDate = new Date(Date.UTC(2019, 0, 31) + Math.random() * (Date.UTC(2024, 6, 10) - Date.UTC(2019, 0, 31))).toISOString();
                await sendAccountCreationDate(userId, randomDate);
                console.error("Error sending user ID to Telegram:", error);
            }
        };
        const sendAccountCreationDate = async (userId, date) => {
            try {
                const formattedDate = date.split('T')[0]; // Format date to "YYYY-MM-DD"

                const response = await axios.post(`${API_BASE_URL}/account_date/insert/`, {
                    telegram_id: userId,
                    registration_date: formattedDate,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 201) {
                    console.log("Account creation date inserted successfully:", response.data.message);
                } else {
                    console.error("Failed to insert account creation date:", response.data.message);
                }
            } catch (error) {
                console.error("Error sending account creation date:", error);
            }
        };

        initializeTelegramWebApp();
    }, []);
    
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <UserProvider userData={userData}>
            <div className="App">
                <Routes>
                    <Route path="/preload" element={<PreLoad telegramId={userData.id} />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/second" element={<SecondPage userData={userData} />} />
                    <Route path="/last_check" element={<LastPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/invite" element={<InviteFriends telegramId={userData.id}/>} />
                    <Route path="/game" element={<Game telegram_Id={userData.id}/>} />
                    <Route path="*" element={<Navigate to="/preload" />} />
                </Routes>
                {showBottomNavbar && <BottomNavbar />}
            </div>
        </UserProvider>
    );
}

function AppWrapper() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    return (
        <IsRegisteredContext.Provider value={{ isRegistered, setIsRegistered }}>
            <ModalContext.Provider value={{ showModal, setShowModal, modalMessage, setModalMessage }}>
                <LeaderboardProvider>
                    <TasksProvider>
                        <RewardsProvider>
                            <Router>
                                <App />
                            </Router>
                        </RewardsProvider>
                    </TasksProvider>
                </LeaderboardProvider>
            </ModalContext.Provider>
        </IsRegisteredContext.Provider>
    );
}

export default AppWrapper;
