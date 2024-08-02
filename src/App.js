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
import Modal from './helpers/Modal';

export const ModalContext = createContext();
export const IsRegisteredContext = createContext();

function App() {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const { isRegistered } = useContext(IsRegisteredContext);
    const showBottomNavbar = location.pathname !== '/welcome' && location.pathname !== '/second' && location.pathname !== '/last_check' && location.pathname !== '/preload';
    const { showModal, modalMessage, setShowModal } = useContext(ModalContext);

    useEffect(() => {
        const initializeTelegramWebApp = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                const webAppData = window.Telegram.WebApp.initDataUnsafe;
                const user = webAppData.user;

                const urlParams = new URLSearchParams(window.location.search);
                const refererId = urlParams.get('r');

                console.log('Referer ID:', refererId);
                if (user) {
                    setUserData(user);
                } else {
                    setUserData({
                        username: "bogdan_krvsk",
                        id: 874423521,
                        is_premium: true
                    });
                }
            } else {
                setUserData({
                    username: "bogdan_krvsk",
                    id: 874423521,
                    is_premium: true
                });
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
                <Route path="/invite" element={<InviteFriends />} />
                <Route path="/game" element={<Game telegram_Id={userData.id}/>} />
                <Route path="*" element={<Navigate to="/preload" />} />
            </Routes>
            {showBottomNavbar && <BottomNavbar />}
            <Modal show={showModal} onClose={() => setShowModal(false)} message={modalMessage} />
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
