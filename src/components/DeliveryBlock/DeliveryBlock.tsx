/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  editUserInfo,
  getUserInfo,
  selectUser,
} from "../../services/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { useEffect, useState, useCallback, useRef } from "react";
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
  const tokenExpiryTime = useAppSelector((state) => state.deliver.tokenExpiryTime);
  const loading = useAppSelector((state) => state.deliver.status);

  useEffect(() => {
    if (user.token) {
      dispatch(getUserInfo(user.token));
    }
  }, [dispatch, user]);
  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>('pickup');
  const lastRequestRef = useRef<string>(''); // Для отслеживания последнего запроса
  const isRequestInProgressRef = useRef<boolean>(false); // Для предотвращения параллельных запросов

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

  // Функция для проверки и обновления токена при необходимости
  const ensureValidToken = useCallback(async (): Promise<string | null> => {
    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenValid = tokenExpiryTime > 0 && currentTime < tokenExpiryTime;

    // Если токен валиден, возвращаем его
    if (isTokenValid && cdekToken.access_token) {
      return cdekToken.access_token;
    }

    // Если токен истек или отсутствует, запрашиваем новый
    try {
      const resultAction = await dispatch(
        authDeliverApi({
          grant_type: "client_credentials",
          client_id: "j8DuMgCvPlZ44wrKirinlIk2qIyWRv6X",
          client_secret: "dOb3lthS9H9KvZLc9IlUWd1yneFNlw3F",
        })
      );

      if (authDeliverApi.fulfilled.match(resultAction)) {
        return resultAction.payload.access_token;
      } else {
        console.error("Ошибка при запросе токена:", resultAction.payload);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при запросе токена:", error);
      return null;
    }
  }, [dispatch, tokenExpiryTime, cdekToken.access_token]);

  useEffect(() => {
    const fetchTokenAndCalculateDelivery = async () => {
      // Проверяем, не выполняется ли уже запрос
      if (isRequestInProgressRef.current) {
        return;
      }

      // Создаем уникальный ключ для запроса
      const requestKey = `${deliveryType}-${userData?.city}-${cartproducts.length}-${cartproducts.map(p => p.id).join(',')}`;

      // Если запрос с такими же параметрами уже выполнялся, пропускаем
      if (lastRequestRef.current === requestKey) {
        return;
      }

      if (userData && userData.city && cartproducts.length > 0) {
        isRequestInProgressRef.current = true;
        lastRequestRef.current = requestKey;

        try {
          // Убеждаемся, что токен валиден перед запросами
          const validToken = await ensureValidToken();
          if (!validToken) {
            console.error("Не удалось получить валидный токен");
            isRequestInProgressRef.current = false;
            return;
          }

          const tariffCode = deliveryType === 'courier' ? 137 : 136;

          let deliveryData;

          if (deliveryType === 'courier') {
            deliveryData = {
              to_location: {
                city: userData.city,
                address: userData.address,
              },
            };
          } else {
            // Для pickup сначала получаем список ПВЗ
            const countriesResult = await dispatch(getCountriesApi({ data: { city: userData.city }, token: validToken }));

            // Используем результат напрямую из action, если запрос успешен
            let countriesList: typeof countries = [];
            if (getCountriesApi.fulfilled.match(countriesResult)) {
              countriesList = countriesResult.payload;
            } else {
              // Если запрос не выполнен, используем данные из Redux state
              countriesList = countries;
            }

            // Используем код ПВЗ из localStorage (если выбран через виджет) или первый из списка
            const pvzCode = localStorage.getItem("pvz_code");
            let codeToUse: number | undefined;

            if (pvzCode && countriesList.length > 0) {
              // Пытаемся найти ПВЗ по коду из localStorage в списке countries
              const foundPvz = countriesList.find(c => c.code.toString() === pvzCode || c.code === Number(pvzCode));
              codeToUse = foundPvz?.code;
            }

            // Если не нашли по коду из localStorage, используем первый из списка
            if (!codeToUse && countriesList.length > 0) {
              codeToUse = countriesList[0].code;
            }

            if (!codeToUse) {
              console.error("Не удалось определить код ПВЗ");
              isRequestInProgressRef.current = false;
              return;
            }

            deliveryData = {
              to_location: {
                code: codeToUse,
              },
            };
          }

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
              token: validToken,
            })
          );
        } catch (error) {
          console.error("Ошибка при запросе:", error);
        } finally {
          isRequestInProgressRef.current = false;
        }
      }
    };

    fetchTokenAndCalculateDelivery();
  }, [dispatch, deliveryType, userData?.city, cartproducts, ensureValidToken]);

  // Инициализация токена при монтировании компонента
  useEffect(() => {
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
          console.log("Токен обновлен:", resultAction.payload);
        } else {
          console.error("Ошибка при запросе токена:", resultAction.payload);
        }
      } catch (error) {
        console.error("Ошибка при запросе токена:", error);
      }
    };

    const isTokenValid = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenExpiryTime > 0 && currentTime < tokenExpiryTime;
    };

    // Если токен отсутствует или истек, запросить новый
    if (!isTokenValid()) {
      requestToken();
    }

    // Установить интервал для проверки токена каждые 4 минуты (обновляем заранее, до истечения)
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        requestToken();
      }
    }, 4 * 60 * 1000); // Проверка каждые 4 минуты

    return () => clearInterval(interval);
  }, [dispatch, tokenExpiryTime]);

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

