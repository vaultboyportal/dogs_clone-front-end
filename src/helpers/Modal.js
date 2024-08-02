// src/components/Modal.js
import React, { useEffect } from 'react';
import '../Styles/mainStyles.css';

const Modal = ({ show, onClose, message }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) {
        return null;
    }

    return (
        <div className="_contentWrapper_tdqg9_9">
            <div className="_content_tdqg9_9">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 6L22 22M6 22L22 6" stroke="white" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                Complete Task and try again
            </div>
        </div>
    );
};

export default Modal;
