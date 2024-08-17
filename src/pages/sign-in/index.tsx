import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "./AuthPage.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch } from "../../services/typeHooks";
import { ISignInData } from "../../types/Auth.types";
import {
  EMAIL_VALIDATION_CONFIG,
  PASSWORD_VALIDATION_CONFIG,
} from "../../utils/constants";
import {
  signInUser,
  setUser,
  getUserInfo,
} from "../../services/redux/slices/user/user";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PopupLogin } from "../../components/Popups/PopupLogin";
import { PopupErrorLogin } from "../../components/Popups/PopupErrorLogin";

export const SignInPage = () => {
  const dispatch = useAppDispatch();

  const [authError, setAuthError] = useState(false);
  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<ISignInData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ISignInData> = () => {
    const formValues = getValues();

    dispatch(signInUser(formValues as ISignInData))
      .unwrap()
      .then((res) => {
        dispatch(setUser({ email: formValues.email, token: res }));
        return res;
      })
      .then((res) => {
        dispatch(getUserInfo(res));
        setIsSavedPopupOpened(true);
      })
      .catch((err) => {
        setIsErrorPopupOpened(true);
        console.log("dispatch signInUser err:", err);
      });
  };

  useEffect(() => {
    reset();
    setAuthError(false);
  }, [reset]);

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <section className="signup">
      <div className="signup__container">
        <h1 className="signup__title">Вход в личный кабинет</h1>
        <form
          className="signup__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CustomInput
            inputType={CustomInputTypes.email}
            labelText="Электронная почта"
            validation={{
              ...register("email", EMAIL_VALIDATION_CONFIG),
            }}
            error={errors?.email?.message}
            // maxLength={VALIDATION_SETTINGS.email.maxLength}
          />
          <CustomInput
            inputType={CustomInputTypes.password}
            labelText="Пароль"
            showPasswordButton={true}
            validation={{ ...register("password", PASSWORD_VALIDATION_CONFIG) }}
            error={errors?.password?.message}
          />
          <Link
            to="/recover-password"
            className="auth__link auth__recover-link"
          >
            Забыли пароль?
          </Link>
          {/* TODO recover button */}
          <CustomButton
            buttonText={"Войти"}
            handleButtonClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
            type="button"
          />
          <Link to="/sign-up" className="signup__link">
            Зарегистрироваться
          </Link>
        </form>
      </div>
      <PopupLogin
        isOpened={isSavedPopupOpened}
        setIsOpened={setIsSavedPopupOpened}
      />
      <PopupErrorLogin
        isOpened={isErrorPopupOpened}
        setIsOpened={setIsErrorPopupOpened}
      />
    </section>
  );
};
