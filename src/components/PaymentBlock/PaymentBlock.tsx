import styles from "./style.module.scss";
import { useState } from "react";

export const PaymentBlock = () => {
  const [isCart, setIsCart] = useState(true);
  const [isLater, setIsLater] = useState(false);

  const handleCardButtonClick = () => {
    setIsCart(true);
    setIsLater(false);
  };

  const handleLaterButtonClick = () => {
    setIsLater(true);
    setIsCart(false);
  };

  return (
    <div className={styles.block}>
      <label className={styles.block__radio_label}>
        <input
          type="radio"
          className={styles.block__radio_button}
          id="card"
          checked={isCart}
          onChange={handleCardButtonClick}
        />
        <span className={styles.block__radio_pseudoitem}></span>
        <span className={styles.block__radio_text}>
          Банковской картой на сайте
        </span>
      </label>
      <label className={styles.block__radio_label}>
        <input
          type="radio"
          className={styles.block__radio_button}
          id="later"
          checked={isLater}
          onChange={handleLaterButtonClick}
        />
        <span className={styles.block__radio_pseudoitem}></span>
        <span className={styles.block__radio_text}>Оплата при получении </span>
      </label>
    </div>
  );
};


