import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Подключаем хук для получения текущего адреса страницы
import "./CustomButton.css";

export interface ICustomButton {
  buttonText: string;
  handleButtonClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const CustomButton: FC<ICustomButton> = ({
  buttonText,
  handleButtonClick,
  type,
  disabled,
  className,
}) => {
  const location = useLocation(); // Получаем текущий адрес страницы

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === "Enter" && location.pathname !== "/order-page") {
      evt.preventDefault(); // Prevent default behavior of triggering the button click
      evt.stopPropagation(); // Stop event propagation to prevent multiple handlers from firing

      handleButtonClick && handleButtonClick();
    }
  };

  useEffect(() => {
    const handleEnterClick = (evt: KeyboardEvent) => {
      if (evt.key === "Enter" && location.pathname !== "/order-page") {
        handleButtonClick && handleButtonClick();
      }
    };

    document.addEventListener("keydown", handleEnterClick);

    return () => document.removeEventListener("keydown", handleEnterClick);
  }, [handleButtonClick, location]);

  return (
    <button
      className="button"
      disabled={disabled}
      type={type}
      onClick={handleButtonClick}
      onKeyDown={handleKeyDown}
    >
      {buttonText}
    </button>
  );
};
