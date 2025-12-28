import { FC } from "react";
import styles from "./style.module.scss";

interface PopupCookiesProps {
	isPopupOpen: boolean;
	handleAcceptCookies: () => void;
}

export const PopupCookies: FC<PopupCookiesProps> = ({
	isPopupOpen,
	handleAcceptCookies,
}) => {

	return (
		<div className={`${styles.popupCookies} ${isPopupOpen ? styles.popupCookies_opened : ""}`}>
			<div className={styles.popupCookies__content}>
				<h1 className={styles.popupCookies__title}>Использование файлов cookie</h1>
				<p className={styles.popupCookies__text}>
					Мы используем файлы cookie для улучшения работы сайта и персонализации контента.
					Продолжая использовать сайт, вы соглашаетесь на использование файлов cookie.
				</p>
				<div className={styles.popupCookies__button__container}>
					<button
						className={styles.popupCookies__button_accept}
						type="button"
						onClick={handleAcceptCookies}
					>
						Принять
					</button>
				</div>
			</div>
		</div>
	);
};

