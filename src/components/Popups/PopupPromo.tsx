import { FC } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  discount: number;
}

export const PopupPromo: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
  discount,
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
          Применение промокода
        </h4>
        <p className={styles.popup__text}>
          Вы успешно применили промокод на {discount}%
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

