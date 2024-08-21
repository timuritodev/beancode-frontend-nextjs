import { FC } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";
import { useRouter } from "next/router";


interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopupRecoverPassword: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
}) => {
  const router = useRouter();

  const handleClickClose = () => {
    setIsOpened(false);
    router.push("/catalog");
  };

  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className={styles.popup__title}>Восстановление пароля</h4>
        <p className={styles.popup__text}>Письмо отправлено на указанную почту</p>
        <button className={styles.popup__close} onClick={handleClickClose}>
          Закрыть
        </button>
      </div>
    </Popup>
  );
};

