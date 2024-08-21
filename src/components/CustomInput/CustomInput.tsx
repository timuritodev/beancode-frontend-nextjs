import { FC, useEffect, useState } from "react";
import { ICustomInput } from "../../types/CustomInput.types";
import InputMask from "react-input-mask";

import styles from "./style.module.scss";

const CustomInput: FC<ICustomInput> = ({
  inputType,
  labelText,
  value,
  color = "white",
  readOnly = false,
  showPasswordButton = false,
  validation,
  error = "",
  onChange,
  max,
  placeholder,
  defaultValue,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  useEffect(() => {
    setIsPasswordHidden(true);
  }, []);

  function togglePassword() {
    setIsPasswordHidden(!isPasswordHidden);
  }

  const mask = inputType === "phone" ? "+7 (999) 999-99-99" : undefined;

  const inputTextType =
    inputType === "password" || inputType === "oldPassword" || inputType === "newPassword" && isPasswordHidden === false
      ? "text"
      : inputType === "repeatPassword"
        ? "password" // TODO check
        : inputType;

  const InputComponent = inputType === "phone" ? InputMask : "input";

  return (
    <div className={styles.input__wrapper}>
      <div className={styles.input__hints}>
        {labelText ? (
          <label
            className={`${styles.input__label} ${styles[`input__label_color_${color}`]}`}
            htmlFor={inputType}
          >
            {labelText}
          </label>
        ) : null}
        {error ? <span className={styles.input__error}>{error}</span> : null}
      </div>
      <InputComponent
        {...validation}
        onChange={
          onChange
            ? onChange
            : (e) => {
              validation.onChange(e);
            }
        }
        className={`${styles.input__field} ${styles[`input__field_type_${inputType}`]} ${styles[`input__field_color_${color}`]} ${error ? styles.input__field_invalid : ""
          }`}
        type={inputTextType}
        name={inputType}
        id={inputType}
        readOnly={readOnly}
        max={max}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={inputTextType === "date" ? 8 : undefined}
        value={readOnly && value ? value : undefined}
        mask={mask}
      />
      {showPasswordButton ? (
        <button
          className={styles.input__button}
          type="button"
          onClick={togglePassword}
        />
      ) : null}
    </div>
  );
};

export default CustomInput;

