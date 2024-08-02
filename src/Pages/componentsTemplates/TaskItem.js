import React, { useState, useContext } from 'react';
import { TasksContext } from '../../context/TasksContext';
import '../../Styles/mainStyles.css'; // Підключення стилів для кнопки
import axios from 'axios';
import {UserContext} from "../../context/UserContext";
import { RewardsContext } from "../../context/RewardsContext";
import { useNavigate } from 'react-router-dom';
import { ModalContext } from '../../App';
import {API_BASE_URL} from '../../helpers/api';
const TaskItem = ({ title, footerText,url,index, setAnimated }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { setShowModal, setModalMessage } = useContext(ModalContext);
    const { completeTask } = useContext(TasksContext);
    const { user, setUser,updateUserBalance  } = useContext(UserContext);
    const { rewards, setRewards } = useContext(RewardsContext);
    const history = useNavigate();
    const handleShowModal = () => {
        setModalMessage("Complete Task and try again");
        setShowModal(true);
    };
    handleShowModal()
    const verifyTask = async (telegramId, taskTitle, reward ) => {
        try {
            const rewardValue = parseInt(reward.replace('+', ''), 10);
            const response = await axios.post(`${API_BASE_URL}/tasks/verify/`, {
                telegram_id: telegramId,
                task: taskTitle,
                reward: rewardValue
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const updatedBalance = user.balance + rewardValue;
                updateUserBalance(updatedBalance);
                setRewards(prevRewards => ({
                    ...prevRewards,
                    tasks: prevRewards.tasks + rewardValue,
                    total: prevRewards.total + rewardValue
                }));
                completeTask(index);
                setAnimated(true);

            } else {
                console.error("Failed to verify task:", response.data.message);
                handleShowModal()
            }
        } catch (error) {
            console.error("Error verifying task:", error);
            handleShowModal()
        }
    };

    const handleButtonClick = () => {
        if (!isChecked) {
            window.open(url, '_blank');
            setIsChecked(true);
        } else {
            console.log(user.telegram_id)
            verifyTask(user.telegram_id, title,footerText);
        }
    };
    return (
        <div className="_listItem_1wi4k_1">
            <div className="_media_1wi4k_8">
                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="700" viewBox="-60 40 590 450">
                    <path fill="#ffffff" d="M144 64c0-8.8 7.2-16 16-16s16 7.2 16 16c0 9.1 5.1 17.4 13.3 21.5s17.9 3.2 25.1-2.3c2.7-2 6-3.2 9.6-3.2c8.8 0 16 7.2 16 16c0 9.1 5.1 17.4 13.3 21.5s17.9 3.2 25.1-2.3c2.7-2 6-3.2 9.6-3.2c8.8 0 16 7.2 16 16l0 104c0 31.3-20 58-48 67.9c-9.6 3.4-16 12.5-16 22.6L304 488c0 13.3 10.7 24 24 24s24-10.7 24-24l0-117.8c38-20.1 64-60.1 64-106.2l0-104c0-35.3-28.7-64-64-64c-2.8 0-5.6 .2-8.3 .5C332.8 77.1 311.9 64 288 64c-2.8 0-5.6 .2-8.3 .5C268.8 45.1 247.9 32 224 32c-2.8 0-5.6 .2-8.3 .5C204.8 13.1 183.9 0 160 0C124.7 0 96 28.7 96 64l0 64.3c-11.7 7.4-22.5 16.4-32 26.9l17.8 16.1L64 155.2l-9.4 10.5C40 181.8 32 202.8 32 224.6l0 12.8c0 49.6 24.2 96.1 64.8 124.5l13.8-19.7L96.8 361.9l8.9 6.2c6.9 4.8 14.4 8.6 22.3 11.3L128 488c0 13.3 10.7 24 24 24s24-10.7 24-24l0-128.1c0-12.6-9.8-23.1-22.4-23.9c-7.3-.5-14.3-2.9-20.3-7.1l-13.1 18.7 13.1-18.7-8.9-6.2C96.6 303.1 80 271.3 80 237.4l0-12.8c0-9.9 3.7-19.4 10.3-26.8l9.4-10.5c3.8-4.2 7.9-8.1 12.3-11.6l0 32.3c0 8.8 7.2 16 16 16s16-7.2 16-16l0-65.7 0-14.3 0-64z" />
                </svg>
            </div>
            <div className="_body_1wi4k_22">
                <div className="_title_1wi4k_29">{title}</div>
                <div className="_footer_1wi4k_38">{footerText}</div>
            </div>
            <div className="_after_1wi4k_45">
                <div className={isChecked ? "_type-white_ip8lu_54 _root_oar9p_1 _size-s_oar9p_31" : "_type-dark_oar9p_58 _root_oar9p_1 _size-s_oar9p_31"}
                     onClick={handleButtonClick}>  {isChecked ? "Check" : "Start"}</div>
            </div>
        </div>
    );
};

export default TaskItem;
