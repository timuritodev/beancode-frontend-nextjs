import { FC } from "react";
import Popup from "./Popup";
import { useAppSelector } from "../../services/typeHooks";

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
      <div className="popup__container">
        <button
          type="button"
          className="popup__x-btn"
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className="popup__title profile__title_type_saved-changes">
          Скидка при заказе от 10 кг
        </h4>
        <p className="popup__text profile__text_type_saved-changes">
          Если вы заказываете от 10 кг, вы получаете скидку в 10%
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
