import React from 'react';

const CommunitySlide = ({ title, text, buttonText }) => {
    return (
        <div className="swiper-slide swiper-slide-active" style={{ width: "100%" }}>
            <div className="_itemWrap_1xku1_16 _itemWrapFirst_1xku1_20">
                <div className="_item_1xku1_6">
                    <div className="_title_1xku1_28">{title}</div>
                    <div className="_text_1xku1_34">{text}</div>
                    <div className="_button_1xku1_41">{buttonText}</div>
                </div>
            </div>
        </div>
    );
};

export default CommunitySlide;
