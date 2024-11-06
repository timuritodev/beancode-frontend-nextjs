import { FC } from "react";
import Popup from "./Popup";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { useAppDispatch } from "../../services/typeHooks";
import {
  FIO_VALIDATION_CONFIG,
  EMAIL_VALIDATION_CONFIG,
  PHONE_VALIDATION_CONFIG,
} from "../../utils/constants";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { sendEmailApi } from "../../services/redux/slices/mailer/mailer";

interface IChangesSavedPopup {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Form {
  fio: string,
  email: string,
  phone: string,
}
export const PopupForm: FC<IChangesSavedPopup> = ({
  isOpened,
  setIsOpened,
}) => {
  const router = useRouter();

  const handleClickClose = () => {
    setIsOpened(false);
    router.push("/catalog");
  };

  const dispatch = useAppDispatch();

  const { title } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<Form>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Form> = () => {
    dispatch(
      sendEmailApi({
        email: getValues("email"),
        subject: "Кофе машины",
        text: `Модель - ${title} \nФИО - ${getValues("fio")} \nАдрес электронной почты - ${getValues("email")} \nНомер телефона - ${getValues("phone")} \n`,
        greetings: "",
      })
    )
      .unwrap()
      .catch((err) => {
        console.log("dispatch signInUser err:", err);
      });
  };

  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div className={styles.popup__container}>
        <button
          type="button"
          className={styles.btn_close}
          onClick={() => setIsOpened(false)}
        ></button>
        <h4 className={styles.popup__title}>Отправка формы</h4>
        <form
          className={styles.signup__form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
          <CustomButton
            buttonText={"Отправить данные"}
            handleButtonClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
            type="button"
          />
        </form>
        {/* <button className={styles.popup__close} onClick={handleClickClose}>
          Отправить
        </button> */}
      </div>
    </Popup>
  );
};

