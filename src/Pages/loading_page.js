import React from "react";
import "../styles/mainStyles.css";

const PreLoad = () => {
    return(
      <img id="loader" width="120" height="120" class="readyToSlide" src={`${process.env.PUBLIC_URL}/resources_directory/13A8E8C5-B501-4EA6-B4AC-6BD22BD7A9BA.webp`}/>
    );
}

export default PreLoad;