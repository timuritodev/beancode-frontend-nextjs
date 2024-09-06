import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch } from "../../services/typeHooks";
import {
  TITLE_VALIDATION_CONFIG,
  INN_VALIDATION_CONFIG,
  FIO_VALIDATION_CONFIG,
  EMAIL_VALIDATION_CONFIG,
  PHONE_VALIDATION_CONFIG,
  CONSUMPION_VALIDATION_CONFIG,
} from "../../utils/constants";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { IWholesale } from "../../types/Wholesale.types";
import { createWholesaleApi } from "../../services/redux/slices/wholesale/wholesale";
import { PopupWholesale } from "../../components/Popups/PopupWholesale";
import { sendEmailApi } from "../../services/redux/slices/mailer/mailer";
import Head from "next/head";

const WholesalePage = () => {
  const dispatch = useAppDispatch();

  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<IWholesale>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IWholesale> = () => {
    dispatch(
      createWholesaleApi({
        title: getValues("title"),
        inn: getValues("inn"),
        fio: getValues("fio"),
        phone: getValues("phone"),
        email: getValues("email"),
        consumption: getValues("consumption"),
      })
    )
    dispatch(
      sendEmailApi({
        email: getValues("email"),
        subject: "Опт",
        text: `Название организации - ${getValues("title")} \nИНН - ${getValues("inn")}  \nФИО - ${getValues("fio")} \nАдрес электронной почты - ${getValues("email")} \nНомер телефона - ${getValues("phone")} \nОриентировочное потребление - ${getValues("consumption")}`,
        greetings: "",
      })
    )
      .unwrap()
      .then(() => {
        setIsSavedPopupOpened(true);
      })
      .catch((err) => {
        console.log("dispatch signInUser err:", err);
      });
  };

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <>
      <Head>
        <title>Оптовая форма - Beancode</title>
        <meta name="description" content="Кофе в зернах с бесплатной доставкой до двери" />
        <meta name="keywords" content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru" />
        <meta property="og:title" content="Кофе в зернах с бесплатной доставкой" />
        <meta property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна. Прямые поставки сырья из Бразилии, Колумбии, Африки, Азии. Голландская линия обжарки. Международные стандарты качества" />
        <meta property="og:image" content="https://beancode.ru/images/open_graph.jpeg" />
      </Head>
      <div className={styles.signup}>
        <div className={styles.signup__container}>
          <h1 className={styles.signup__title}>Отправка формы</h1>
          <form
            className={styles.signup__form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <CustomInput
              inputType={CustomInputTypes.title}
              labelText={"Название организации"}
              validation={{
                ...register("title", TITLE_VALIDATION_CONFIG),
              }}
              placeholder="Название организации"
              error={errors?.title?.message}
            />
            <CustomInput
              inputType={CustomInputTypes.inn}
              labelText={"ИНН"}
              validation={{
                ...register("inn", INN_VALIDATION_CONFIG),
              }}
              placeholder="ИНН"
              error={errors?.inn?.message}
            />
            <CustomInput
              inputType={CustomInputTypes.fio}
              labelText={"ФИО"}
              validation={{
                ...register("fio", FIO_VALIDATION_CONFIG),
              }}
              placeholder="ФИО"
              error={errors?.fio?.message}
            />
            <CustomInput
              inputType={CustomInputTypes.phone}
              labelText={"Номер телефона"}
              validation={{
                ...register("phone", PHONE_VALIDATION_CONFIG),
              }}
              placeholder="+7-909-90-90-35"
              error={errors?.phone?.message}
            />
            <CustomInput
              inputType={CustomInputTypes.email}
              labelText={"Электронная почта"}
              validation={{
                ...register("email", EMAIL_VALIDATION_CONFIG),
              }}
              placeholder="email@example.com"
              error={errors?.email?.message}
            />
            <CustomInput
              inputType={CustomInputTypes.consumption}
              labelText={"Ориентировочная потребность в месяц в кг"}
              validation={{
                ...register("consumption", CONSUMPION_VALIDATION_CONFIG),
              }}
              placeholder="от 10 кг"
              error={errors?.consumption?.message}
            />
            <CustomButton
              buttonText={"Отправить данные"}
              handleButtonClick={handleSubmit(onSubmit)}
              disabled={!isDirty || !isValid}
              type="button"
            />
          </form>
        </div>
        <PopupWholesale
          isOpened={isSavedPopupOpened}
          setIsOpened={setIsSavedPopupOpened}
        />
      </div>
    </>
  );
};

export default WholesalePage;