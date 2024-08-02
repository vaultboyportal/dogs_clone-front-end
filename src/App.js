import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import React,{useState,useEffect,createContext,useContext  } from "react";
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
import {LeaderboardProvider} from "./context/LeaderboardContext";
import Modal from './helpers/Modal';
import { useTelegramData } from './helpers/useTelegramData';

export const ModalContext = createContext();
function App() {
    const { userData } = useTelegramData();
    console.log(userData)
    const location = useLocation();
    const { isRegistered } = useContext(IsRegisteredContext); // Add this line
    const showBottomNavbar = location.pathname !== '/' && location.pathname !== '/second' && location.pathname !== '/last_check' && location.pathname !== '/preload';
    const { showModal, modalMessage, setShowModal, setModalMessage } = useContext(ModalContext);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isRegistered ? <Navigate to="/preload" /> : <WelcomePage />} />
                <Route path="/second" element={<SecondPage telegram_id={userData?.id.toString()}/>} />
                <Route path="/last_check" element={<LastPage />} />
                <Route path="/preload" element={<PreLoad telegramId={userData.id} />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/invite" element={<InviteFriends />} />
                <Route path="/game" element={<Game />} />
                <Route
                    path="*"
                    element={<Navigate to={localStorage.getItem('isRegistered') === 'true' ? "/home" : "/"} />}
                />
            </Routes>
            {showBottomNavbar && <BottomNavbar />}
            <Modal show={showModal} onClose={() => setShowModal(false)} message={modalMessage} />
        </div>
    );
}
export const IsRegisteredContext = createContext();

function AppWrapper() {
    const [isRegistered, setIsRegistered] = useState(false);
    useEffect(() => {
        const userRegistered = localStorage.getItem('isRegistered') === 'true';
        setIsRegistered(userRegistered);
    }, []);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    return (
        <IsRegisteredContext.Provider value={{ isRegistered, setIsRegistered }}>
            <ModalContext.Provider value={{ showModal, setShowModal, modalMessage, setModalMessage }}>
            <LeaderboardProvider >
            <TasksProvider>
                <RewardsProvider >
                    <Router>
                        <UserProvider >
                        <App />
                        </UserProvider>
                    </Router>
                </RewardsProvider>
            </TasksProvider>
                </LeaderboardProvider>
            </ModalContext.Provider>
        </IsRegisteredContext.Provider>
    );
}

export default AppWrapper;