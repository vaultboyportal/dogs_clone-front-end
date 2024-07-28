// src/components/LastPage.js
import React, { useState } from "react";
import "../Styles/mainStyles.css"; // Додайте CSS для стилізації
import { useNavigate } from "react-router-dom";

const LeaderboardPage = () => {
    const navigate = useNavigate();
    const handleGoToScore = () => {
        navigate("/last_check");
    };
    return (
        <div class="_page_1ulsb_1">
            <div className="_gameView_1cr97_1" id="game-view">
                <div className="_view_sf2n5_1 _view_zhpdf_1" style={{opacity: 1}}>
                    <div className="_title_zhpdf_5">Telegram Wall of Fame</div>
                    <div className="_me_zhpdf_13">
                        <div className="_item_iud9y_1">
                            <div className="_media_iud9y_8"><img className="_avatar_iud9y_19"
                                                                 src="https://ui-avatars.com/api/?name=bogdan_krvsk&amp;background=random&amp;color=fff"
                                                                 loading="lazy" alt="Avatar"/></div>
                            <div className="_body_iud9y_25">
                                <div className="_text_iud9y_47">bogdan_krvsk</div>
                                <div className="_footer_iud9y_32">5,973 DOGS</div>
                            </div>
                            <div className="_details_iud9y_56">#7349586</div>
                        </div>
                    </div>
                    <div className="_boardTitle_zhpdf_23">27.8M holders</div>
                    <div className="_item_iud9y_1">
                        <div className="_media_iud9y_8"><img className="_avatar_iud9y_19"
                                                             src="https://ui-avatars.com/api/?name=elkanadi&amp;background=random&amp;color=fff"
                                                             loading="lazy" alt="Avatar"/></div>
                        <div className="_body_iud9y_25">
                            <div className="_text_iud9y_47">elkanadi</div>
                            <div className="_footer_iud9y_32">17,790,901 DOGS</div>
                        </div>
                        <div className="_details_iud9y_56"><span className="_medal_iud9y_66">🥇</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;