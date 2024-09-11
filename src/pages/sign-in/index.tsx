import Head from 'next/head';
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
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
import Link from "next/link";

const SignInPage = () => {
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
    <>
      <Head>
        <title>Вход в личный кабинет - Beancode</title>
        <meta name="description" content="Введите свои данные для доступа в личный кабинет. Если у вас нет аккаунта, вы можете зарегистрироваться здесь." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/sign-in" />
        <meta property="og:title" content="Вход в личный кабинет - Beancode" />
        <meta property="og:description" content="Введите свои данные для доступа в личный кабинет. Если у вас нет аккаунта, вы можете зарегистрироваться здесь." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
      </Head>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <h1 className={styles.signup__title}>Вход в личный кабинет</h1>
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
            <CustomInput
              inputType={CustomInputTypes.password}
              labelText="Пароль"
              showPasswordButton={true}
              validation={{ ...register("password", PASSWORD_VALIDATION_CONFIG) }}
              error={errors?.password?.message}
            />
            <Link
              href="/recover-password"
              className={`${styles.auth__link} ${styles.auth__recover_link}`}
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
            <Link
              href="/sign-up"
              className={styles.signup__link}
            // TODO
            >
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
      </div>
    </>
  );
};

export default SignInPage;