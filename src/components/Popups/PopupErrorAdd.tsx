import { FC } from "react";
import Popup from "./Popup";
import { Link } from "react-router-dom";

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
      <div className="popup__container">
        <button
          type="button"
          className="popup__x-btn"
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className="popup__title profile__title_type_saved-changes">
          Ошибка добавления товара в корзину
        </h4>
        <p className="popup__text profile__text_type_saved-changes">
          Для добавления товара в корзину нужно зарегистрироваться
        </p>
        <Link
          to="/sign-up"
          className="popup__link"
          onClick={() => setIsOpened(false)}
        >
          Регистрация
        </Link>
        <Link
          to="/sign-in"
          className="popup__link"
          onClick={() => setIsOpened(false)}
        >
          Вход в учетную запись
        </Link>
        <button
          className="popup__close popup__close_type_saved-changes"
          onClick={() => setIsOpened(false)}
        >
          Закрыть
        </button>
      </div>
    </Popup>
  );
};
