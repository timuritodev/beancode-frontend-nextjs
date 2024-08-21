import { FC, ReactNode, useEffect } from 'react';
import styles from './style.module.scss';

interface IPopup {
	children: ReactNode;
	isOpened: boolean;
	setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: FC<IPopup> = ({ children, isOpened, setIsOpened }) => {
	const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (evt) => {
		if (evt.target === evt.currentTarget) {
			setIsOpened(false);
		}
	};

	useEffect(() => {
		const handleEscClick = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				setIsOpened(false);
			}
		};

		document.addEventListener('keydown', handleEscClick);

		return () => document.removeEventListener('keydown', handleEscClick);
	}, [setIsOpened]);

	useEffect(() => {
		const body = document.querySelector('body');
		if (isOpened) {
			body?.classList.add(styles.bodyScrollLock);
		} else {
			body?.classList.remove(styles.bodyScrollLock);
		}
	}, [isOpened]);

	return (
		<div
			className={`${styles.popup} ${isOpened ? styles.popup_opened : ''}`}
			onClick={handleOverlayClick}
		>
			{children}
		</div>
	);
};

export default Popup;
