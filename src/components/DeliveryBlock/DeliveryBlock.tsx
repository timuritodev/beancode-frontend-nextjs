/* eslint-disable @typescript-eslint/no-explicit-any */
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
import styles from "./style.module.scss";
import { DeliveryCard } from "../DeliveryCard/DeliveryCard";
import cdek_logo from '../../images/cdek_logo.svg';
import { calculateDeliverApi, getCountriesApi } from "@/services/redux/slices/delivery/delivery";
import { UserData } from "../OrdersBlock/OrdersBlock";

declare global {
  interface Window {
    CDEKWidget: any; // или замените 'any' на более конкретный тип, если он известен
  }
}

export const DeliveryBlock = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deliveryPrice = useAppSelector((state) => state.deliver.deliveryPriceData);
  const cartproducts = useAppSelector((state) => state.cart.cart);
  const countries = useAppSelector((state) => state.deliver.deliveryCountries);
  const cdekToken = useAppSelector((state) => state.deliver.deliveryToken);

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

  let userData: UserData
  const storedData = localStorage.getItem("orderFormData");

  if (user.token) {
    userData = {
      userId: user.id,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      address: user.address,
      city: user.city,
    };
  } else if (storedData) {
    userData = JSON.parse(storedData);
  }

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


  useEffect(() => {
    const fetchTokenAndCalculateDelivery = async () => {
      if (user) {
        try {
          await dispatch(getCountriesApi({ data: { city: userData.city }, token: cdekToken.access_token }));

          console.log(countries, "countries");
          const deliveryData = isCourierVisible
            ? {
              to_location: {
                code: countries[0].code, // Если выбран пункт выдачи, используем код ПВЗ
              },
            }
            : {
              to_location: {
                city: userData.city,
                address: userData.address, // Если выбран курьер, используем адрес пользователя
              },
            };

          await dispatch(
            calculateDeliverApi({
              data: {
                tariff_code: 137,
                from_location: {
                  // code: 433,
                  city: 'Набережные Челны',
                  address: 'проспект Казанский, 226 ст2',
                },
                ...deliveryData,
                // to_location: {
                //   code: countries.code,
                //   // city: 'Казань',
                //   // address: 'улица Разведчика Ахмерова 7',
                // },
                packages: cartproducts.map((product) => ({
                  weight: parseFloat(product.weight),
                })),
              },
              token: cdekToken.access_token,
            })
          );
        } catch (error) {
          console.error("Ошибка при запросе:", error);
        }
      }
    };

    fetchTokenAndCalculateDelivery();
  }, [dispatch, user, isCourierVisible, isDeliveryPointVisible]);
  return (
    <div className={styles.delivery_block__container}>
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        // charset="utf-8"
        ></script>
      </Helmet>
      {/* <CustomInput
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
      /> */}
      <div className={styles.delivery_block__buttons_container}>
        <button
          className={`${styles.delivery_block__button} ${isDeliveryPointVisible ? "" : styles.delivery_block__button_add}`}
          onClick={handleCourierButtonClick}
        >
          <span
            className={`${styles.delivery_block__button__text} ${isDeliveryPointVisible ? "" : styles.delivery_block__button__text_add}`}
          >
            Пункты выдачи
          </span>
        </button>
        <button
          className={`${styles.delivery_block__button} ${isCourierVisible ? "" : styles.delivery_block__button_add}`}
          onClick={handleDeliveryButtonClick}
        >
          <span
            className={`${styles.delivery_block__button__text} ${isCourierVisible ? "" : styles.delivery_block__button__text_add}`}
          >
            Курьером
          </span>
        </button>
      </div>
      {isCourierVisible && <DeliveryCard data={deliveryPrice} image={cdek_logo} />}
      {isDeliveryPointVisible && <DeliveryCard data={deliveryPrice} image={cdek_logo} />}
      {/* {isCourierVisible && (
        <div id="cdek-map" style={{ width: "800px", height: "600px" }}></div>
      )} */}
    </div>
  );
};

