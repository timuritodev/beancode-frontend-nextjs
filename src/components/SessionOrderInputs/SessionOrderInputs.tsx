/* eslint-disable @typescript-eslint/no-explicit-any */
import "../OrderInputs/OrderInputs.css";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUpData } from "../../types/Auth.types";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import {
  ADDRESS_VALIDATION_CONFIG,
  CITY_VALIDATION_CONFIG,
  EMAIL_VALIDATION_CONFIG,
  NAME_VALIDATION_CONFIG,
  PHONE_VALIDATION_CONFIG,
  SURNAME_VALIDATION_CONFIG,
} from "../../utils/constants";
import { PopupChanges } from "../Popups/PopupChanges";
import { CustomButton } from "../CustomButton/CustomButton";

interface FormData {
  userId: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
}

interface SessionOrderInputsProps {
  handleDataSaved: () => void;
}

export const SessionOrderInputs: FC<SessionOrderInputsProps> = ({
  handleDataSaved,
}) => {
  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState<FormData>(
    () => {
      const storedData = localStorage.getItem("orderFormData");
      return storedData
        ? JSON.parse(storedData)
        : {
            userId: "",
            name: "",
            surname: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            area: "",
          };
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ISignUpData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<any> = (data) => {
    localStorage.setItem("orderFormData", JSON.stringify(data));
    setIsSavedPopupOpened(true);
    handleDataSaved();
  };

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("orderFormData");
    if (storedData) {
      const formData: FormData = JSON.parse(storedData);
      setDataFromLocalStorage(formData);
    }
  }, []);

  return (
    <div className="account__container">
      <form
        className="input__container"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <CustomInput
          inputType={CustomInputTypes.name}
          labelText={"Имя"}
          validation={{
            ...register("name", NAME_VALIDATION_CONFIG),
          }}
          placeholder="Иван"
          defaultValue={dataFromLocalStorage?.name}
          error={errors?.name?.message}
        />
        <CustomInput
          inputType={CustomInputTypes.surname}
          labelText={"Фамилия"}
          validation={{
            ...register("surname", SURNAME_VALIDATION_CONFIG),
          }}
          placeholder="Иванов"
          defaultValue={dataFromLocalStorage?.surname}
          error={errors?.surname?.message}
        />
        <CustomInput
          inputType={CustomInputTypes.phone}
          labelText={"Номер телефона"}
          validation={{
            ...register("phone", PHONE_VALIDATION_CONFIG),
          }}
          placeholder="+7-909-90-90-35"
          defaultValue={dataFromLocalStorage?.phone}
          error={errors?.phone?.message}
        />
        <CustomInput
          inputType={CustomInputTypes.email}
          labelText={"Электронная почта"}
          validation={{
            ...register("email", EMAIL_VALIDATION_CONFIG),
          }}
          placeholder="email@example.com"
          defaultValue={dataFromLocalStorage?.email}
          error={errors?.email?.message}
        />
        <CustomInput
          inputType={CustomInputTypes.address}
          labelText={"Адрес"}
          validation={{
            ...register("address", ADDRESS_VALIDATION_CONFIG),
          }}
          placeholder="ул. Пушкина, д. 9, кв. 192"
          defaultValue={dataFromLocalStorage?.address}
          error={errors?.address?.message}
        />
        <CustomInput
          inputType={CustomInputTypes.city}
          labelText={"Город"}
          validation={{
            ...register("city", CITY_VALIDATION_CONFIG),
          }}
          placeholder="Москва"
          defaultValue={dataFromLocalStorage.city}
          error={errors?.city?.message}
        />
        <CustomButton
          buttonText={"Сохранить данные"}
          handleButtonClick={handleSubmit(onSubmit)}
          disabled={!isDirty || !isValid}
          type="button"
        />
      </form>
      <PopupChanges
        isOpened={isSavedPopupOpened}
        setIsOpened={setIsSavedPopupOpened}
      />
    </div>
  );
};
