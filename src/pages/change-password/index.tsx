import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { PASSWORD_VALIDATION_CONFIG } from "../../utils/constants";
import { changePassword } from "../../services/redux/slices/user/user";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PopupChangePassword } from "../../components/Popups/PopupChangePassword";
import { PopupErrorChangePassword } from "../../components/Popups/PopupErrorChangePassword";
import { IChangePassword } from "../../types/Auth.types";
import { selectUser } from "../../services/redux/slices/user/user";
import styles from "./style.module.scss";
import Head from 'next/head';

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<IChangePassword>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IChangePassword> = (formData) => {
    dispatch(
      changePassword({
        data: {
          userId: user.id,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        token: user.token,
      })
    )
      .unwrap()
      .then((res) => {
        setIsSavedPopupOpened(true);
      })
      .catch((err) => {
        setIsErrorPopupOpened(true);
        console.log("dispatch changePassword err:", err);
      });
  };

  useEffect(() => {
    reset();
    setIsSavedPopupOpened(false);
  }, [reset]);

  return (
    <>
      <Head>
        <title>Смена пароля - Beancode</title>
        <meta name="description" content="Измените свой пароль для безопасного доступа к вашей учетной записи Beancode." />
        <meta name="keywords" content="смена пароля, безопасность, учетная запись, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/change-password" />
        <meta property="og:title" content="Смена пароля - Beancode" />
        <meta property="og:description" content="Измените свой пароль для безопасного доступа к вашей учетной записи Beancode." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
      </Head>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <h1 className={styles.signup__title}>Смена пароля</h1>
          <form
            className={styles.signup__form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <CustomInput
              inputType={CustomInputTypes.newPassword}
              labelText={"Старый пароль"}
              showPasswordButton={true}
              validation={{
                ...register("oldPassword", PASSWORD_VALIDATION_CONFIG),
              }}
              error={errors?.oldPassword?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue("oldPassword", e.target.value)
              }
            />
            <CustomInput
              inputType={CustomInputTypes.oldPassword}
              labelText={"Новый пароль"}
              showPasswordButton={true}
              validation={{
                ...register("newPassword", PASSWORD_VALIDATION_CONFIG),
              }}
              error={errors?.newPassword?.message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue("newPassword", e.target.value)
              }
            />
            <CustomButton
              buttonText={"Сменить пароль"}
              handleButtonClick={handleSubmit(onSubmit)}
              type="button"
            />
          </form>
        </div>
        <PopupChangePassword
          isOpened={isSavedPopupOpened}
          setIsOpened={setIsSavedPopupOpened}
        />
        <PopupErrorChangePassword
          isOpened={isErrorPopupOpened}
          setIsOpened={setIsErrorPopupOpened}
        />
      </div>
    </>
  );
};

export default ChangePasswordPage;
