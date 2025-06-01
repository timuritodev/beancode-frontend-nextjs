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
import { authDeliverApi, calculateDeliverApi, getCountriesApi } from "@/services/redux/slices/delivery/delivery";
import { UserData } from "../OrdersBlock/OrdersBlock";
import Loader from "../Loader/Loader";
import { Widget } from "../Widget/Widget";

declare global {
  interface Window {
    CDEKWidget: any;
  }
}

export const DeliveryBlock = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deliveryPrice = useAppSelector((state) => state.deliver.deliveryPriceData);
  const cartproducts = useAppSelector((state) => state.cart.cart);
  const countries = useAppSelector((state) => state.deliver.deliveryCountries);
  const cdekToken = useAppSelector((state) => state.deliver.deliveryToken);
  const loading = useAppSelector((state) => state.deliver.status);

  useEffect(() => {
    if (user.token) {
      dispatch(getUserInfo(user.token));
    }
  }, [dispatch, user]);
  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>('pickup');

  // let userData: UserData
  let userData: UserData = {
    userId: 0,
    name: '',
    surname: '',
    phone: '',
    email: '',
    address: '',
    city: ''
  };
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

  useEffect(() => {
    const fetchTokenAndCalculateDelivery = async () => {
      if (userData && userData.city) {
        try {
          await dispatch(getCountriesApi({ data: { city: userData.city }, token: cdekToken.access_token }));

          const tariffCode = deliveryType === 'courier' ? 137 : 136;

          const deliveryData = deliveryType === 'courier'
            ? {
              to_location: {
                city: userData.city,
                address: userData.address,
              },
            }
            : {
              to_location: {
                code: countries[0].code,
              },
            };

          await dispatch(
            calculateDeliverApi({
              data: {
                tariff_code: tariffCode,
                from_location: {
                  city: 'Набережные Челны',
                  address: 'проспект Казанский, 226 ст2',
                },
                ...deliveryData,
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
  }, [dispatch, user, deliveryType]);

  useEffect(() => {
    let tokenExpiryTime = 0; // Время истечения токена в формате UNIX
  
    const requestToken = async () => {
      try {
        const resultAction = await dispatch(
          authDeliverApi({
            grant_type: "client_credentials",
            client_id: "j8DuMgCvPlZ44wrKirinlIk2qIyWRv6X",
            client_secret: "dOb3lthS9H9KvZLc9IlUWd1yneFNlw3F",
          })
        );
  
        if (authDeliverApi.fulfilled.match(resultAction)) {
          const { access_token, expires_in } = resultAction.payload;
  
          // Установить время истечения токена
          tokenExpiryTime = Math.floor(Date.now() / 1000) + expires_in;
          console.log("Токен обновлен:", resultAction.payload);
        } else {
          console.error("Ошибка при запросе токена:", resultAction.payload);
        }
      } catch (error) {
        console.error("Ошибка при запросе токена:", error);
      }
    };
  
    const isTokenValid = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
      return currentTime < tokenExpiryTime; // Токен валиден, если текущее время меньше времени истечения
    };
  
    // Если токен отсутствует или истек, запросить новый
    if (!isTokenValid()) {
      requestToken();
    }
  
    // Установить интервал для проверки токена каждые 5 минут
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        requestToken();
      }
    }, 5 * 60 * 1000); // Проверка каждые 5 минут
  
    return () => clearInterval(interval);
  }, [dispatch]);
  
  return (
    <div className={styles.delivery_block__container}>
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        // charset="utf-8"
        ></script>
      </Helmet>
      <div className={styles.delivery_block__buttons_container}>
        <button
          className={`${styles.delivery_block__button} ${deliveryType === 'pickup' ? styles.delivery_block__button_add : ''}`}
          onClick={() => setDeliveryType('pickup')}
        >

          <span
            className={`${styles.delivery_block__button__text} ${deliveryType === 'courier' ? "" : styles.delivery_block__button__text_add}`}
          >
            Пункты выдачи
          </span>
        </button>
        <button
          className={`${styles.delivery_block__button} ${deliveryType === 'courier' ? styles.delivery_block__button_add : ''}`}
          onClick={() => setDeliveryType('courier')}
        >
          <span
            className={`${styles.delivery_block__button__text} ${deliveryType === 'pickup' ? "" : styles.delivery_block__button__text_add}`}
          >
            Курьером
          </span>
        </button>
      </div>
      {loading === "loading" ? (
        <Loader />
      ) : (
        <>
          {deliveryType === 'courier' ? (
            <DeliveryCard data={deliveryPrice} image={cdek_logo} />
          ) : (
            <>
              <Widget city={userData ? userData.city : 'Москва'} />
              <DeliveryCard data={deliveryPrice} image={cdek_logo} />
            </>
          )}
        </>
      )}
    </div>
  );
};

