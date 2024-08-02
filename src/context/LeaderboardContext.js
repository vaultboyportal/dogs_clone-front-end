import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
    const [userStats, setUserStats] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [count, setCount] = useState(0);

    return (
        <LeaderboardContext.Provider value={{ userStats, setUserStats, leaderboard, setLeaderboard, count, setCount }}>
            {children}
        </LeaderboardContext.Provider>
    );
};
