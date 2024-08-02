import React, { useEffect, useContext,useState, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { RewardsContext } from "../context/RewardsContext";
import { TasksContext } from "../context/TasksContext";
import { LeaderboardContext } from "../context/LeaderboardContext";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from '../helpers/api';
const PreLoad = ({ telegramId }) => {
    const navigate = useNavigate();
    const { user, setUser, updateUserBalance } = useContext(UserContext);
    const { setRewards } = useContext(RewardsContext);
    const { setTasks } = useContext(TasksContext);
    const { setUserStats, setLeaderboard, setCount } = useContext(LeaderboardContext);
    const [rewardData, setRewardData] = useState(null);
    const [showRewardPage, setShowRewardPage] = useState(false);

    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (hasFetchedData.current) return;
        const loadData = async () => {
            try {
                hasFetchedData.current = true;
                await fetchLeaderboard(telegramId);
                await fetchUser(telegramId);
                await fetchUserRewards(telegramId);
                await fetchTasks(telegramId);
                const rewardResult = await fetchDailyReward(telegramId);
                if (rewardResult) {
                    setRewardData(rewardResult);
                    setShowRewardPage(true); // Show reward page if a new reward is claimed
                }
            } catch (error) {
                console.error("Error loading data", error);
            }
        };

        loadData();
    }, [telegramId, navigate, setUser, setRewards, setTasks, setUserStats, setLeaderboard, setCount]);

    const fetchLeaderboard = async (telegramId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/leaderboard/`, {
                params: { telegram_id: telegramId }
            });
            if (response.status === 200) {
                console.log(response)
                const leaderboardData = response.data;
                console.log(leaderboardData)
                setLeaderboard(leaderboardData.board);
                setCount(leaderboardData.count);
                setUserStats(leaderboardData.me);
            }
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };
    const fetchUser = async (telegramId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/join/`, {
                user_id: telegramId
            });

            if (response.status === 200 && response.data.status === "success") {
                setUser(response.data.user);
            } else {
                console.error("Error fetching user:", response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                navigate("/welcome"); // Navigate to WelcomePage if user is not found
            } else {
                console.error("Failed to fetch user:", error);
            }
        }
    };

    const fetchUserRewards = async (telegramId) => {
        try {
            console.log(telegramId)
            const response = await axios.get(`${API_BASE_URL}/users/${telegramId}/rewards/`);
            if (response.status === 200 && response.data.status === "success") {
                setRewards(response.data.reward);
            }
        } catch (error) {
            console.error("Failed to fetch user rewards:", error);
        }
    };
    const fetchTasks = async (telegramId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${telegramId}/tasks/`);
            if (response.status === 200 && response.data.status === "success") {
                setTasks(response.data.tasks);
                window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
                navigate("/home");
            } else {
                console.error('Error fetching tasks:', response.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };
    const fetchDailyReward = async (telegramId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/daily_reward/`, {
                telegram_id: telegramId
            });
            if (response.status === 200 && response.data.status === "success") {
                return response.data;
            } else {
                console.error("Error fetching daily reward:", response.data.message);
                return null;
            }
        } catch (error) {
            console.error("Failed to fetch daily reward:", error);
            return null;
        }
    };

    const handleRewardClaimed = () => {
        setRewards(prevRewards => ({
            ...prevRewards,
            tasks: prevRewards.daily + rewardData.balance,
            total: prevRewards.total + rewardData.balance
        }));
        updateUserBalance(user.balance+rewardData.balance);
        setShowRewardPage(false);
        navigate("/home");
    };
    return (
        <div>
            {showRewardPage ? (
                <RewardPage rewardData={rewardData} onClaim={handleRewardClaimed} />
            ) : (
                <img id="loader" width="120" height="120" className="readyToSlide" src={`${process.env.PUBLIC_URL}/resources_directory/13A8E8C5-B501-4EA6-B4AC-6BD22BD7A9BA.webp`} alt="Loading" />
            )}
        </div>
    );
};

const RewardPage = ({ rewardData, onClaim }) => {
    const { streak, reward } = rewardData;

    return (
        <div className="reward-page">
            <h1>Daily Reward</h1>
            <p>Congratulations! You've claimed your daily reward.</p>
            <p>Current Streak: {streak} days</p>
            <p>Reward: {reward} points</p>
            <button onClick={onClaim}>Continue</button>
        </div>
    );
};
export default PreLoad;
