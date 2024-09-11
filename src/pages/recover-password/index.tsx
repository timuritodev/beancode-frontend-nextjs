import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { EMAIL_VALIDATION_CONFIG } from "../../utils/constants";
import {
  changePassword,
  recoverPassword,
} from "../../services/redux/slices/user/user";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PopupLogin } from "../../components/Popups/PopupLogin";
import { PopupErrorLogin } from "../../components/Popups/PopupErrorLogin";
import { IRecoverPassword } from "../../types/Auth.types";
import { PopupErrorRecoverPassword } from "../../components/Popups/PopupErrorRecoverPassword";
import { PopupRecoverPassword } from "../../components/Popups/PopupRecoverPassword";
import Head from 'next/head';

const RecoverPasswordPage = () => {
  const dispatch = useAppDispatch();

  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<IRecoverPassword>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IRecoverPassword> = () => {
    dispatch(
      recoverPassword({
        email: getValues("email"),
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
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <>
      <Head>
        <title>Восстановление пароля - Beancode</title>
        <meta name="description" content="Страница восстановления пароля на Beancode. Введите вашу электронную почту, чтобы получить инструкции по сбросу пароля." />
        <meta name="keywords" content="восстановление пароля, сброс пароля, восстановить доступ, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/recover-password" />
        <meta property="og:title" content="Восстановление пароля - Beancode" />
        <meta property="og:description" content="Получите инструкции по восстановлению пароля для вашего аккаунта на Beancode. Введите ваш email, чтобы начать процесс восстановления." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
      </Head>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <h1 className={styles.signup__title}>Введите электронную почту</h1>
          <form
            className={styles.signup__form}
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
            <CustomButton
              buttonText={"Отправить"}
              handleButtonClick={handleSubmit(onSubmit)}
              disabled={!isDirty || !isValid}
              type="button"
            />
          </form>
        </div>
        <PopupRecoverPassword
          isOpened={isSavedPopupOpened}
          setIsOpened={setIsSavedPopupOpened}
        />
        <PopupErrorRecoverPassword
          isOpened={isErrorPopupOpened}
          setIsOpened={setIsErrorPopupOpened}
        />
      </div>
    </>
  );
};
// TODO проверить восстановление пароля
export default RecoverPasswordPage;