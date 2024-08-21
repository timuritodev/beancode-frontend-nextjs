import { FC } from "react";
import styles from "./style.module.scss";
import { Burger } from "../Burger/Burger";

interface IBurgerButtonProps {
  isPopupOpen: boolean;
  switchPopup: () => void;
}
export const BurgerButton: FC<IBurgerButtonProps> = ({
  isPopupOpen,
  switchPopup,
}) => {
  return (
    <div className={styles.burgerButton}>
      <button className={styles.burgerButton__image} onClick={switchPopup} />
      <Burger isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
    </div>
  );
};
