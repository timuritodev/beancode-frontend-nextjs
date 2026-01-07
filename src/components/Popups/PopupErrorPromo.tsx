import { FC } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage?: string;
}

export const PopupErrorPromo: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
  errorMessage,
}) => {

  const handleClickClose = () => {
    setIsOpened(false);
  };

  const defaultMessage = "Промокод введен неверно, либо его не существует";
  const message = errorMessage || defaultMessage;

  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className={styles.popup__title}>
          Ошибка применения промокода
        </h4>
        <p className={styles.popup__text}>
          {message}
        </p>
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

