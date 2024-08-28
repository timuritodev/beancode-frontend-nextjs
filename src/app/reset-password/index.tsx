import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { PASSWORD_VALIDATION_CONFIG } from "../../utils/constants";
import {
  changePassword,
  resetPassword,
} from "../../services/redux/slices/user/user";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PopupLogin } from "../../components/Popups/PopupLogin";
import { PopupErrorLogin } from "../../components/Popups/PopupErrorLogin";
import {
  IChangePassword,
  IRecoverPassword,
  IResetPassword,
} from "../../types/Auth.types";
import { selectUser } from "../../services/redux/slices/user/user";
import { PopupResetPassword } from "../../components/Popups/PopupResetPassword";
import { useRouter } from "next/router";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Сброс пароля - Ваш магазин',
  description: 'Введите новый пароль для сброса старого. Убедитесь, что новый пароль соответствует требованиям безопасности.',
  keywords: 'сброс пароля, новый пароль, восстановление пароля, безопасность пароля',
  icons: '/favicon.ico',
};

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [authError, setAuthError] = useState(false);
  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const { query } = useRouter();

  const token = query.token as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<IResetPassword>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IResetPassword> = () => {
    dispatch(
      resetPassword({
        token: token ? token : "",
        newPassword: getValues("newPassword"),
      })
    )
      .unwrap()
      .then((res) => {
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
    <section className={styles.signup}>
      <div className={styles.signup__container}>
        <h1 className={styles.signup__title}>Введите новый пароль</h1>
        <form
          className={styles.signup__form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CustomInput
            inputType={CustomInputTypes.newPassword}
            labelText="Новый пароль"
            showPasswordButton={true}
            validation={{
              ...register("newPassword", PASSWORD_VALIDATION_CONFIG),
            }}
            error={errors?.newPassword?.message}
          />
          <CustomButton
            buttonText={"Сменить пароль"}
            handleButtonClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
            type="button"
          />
        </form>
      </div>
      <PopupResetPassword
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

export default ResetPasswordPage;