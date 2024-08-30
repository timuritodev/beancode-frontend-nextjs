import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

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
  const router = useRouter();

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === "Enter" && router.pathname !== "/order") {
      evt.preventDefault(); // Prevent default behavior of triggering the button click
      evt.stopPropagation(); // Stop event propagation to prevent multiple handlers from firing

      handleButtonClick && handleButtonClick();
    }
  };

  useEffect(() => {
    const handleEnterClick = (evt: KeyboardEvent) => {
      if (evt.key === "Enter" && router.pathname !== "/order") {
        handleButtonClick && handleButtonClick();
      }
    };

    document.addEventListener("keydown", handleEnterClick);

    return () => document.removeEventListener("keydown", handleEnterClick);
  }, [handleButtonClick, router]);

  return (
    <button
      className={styles.button}
      disabled={disabled}
      type={type}
      onClick={handleButtonClick}
      onKeyDown={handleKeyDown}
    >
      {buttonText}
    </button>
  );
};
