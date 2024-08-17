import "./PaymentBlock.css";
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
    <div className="payment-block">
      <label className="payment-block__radio-label">
        <input
          type="radio"
          className="payment-block__radio-button"
          id="card"
          checked={isCart}
          onChange={handleCardButtonClick}
        />
        <span className="payment-block__radio-pseudo-item"></span>
        <span className="payment-block__radio-text">
          Банковской картой на сайте
        </span>
      </label>
      <label className="payment-block__radio-label">
        <input
          type="radio"
          className="payment-block__radio-button"
          id="later"
          checked={isLater}
          onChange={handleLaterButtonClick}
        />
        <span className="payment-block__radio-pseudo-item"></span>
        <span className="payment-block__radio-text">Оплата при получении </span>
      </label>
    </div>
  );
};
