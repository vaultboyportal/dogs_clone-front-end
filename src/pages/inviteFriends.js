import React, { useState } from "react";
import "../Styles/mainStyles.css"; // Add CSS for styling
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../helpers/api';

const InvitePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoToScore = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        setIsLoading(true);
    };
    const handleClose = () => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        setIsLoading(false);
    };

    return (
        <div className="_page_1ulsb_1">
            <div className="_gameView_1cr97_1" id="game-view">
                <div className="_view_sf2n5_1 _view_1x19s_1" style={{ opacity: 1 }}>
                    <div className="_backdrop_wo9zh_1"></div>
                    <div className={`_content_wo9zh_21 ${isLoading ? '_opened_wo9zh_16' : ''}`}>
                        <div className={`_cross_wo9zh_61 ${isLoading ? '_opened_wo9zh_16' : ''}`} onClick={handleClose}></div>
                        <div className={`_contentInner_wo9zh_44 ${isLoading ? '_opened_wo9zh_16' : ''}`}>
                            <div className="_sheetTitle_1x19s_93">Invite friends</div>
                            <div className="_separator_1x19s_86"></div>
                            <div className="_buttons_1x19s_79">
                                <div className="_root_oar9p_1 _type-white_oar9p_43">Copy invite link</div>
                                <div className="_root_oar9p_1 _type-white_oar9p_43">Share invite link</div>
                            </div>
                        </div>
                    </div>
                    <div className="_title_1x19s_5">Invite friends<br /> and get more $UP</div>
                    <div className="_mascote_94k9d_1 _centered_94k9d_13">
                        <img
                            id="home-mascote"
                            src={`${process.env.PUBLIC_URL}/resources_directory/image_2024-08-03_02-24-40.webp`}
                            className="_doggy_94k9d_6 _width-82_94k9d_23 _mascote_1vo1r_60 _isRendered_1vo1r_63"
                            alt="Mascote"
                        />
                    </div>
                    <div className="_subtitleEmpty_1x19s_19">Tap on the button to invite your friends</div>
                    <div className="_buttonWrap_1x19s_70">
                        <div className="_root_oar9p_1 _type-white_oar9p_43" onClick={handleGoToScore}>Invite friends</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
