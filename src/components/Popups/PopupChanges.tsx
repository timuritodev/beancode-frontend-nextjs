import { FC } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupChanges: FC<IChangesSavedPopup> = ({
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
          onClick={handleClickClose}
        ></button>
        <h4 className={styles.popup__title}>
          Сохранить изменения
        </h4>
        <p className={styles.popup__text}>
          Изменения сохранены
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

