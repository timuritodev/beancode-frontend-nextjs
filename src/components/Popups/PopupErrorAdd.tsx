import { FC } from "react";
import Popup from "./Popup";
import Link from "next/link";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupErrorAdd: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
}) => {
  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className={styles.popup__title}>
          Ошибка добавления товара в корзину
        </h4>
        <p className={styles.popup__text}>
          Для добавления товара в корзину нужно зарегистрироваться
        </p>
        <Link
          href="/sign-up"
          className={styles.popup__link}
          onClick={() => setIsOpened(false)}
        >
          Регистрация
        </Link>
        <Link
          href="/sign-in"
          className={styles.popup__link}
          onClick={() => setIsOpened(false)}
        >
          Вход в учетную запись
        </Link>
        <button
          className={styles.popup__close}
          onClick={() => setIsOpened(false)}
        >
          Закрыть
        </button>
      </div>
    </Popup>
  );
};

