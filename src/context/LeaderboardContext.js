import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children, telegramId }) => {
    const [userStats, setUserStats] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/leaderboard/", {
                    params: { telegram_id: telegramId }
                });
                if (response.status === 200) {
                    const leaderboardData = response.data;
                    setLeaderboard(leaderboardData.board);
                    setCount(leaderboardData.count);
                    setUserStats(leaderboardData.me);
                }
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchLeaderboard();
    }, [telegramId]);

    return (
        <LeaderboardContext.Provider value={{ userStats, leaderboard, count }}>
            {children}
        </LeaderboardContext.Provider>
    );
};
