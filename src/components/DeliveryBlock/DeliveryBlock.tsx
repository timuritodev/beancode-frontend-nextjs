/* eslint-disable @typescript-eslint/no-explicit-any */
import "./DeliveryBlock.css";
import {
  editUserInfo,
  getUserInfo,
  selectUser,
} from "../../services/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUpData } from "../../types/Auth.types";
import CustomInput from "../../components/CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { CITY_VALIDATION_CONFIG } from "../../utils/constants";
import { CustomButton } from "../CustomButton/CustomButton";
import { Helmet } from "react-helmet";

declare global {
  interface Window {
    CDEKWidget: any; // или замените 'any' на более конкретный тип, если он известен
  }
}

export const DeliveryBlock = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const token = user.token;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm<ISignUpData>({ mode: "onChange" });

  const data = {
    name: getValues("name"),
    surname: getValues("surname"),
    phone: getValues("phone"),
    email: getValues("email"),
    address: getValues("address"),
    city: getValues("city"),
    area: getValues("area") === undefined ? "" : getValues("area"),
    password: getValues("password"),
  };

  const onSubmit: SubmitHandler<ISignUpData> = () => {
    dispatch(
      editUserInfo({
        data: {
          name: getValues("name"),
          surname: getValues("surname"),
          phone: getValues("phone"),
          email: getValues("email"),
          address: getValues("address"),
          city: getValues("city"),
          area: getValues("area") === undefined ? "" : getValues("area"),
        },
        token: token,
      })
    ).unwrap();
  };

  useEffect(() => {
    if (user.token) {
      dispatch(getUserInfo(user.token));
    }
  }, [dispatch, user]);

  const [isDeliveryPointVisible, setIsDeliveryPointVisible] = useState(false);
  const [isCourierVisible, setIsCourierVisible] = useState(true);

  const handleDeliveryButtonClick = () => {
    setIsDeliveryPointVisible(true);
    setIsCourierVisible(false);
  };

  const handleCourierButtonClick = () => {
    setIsCourierVisible(true);
    setIsDeliveryPointVisible(false);
  };

  // useEffect(() => {
  //   document.addEventListener("DOMContentLoaded", function () {
  //     const yandexMapScript = document.createElement("script");
  //     yandexMapScript.src = `https://api-maps.yandex.ru/2.1/?apikey=c71385a4-e8d4-4e71-8c0d-f0d16956e3ba&lang=ru_RU`;
  //     yandexMapScript.async = true;
  //     yandexMapScript.onload = () => {
  //       new window.CDEKWidget({
  //         from: "Новосибирск",
  //         root: "cdek-map",
  //         apiKey: "c71385a4-e8d4-4e71-8c0d-f0d16956e3ba",
  //         servicePath: "https://bean-code.ru/service.php",
  //         defaultLocation: "Новосибирск",
  //       });
  //     };
  //     document.head.appendChild(yandexMapScript);
  //   });
  // }, []);

  return (
    <div className="delivery-block__container">
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
          // charset="utf-8"
        ></script>
      </Helmet>
      <CustomInput
        inputType={CustomInputTypes.city}
        labelText={"Город"}
        validation={{
          ...register("city", CITY_VALIDATION_CONFIG),
        }}
        placeholder="Москва"
        defaultValue={user.city}
        error={errors?.city?.message}
      />
      <CustomButton
        buttonText={"Изменить данные"}
        handleButtonClick={handleSubmit(onSubmit)}
        disabled={!isDirty || !isValid}
        type="button"
      />
      <div className="delivery-block__buttons_container">
        <button
          className={`delivery-block__button ${
            isDeliveryPointVisible ? "" : "delivery-block__button_add"
          }`}
          onClick={handleCourierButtonClick}
        >
          <span
            className={`delivery-block__button__text ${
              isDeliveryPointVisible ? "" : "delivery-block__button__text_add"
            }`}
          >
            Пункты выдачи
          </span>
        </button>
        <button
          className={`delivery-block__button ${
            isCourierVisible ? "" : "delivery-block__button_add"
          }`}
          onClick={handleDeliveryButtonClick}
        >
          <span
            className={`delivery-block__button__text ${
              isCourierVisible ? "" : "delivery-block__button__text_add"
            }`}
          >
            Курьером
          </span>
        </button>
      </div>
      {/* {isCourierVisible && <h2>СДЕК, 5POST</h2>} */}
      {/* {isCourierVisible && (
        <div id="cdek-map" style={{ width: "800px", height: "600px" }}></div>
      )} */}
      {isDeliveryPointVisible && <h2>Курьер</h2>}
    </div>
  );
};
