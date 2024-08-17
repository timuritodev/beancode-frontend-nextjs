import { FC } from "react";
import "./BurgerButton.css";
import { Burger } from "../Burger/Burger.tsx";

interface IBurgerButtonProps {
  isPopupOpen: boolean;
  switchPopup: () => void;
}
export const BurgerButton: FC<IBurgerButtonProps> = ({
  isPopupOpen,
  switchPopup,
}) => {
  return (
    <div className="burger-button">
      <button className="burger-button__image" onClick={switchPopup} />
      <Burger isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
    </div>
  );
};
