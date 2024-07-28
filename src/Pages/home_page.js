// src/components/LastPage.js
import React, { useState } from "react";
import "../Styles/mainStyles.css"; // Додайте CSS для стилізації
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const handleGoToScore = () => {
        navigate("/last_check");
    };
    return (
        <div class="_page_1ulsb_1">
            <div className="_gameView_1cr97_1" id="game-view">
                <div className="_replay_1vo1r_24" onClick={handleGoToScore}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="56" viewBox="0 0 390 56" fill="none">
                        <path
                            d="M-46.4377 -224.551L-66.3162 -179.798C-66.6099 -179.137 -66.1259 -178.392 -65.4023 -178.392H-31.3581C-30.5329 -178.392 -30.0628 -177.449 -30.5596 -176.79L-72.5672 -121.072C-73.064 -120.414 -72.594 -119.47 -71.7688 -119.47H-30.9876C-30.2399 -119.47 -29.7567 -118.68 -30.0975 -118.015L-90.411 -0.262921C-90.869 0.631202 -89.8703 1.5667 -89.008 1.05137L13.8333 -60.4048C14.6369 -60.885 15.6007 -60.0965 15.2894 -59.2137L-46.4377 115.79M95.9446 -256.67L67.7278 -210.589C67.3435 -209.962 67.746 -209.148 68.4782 -209.072L90.7756 -206.775C91.2855 -206.723 91.6731 -206.293 91.6731 -205.78V-140.416C91.6731 -139.804 92.218 -139.335 92.8231 -139.427L198.093 -155.397C199.145 -155.556 199.685 -154.179 198.805 -153.581L48.4903 -51.3759C47.8339 -50.9295 47.9341 -49.9331 48.6663 -49.6265L172.684 2.30102C173.316 2.56535 173.501 3.37147 173.048 3.8848L95.9446 91.3278M313.789 -299L271.934 -222.297C271.559 -221.609 272.084 -220.777 272.866 -220.819L340.703 -224.512C341.127 -224.535 341.52 -224.287 341.682 -223.894L369.232 -156.959C369.439 -156.457 369.207 -155.882 368.711 -155.663L236.776 -97.437C235.829 -97.0191 236.063 -95.6142 237.094 -95.5258L389.717 -82.4499C390.601 -82.3741 390.956 -81.2693 390.281 -80.693L292.667 2.63851C292.514 2.76934 292.404 2.94342 292.351 3.13794L259.683 123.9C259.46 124.725 260.307 125.432 261.078 125.064L422 48.3599"
                            stroke="#007AFF" stroke-width="79" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <div className="_replayTitle_1vo1r_48"></div>
                </div>
                ` <div className="_backdrop_wo9zh_1"></div>
                <div className="_view_sf2n5_1 _view_1vo1r_1" style={{opacity: 1}}>
                    <div className="_mascote_94k9d_1 _centered_94k9d_13">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1906" height="676" viewBox="0 0 1906 676"
                             fill="none" className="_glass_94k9d_29">
                            <path
                                d="M1883.31 89.9479C1883.31 53.1478 1853.48 23.3154 1816.68 23.3154H1201.73C1162.44 23.3154 1127.14 40.388 1102.85 67.4479H824.909C809.553 41.0733 780.975 23.3154 748.209 23.3154H320.821C156.058 23.3154 22.4922 156.881 22.4922 321.644V509.207C22.4922 588.661 86.9024 653.071 166.357 653.071H483.414C678.643 653.071 836.908 494.807 836.908 299.577V200.713H1068.9V354.743C1068.9 519.505 1202.46 653.071 1367.23 653.071H1397.42C1665.77 653.071 1883.31 435.53 1883.31 167.18V89.9479Z"
                                fill="black" stroke="white" stroke-width="45"></path>
                        </svg>
                        <img id="home-mascote"  src={`${process.env.PUBLIC_URL}/resources_directory/13A8E8C5-B501-4EA6-B4AC-6BD22BD7A9BA.webp`}
                             className="_doggy_94k9d_6 _width-82_94k9d_23 _mascote_1vo1r_60 _isRendered_1vo1r_63">
                        </img>
                    </div>
                    <div className="_title_1vo1r_5">
                        <div className="_balance_eubs4_1"><span>5,973</span><span
                            className="_symbol_eubs4_9">$UP</span></div>
                    </div>
                    <div className="_root_oar9p_1 _type-white_oar9p_43">Connect wallet</div>
                    <div className="_socialCarousel_1xku1_1">
                        <div className="swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide swiper-slide-active" style={{width: "100%"}}>
                                    <div className="_itemWrap_1xku1_16 _itemWrapFirst_1xku1_20">
                                        <div className="_item_1xku1_6">
                                            <div className="_title_1xku1_28">OnlyUp COMMUNITY</div>
                                            <div className="_text_1xku1_34">Home for Telegram OGs</div>
                                            <div className="_button_1xku1_41">Join</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
                                <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span><span
                                className="swiper-pagination-bullet"></span></div>
                        </div>
                    </div>
                    <div className="_taskList_dti3z_1">
                        <div className="_title_dti3z_5">Tasks</div>
                        <div>
                            <div className="_listItem_1wi4k_1">
                                <div className="_media_1wi4k_8">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="800"
                                         height="700"
                                         viewBox="-60 40 590 450">
                                        <path fill="#ffffff"
                                              d="M144 64c0-8.8 7.2-16 16-16s16 7.2 16 16c0 9.1 5.1 17.4 13.3 21.5s17.9 3.2 25.1-2.3c2.7-2 6-3.2 9.6-3.2c8.8 0 16 7.2 16 16c0 9.1 5.1 17.4 13.3 21.5s17.9 3.2 25.1-2.3c2.7-2 6-3.2 9.6-3.2c8.8 0 16 7.2 16 16c0 9.1 5.1 17.4 13.3 21.5s17.9 3.2 25.1-2.3c2.7-2 6-3.2 9.6-3.2c8.8 0 16 7.2 16 16l0 104c0 31.3-20 58-48 67.9c-9.6 3.4-16 12.5-16 22.6L304 488c0 13.3 10.7 24 24 24s24-10.7 24-24l0-117.8c38-20.1 64-60.1 64-106.2l0-104c0-35.3-28.7-64-64-64c-2.8 0-5.6 .2-8.3 .5C332.8 77.1 311.9 64 288 64c-2.8 0-5.6 .2-8.3 .5C268.8 45.1 247.9 32 224 32c-2.8 0-5.6 .2-8.3 .5C204.8 13.1 183.9 0 160 0C124.7 0 96 28.7 96 64l0 64.3c-11.7 7.4-22.5 16.4-32 26.9l17.8 16.1L64 155.2l-9.4 10.5C40 181.8 32 202.8 32 224.6l0 12.8c0 49.6 24.2 96.1 64.8 124.5l13.8-19.7L96.8 361.9l8.9 6.2c6.9 4.8 14.4 8.6 22.3 11.3L128 488c0 13.3 10.7 24 24 24s24-10.7 24-24l0-128.1c0-12.6-9.8-23.1-22.4-23.9c-7.3-.5-14.3-2.9-20.3-7.1l-13.1 18.7 13.1-18.7-8.9-6.2C96.6 303.1 80 271.3 80 237.4l0-12.8c0-9.9 3.7-19.4 10.3-26.8l9.4-10.5c3.8-4.2 7.9-8.1 12.3-11.6l0 32.3c0 8.8 7.2 16 16 16s16-7.2 16-16l0-65.7 0-14.3 0-64z"/>
                                    </svg>
                                </div>
                                <div className="_body_1wi4k_22">
                                    <div className="_title_1wi4k_29">Send 🦴 to Bybit X.com</div>
                                    <div className="_footer_1wi4k_38">+100 DOGS</div>
                                </div>
                                <div className="_after_1wi4k_45">
                                    <div className="_root_oar9p_1 _type-dark_oar9p_58 _size-s_oar9p_31">Start</div>
                                </div>
                            </div>
                        </div>
                        <div className="_rewardList_1a8v0_1">
                            <div className="_title_1a8v0_5">Your rewards</div>
                            <div className="_item_n07eh_1">
                                <div className="_media_n07eh_8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="white" stroke-width="2"
                                              stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                                <div className="_body_n07eh_28">
                                    <div className="_text_n07eh_42">Daily Check-in</div>
                                </div>
                            <div className="_details_n07eh_51">+400 DOGS</div>
                          </div>

                    </div>
                        <a className="_policyLink_1vo1r_85"
                           href="https://cdn.onetime.dog/public/The%20Dogs%20PRIVACY%20POLICY.docx" target="_blank">Privacy
                            policy</a></div>
                </div>
            </div>
        </div>
    )
        ;
};

export default HomePage;
