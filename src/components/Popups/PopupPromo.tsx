import { FC } from "react";
import Popup from "./Popup";

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
      <div className="popup__container">
        <button
          type="button"
          className="popup__x-btn"
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className="popup__title profile__title_type_saved-changes">
          Применение промокода
        </h4>
        <p className="popup__text profile__text_type_saved-changes">
          Вы успешно применили промокод на {discount}%
        </p>
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
