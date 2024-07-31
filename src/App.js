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


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function App() {
    const location = useLocation();
    const query = useQuery();
    const [startParam, setStartParam] = useState('');
    const [userData, setUserData] = useState(null);
    const { isRegistered } = useContext(IsRegisteredContext); // Add this line
    const showBottomNavbar = location.pathname !== '/' && location.pathname !== '/second' && location.pathname !== '/last_check' && location.pathname !== '/preload';

    useEffect(() => {
        const startParamValue = query.get('tgWebAppStartParam');
        if (startParamValue) {
            setStartParam(startParamValue);
            console.log('ParamsID:', startParamValue);
        }

        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user) {
                setUserData(user);
                console.log('User Data:', user);
            }
        }
    }, [query]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isRegistered ? <Navigate to="/preload" /> : <WelcomePage />} />
                <Route path="/second" element={<SecondPage />} />
                <Route path="/last_check" element={<LastPage />} />
                <Route path="/preload" element={<PreLoad />} />
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

    const telegramId = '874423521';
    return (
        <IsRegisteredContext.Provider value={{ isRegistered, setIsRegistered }}>
        <UserProvider telegramId={telegramId}>
            <LeaderboardProvider telegramId={telegramId}>
            <TasksProvider>
                <RewardsProvider telegramId={telegramId}>
                    <Router>
                        <App />
                    </Router>
                </RewardsProvider>
            </TasksProvider>
                </LeaderboardProvider>
        </UserProvider>
        </IsRegisteredContext.Provider>
    );
}

export default AppWrapper;