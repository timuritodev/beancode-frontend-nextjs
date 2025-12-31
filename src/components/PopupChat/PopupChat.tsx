import { FC } from "react";
import styles from "./style.module.scss";

interface PopupChatProps {
	isPopupOpen: boolean;
	switchPopup: () => void;
}

export const PopupChat: FC<PopupChatProps> = ({
	isPopupOpen,
	switchPopup,
}) => {
	return (
		<div className={`${styles.popupChat} ${isPopupOpen ? styles.popupChat_opened : ""}`}>
			<div className={styles.popupChat__content}>
				<h1 className={styles.popupChat__title}>Помочь с выбором?</h1>
				<p className={styles.popupChat__text}>
					Звоните и пишете <a href="tel:+79600613330" className={styles.popupChat__link}>+7 960 061-33-30</a> в{" "}
					<a href="https://t.me/+79600613330" className={styles.popupChat__link} target="_blank" rel="noopener noreferrer">Telegram</a>,{" "}
					<a href="https://max.ru/user/phone/79600613330" className={styles.popupChat__link}>Max</a>,{" "}
				</p>
				<button
					className={styles.popupChat__close}
					type="button"
					onClick={switchPopup}
					aria-label="Закрыть"
				/>
			</div>
		</div>
	);
};

