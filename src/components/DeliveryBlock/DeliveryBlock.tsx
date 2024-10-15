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
import Loader from "../Loader/Loader";
import { Widget } from "./Widget";

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
  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>('courier');

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

  useEffect(() => {
    const fetchTokenAndCalculateDelivery = async () => {
      if (userData && userData.city) {
        try {
          await dispatch(getCountriesApi({ data: { city: userData.city }, token: cdekToken.access_token }));

          console.log(countries, "countries");

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

  console.log(deliveryType, 'delv')

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
              <Widget />
              <DeliveryCard data={deliveryPrice} image={cdek_logo} />
            </>
          )}
        </>
      )}
    </div>
  );
};

