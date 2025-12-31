import { useState } from "react";
import { PopupChat } from "../PopupChat/PopupChat";
import styles from './style.module.scss';

const ChatWidget = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const switchPopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <>
            <div className={styles.chatWidget}>
                <button className={styles.chatWidgetBtn} onClick={switchPopup} aria-label="Открыть чат">
                    <svg className={styles.chatWidgetIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <PopupChat
                isPopupOpen={isPopupOpen}
                switchPopup={switchPopup}
            />
        </>
    );
};

export default ChatWidget;

