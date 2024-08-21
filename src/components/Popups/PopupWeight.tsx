import { FC } from "react";
import Popup from "./Popup";
import { useAppSelector } from "../../services/typeHooks";
import styles from "./style.module.scss";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  weight: number;
}

export const PopupWeight: FC<IChangesSavedPopup> = ({
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
          Скидка при заказе от 10 кг
        </h4>
        <p className={styles.popup__text}>
          Если вы заказываете от 10 кг, вы получаете скидку в 10%
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

