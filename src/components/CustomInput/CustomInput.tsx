import { FC, useEffect, useState } from "react";
import { ICustomInput } from "../../types/CustomInput.types";
import InputMask  from "react-input-mask"; 

import "./CustomInput.css";

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
      ? "password" || "oldPassword" || "newPassword"
      : inputType;

  const InputComponent = inputType === "phone" ? InputMask : "input";

  return (
    <div className="input__wrapper">
      <div className="input__hints">
        {labelText ? (
          <label
            className={`input__label input__label_color_${
              color !== "white" ? "white" : "black"
            }`}
            htmlFor={inputType}
          >
            {labelText}
          </label>
        ) : null}
        {error ? <span className="input__error">{error}</span> : null}
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
        className={`input__field input__field_type_${inputType} input__field_color_${color} ${
          error ? "input__field_invalid" : ""
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
          className="input__button"
          type="button"
          onClick={togglePassword}
        />
      ) : null}
    </div>
  );
};

export default CustomInput;
