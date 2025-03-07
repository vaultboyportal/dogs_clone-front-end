import React, { useEffect } from "react";
import "../Styles/First_page.css"; // Додайте CSS для стилізації
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate("/second");
    };
    return (
        <div className="welcome-page">
            <img
                src={`${process.env.PUBLIC_URL}/resources_directory/image_2024-08-03_02-24-40.webp`}
                alt="Character"
                className="welcome-image"
            />
            <h1 className="welcome-text">👋Hey!</h1>
            <p className="welcome-subtext">Lets go $UP together!</p>
            <div className="_root_oar9p_1 _type-blue_oar9p_88 _fixedBottom_oar9p_110" onClick={handleButtonClick}>Wow, let's go!</div>
        </div>
    );
};

export default WelcomePage;
