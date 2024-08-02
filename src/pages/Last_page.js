// src/components/LastPage.js
import React, { useState,useContext } from "react";
import "../Styles/Last_page.css"; // Додайте CSS для стилізації
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
const LastPage = () => {
    const { user } = useContext(UserContext);
    const [state, setState] = useState("initial"); // Текущее состояние страницы
    const navigate = useNavigate();
    const handleContinue = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        if (state === "initial") {
            // Переключаем состояние, чтобы обновить страницу
            setState("amazing");
        } else {
            // Если уже на "amazing", перенаправляем на другую страницу
            navigate("/home");
        }
    };
    const handleSwitch = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
        // Переключаем состояние между "initial" и "amazing"
        setState((prevState) => (prevState === "initial" ? "amazing" : "initial"));
    };
    return (
        <div className="_page_1ulsb_1">
            <div className="_view_sf2n5_1 _view_mgd6s_11" style={{ opacity: 1 }}>

                <div className="_inner_mgd6s_1">
                    <div className="_left_mgd6s_121" onClick={handleSwitch}></div>
                    <div className="_right_mgd6s_131" onClick={handleSwitch}></div>
                    <div className="_progressBar_mgd6s_93">
                        <div className={`_bar_mgd6s_105 _barCompleted_mgd6s_117 ${state === "amazing" ? "" : "_barCompleted_mgd6s_117"}`} onClick={handleSwitch}></div>
                        <div className={`_bar_mgd6s_105 ${state === "amazing" ? "_barCompleted_mgd6s_117" : ""}`} onClick={handleSwitch}></div>
                    </div>
                    {state === "initial" ? (
                        <>
                            <div className="_title_mgd6s_24">Elite member!</div>
                            <div className="_subTitle_mgd6s_34">You've joined Telegram</div>
                            <div className="_valueWrap_mgd6s_42">
                                <div className="_value_mgd6s_42">{Math.round(user ? user.top_group: "...")}</div>
                                <div className="_valueTitle_mgd6s_78">years ago</div>
                            </div>
                            <div className="_valueSubTitle_mgd6s_86">
                                Your account number is #{user?.telegram_id}.<br />  You're in the Top {user ? Math.round(user.top_percent) : "..."}% Telegram users 🔥
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="_title_mgd6s_24">You are amazing!</div>
                            <div className="_subTitle_mgd6s_34">Here is your $UP reward</div>
                            <div className="_valueWrap_mgd6s_42">
                                <div className="_value_mgd6s_42">
                                    <img   src={`${process.env.PUBLIC_URL}/resources_directory/13A8E8C5-B501-4EA6-B4AC-6BD22BD7A9BA.webp`}
                                           width="237" height="242" viewBox="0 0 237 242" fill="none">
                                    </img>
                                </div>
                                <div className="_valueTitle_mgd6s_78">{user?.age}</div>
                            </div>
                            <div className="_valueSubTitle_mgd6s_86">
                                Welcome to the OnlyUp movement 🤝
                            </div>
                        </>
                    )}
                    <div
                        className="_root_oar9p_1 _type-white_oar9p_43 _fixedBottom_oar9p_110 _button_mgd6s_141"
                        onClick={handleContinue}
                        style={{ cursor: "pointer" }}
                    >
                        Continue
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastPage;
