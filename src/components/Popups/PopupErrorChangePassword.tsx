import { FC } from "react";
import Popup from "./Popup";
import Link from "next/link";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupErrorChangePassword: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
}) => {

  const handleClickClose = () => {
    setIsOpened(false);
  };

  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className={styles.popup__title}>
          Ошибка
        </h4>
        <p className={styles.popup__text}>
          Вы ввели неверный пароль
        </p>
        <Link
          href="/recover-password"
          className={styles.popup__link}
          onClick={() => setIsOpened(false)}
        >
          Страница для восстановление пароля
        </Link>
        <button
          className={styles.popup__close}
          onClick={handleClickClose}
        >
          Закрыть
        </button>
      </div>
    </Popup>
  );
};

