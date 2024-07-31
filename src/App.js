import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from "./Pages/First_page";
import SecondPage from "./Pages/Second_page";
import LastPage from "./Pages/Last_page";
import HomePage from "./Pages/home_page";
import BottomNavbar from "./Pages/bottomNavbar";
import LeaderboardPage from "./Pages/leaderboard";
import InviteFriends from "./Pages/inviteFriends";
import Game from "./doubleJump_Game/game";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function App() {
    const location = useLocation();
    const query = useQuery();
    const [startParam, setStartParam] = useState('');
    const [userData, setUserData] = useState(null);

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

    const showBottomNavbar = location.pathname !== '/' && location.pathname !== '/second' && location.pathname !== '/last_check';

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/second" element={<SecondPage />} />
                <Route path="/last_check" element={<LastPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage/>}/>
                <Route path="/invite" element={<InviteFriends/>}/>
                <Route path="/game" element={<Game />} />
            </Routes>
            {showBottomNavbar && <BottomNavbar />}
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
