import { FC } from "react";
import Popup from "./Popup";
import { Link } from "react-router-dom";

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
      <div className="popup__container">
        <button
          type="button"
          className="popup__x-btn"
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className="popup__title profile__title_type_saved-changes">
          Ошибка
        </h4>
        <p className="popup__text profile__text_type_saved-changes">
          Вы ввели неверный пароль
        </p>
        <Link
          to="/recover-password"
          className="popup__link"
          onClick={() => setIsOpened(false)}
        >
          Страница для восстановление пароля
        </Link>
        <button
          className="popup__close popup__close_type_saved-changes"
          onClick={handleClickClose}
        >
          Закрыть
        </button>
      </div>
    </Popup>
  );
};
