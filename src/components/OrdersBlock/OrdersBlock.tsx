/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderCardList } from "../OrderCard/OrderCardList";
import styles from "./style.module.scss";
import { FC, use, useEffect, useState } from "react";
import button from "../../images/promo_button.svg";
import ic_info from "../../images/ic_info.svg";
import { useAppSelector, useAppDispatch } from "../../services/typeHooks";
// import { createOrderApi } from "../../services/redux/slices/order/order";
import { selectUser } from "../../services/redux/slices/user/user";
// import { sendEmailApi } from "../../services/redux/slices/mailer/mailer";
import { payApi } from "../../services/redux/slices/pay/pay";
import {
  deleteAllApi,
  deleteAllSessionApi,
  resetCart,
} from "../../services/redux/slices/cart/cart";
import { createOrderBackupApi } from "../../services/redux/slices/order/order";
import CustomInput from "../CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPromo } from "../../types/Promo.types";
import { promoApi } from "../../services/redux/slices/promo/promo";
import { CustomInputTypes } from "../../types/CustomInput.types";
import {
  PROMO_VALIDATION_CONFIG,
  getProductCountLabel,
} from "../../utils/constants";
import { PopupPromo } from "../Popups/PopupPromo";
import { PopupErrorPromo } from "../Popups/PopupErrorPromo";
import { CustomButton } from "../CustomButton/CustomButton";
import {
  authDeliverApi,
  calculateDeliverApi,
  deliverApi,
  getCountriesApi,
} from "../../services/redux/slices/delivery/delivery";
import Image from "next/image";
import { useRouter } from "next/router";

export interface UserData {
  userId: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

interface OrderBlockProps {
  dataSaved: boolean;
}

export const OrderBlock: FC<OrderBlockProps> = ({ dataSaved }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartproducts = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector(selectUser);
  const formUrl = useAppSelector((state) => state.pay.response.formUrl);
  const deliver = useAppSelector((state) => state.deliver.deliveryData);
  const countries = useAppSelector((state) => state.deliver.deliveryCountries);
  const cdekToken = useAppSelector((state) => state.deliver.deliveryToken);

  const randomOrderNumber = Math.floor(Math.random() * 900000) + 100000;

  const [redirecting, setRedirecting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const payApiUsername = process.env.NEXT_PUBLIC_PAY_API_USERNAME;
  const payApiPassword = process.env.NEXT_PUBLIC_PAY_API_PASSWORD;

  const [isPromoPopupOpened, setIsPromoPopupOpened] = useState<boolean>(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = useState<boolean>(false);

  const isPayButtonDisabled = !dataSaved || cartproducts.length === 0;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  let sum = 0;
  // let totalWeight = 0;
  // const deliveryCost = 250;

  cartproducts.forEach((product) => {
    sum += parseInt(product.price, 10);
    // totalWeight += parseFloat(product.weight) || 0;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IPromo>({ mode: "onChange" });

  const [discount, setDiscount] = useState(0);

  const trimPromoCode = (promoCode: string) => promoCode.trim();

  const onSubmit: SubmitHandler<IPromo> = () => {
    const trimmedPromoCode = trimPromoCode(getValues("promo"));
    dispatch(promoApi({ promo: trimmedPromoCode, userId: user.id }))
      .unwrap()
      .then((response) => {
        const discountValue = parseFloat(response.discount);
        setDiscount(discountValue);
        setIsPromoPopupOpened(true);
      })
      .catch((error) => {
        setIsErrorPopupOpened(true);
        console.error("Error applying promo code:", error);
      });
  };

  let discountedSum = sum;

  if (discount > 0) {
    discountedSum = sum * (1 - discount / 100);
  }

  // if (totalWeight < 1000) {
  //   discountedSum += deliveryCost;
  // }

  useEffect(() => {
    const discountFromStorage = localStorage.getItem("discount");
    if (discountFromStorage) {
      setDiscount(parseFloat(discountFromStorage));
    }
  }, []);

  // Обновление localStorage при изменении значения скидки
  useEffect(() => {
    localStorage.setItem("discount", discount.toString());
  }, [discount]);

  const products_info = cartproducts
    .map((item) => `${item.id} ${item.title} ${item.weight}`)
    .join(", ");

  const currentTimestamp = Date.now();
  const currentDate = new Date(currentTimestamp);
  const formattedDate = currentDate.toISOString().split("T")[0];

  let userData: UserData;

  const storedData = localStorage.getItem("orderFormData");

  // console.log(storedData, "storedData");
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

  const address_cdek = localStorage.getItem('Данные доставки')

  const handleClickPayButton = async () => {
    try {
      await dispatch(
        payApi({
          userName: payApiUsername,
          password: payApiPassword,
          orderNumber: `${randomOrderNumber}`,
          amount: `${discountedSum * 100}`,
          returnUrl: `https://beancode.ru/payment-sucess?orderId=${randomOrderNumber}&userId=${userData.userId}&email=${userData.email}&phone=${userData.phone}&sum=${discountedSum}&product_info=${products_info}&product_quantity=${cartproducts.length}`,
          // returnUrl: `http://localhost:5173/payment-sucess?orderId=${randomOrderNumber}&userId=${userData.userId}&email=${userData.email}&phone=${userData.phone}&sum=${discountedSum}&product_info=${products_info}&product_quantity=${cartproducts.length}`,
          failUrl: "https://beancode.ru/payment-fail",
          description: `Номер заказа - ${randomOrderNumber}, Информация о заказе(id, название, вес) - ${products_info}, Кол-во товаров - ${cartproducts.length}, Город - ${userData.city}, Адрес - ${userData.address}, Email - ${userData.email}, Телефон - ${userData.phone}, ФИО - ${userData.name} ${userData.surname}`,
          clientId: `${userData.userId}`,
          email: userData.email,
          phone: userData.phone,
        })
      );
      await dispatch(
        deliverApi({
          data: {
            number: randomOrderNumber.toString(),
            type: 1,
            tariff_code: 137,
            recipient: {
              name: `${userData.surname} ${userData.name}`,
              phones: [
                {
                  number: userData.phone,
                },
              ],
            },
            shipment_point: "NCHL46", // TODO либо from_location1
            ...(address_cdek
              ? { delivery_point: address_cdek } // Если есть address_cdek, используем его
              : {
                to_location: {
                  city: user.city,
                  address: userData.address, // Здесь строка адреса
                },
              }
            ),
            packages: cartproducts.map((product, index) => ({
              number: `bar-00${index + 1}`,
              comment: "Упаковка",
              // height: 10,
              // length: 10,
              weight: parseFloat(product.weight) || 0,
              // width: 10,
              items: [
                {
                  name: product.title,
                  ware_key: product.id.toString(),
                  payment: {
                    value: 0, // Тут должен быть 0, если нет оплаты за товар
                  },
                  cost: parseInt(product.price, 10),
                  amount: 1,
                  weight: parseFloat(product.weight) || 0,
                },
              ],
            })),
          },
          token: cdekToken.access_token,
        })
      );
      await dispatch(
        createOrderBackupApi({
          userId: userData.userId,
          phone: userData.phone,
          email: userData.email,
          address: userData.address,
          city: userData.city,
          sum: sum,
          product_quantity: cartproducts.length,
          products_info: products_info,
          orderNumber: `${randomOrderNumber}`,
          date_order: formattedDate,
        })
      );
      localStorage.removeItem("discount");
      // localStorage.removeItem("orderFormData");
      if (user.token) {
        await dispatch(deleteAllApi(user.id));
      } else {
        await dispatch(deleteAllSessionApi());
      }
      dispatch(resetCart());
      // await handleDeliverOrder();
      setRedirecting(true);
    } catch (error) {
      console.error("Error in payApi call:", error);
      return;
    }
  };

  const handleDeliverOrder = async () => {
    const address_cdek = localStorage.getItem('Данные доставки')
    try {
      const authResponse = await dispatch(
        authDeliverApi({
          grant_type: "client_credentials",
          client_id: "j8DuMgCvPlZ44wrKirinlIk2qIyWRv6X",
          client_secret: "dOb3lthS9H9KvZLc9IlUWd1yneFNlw3F",
        })
      ).unwrap();

      const token = authResponse.access_token;

      await dispatch(
        deliverApi({
          data: {
            number: randomOrderNumber.toString(),
            type: 1,
            tariff_code: 137,
            recipient: {
              name: `${userData.surname} ${userData.name}`,
              phones: [
                {
                  number: userData.phone,
                },
              ],
            },
            shipment_point: "NCHL46", // TODO либо from_location1
            ...(address_cdek
              ? { delivery_point: address_cdek } // Если есть address_cdek, используем его
              : {
                to_location: {
                  city: user.city,
                  address: userData.address, // Здесь строка адреса
                },
              }
            ),
            packages: cartproducts.map((product, index) => ({
              number: `bar-00${index + 1}`,
              comment: "Упаковка",
              // height: 10,
              // length: 10,
              weight: parseFloat(product.weight) || 0,
              // width: 10,
              items: [
                {
                  name: product.title,
                  ware_key: product.id.toString(),
                  payment: {
                    value: 0, // Тут должен быть 0, если нет оплаты за товар
                  },
                  cost: parseInt(product.price, 10),
                  amount: 1,
                  weight: parseFloat(product.weight) || 0,
                },
              ],
            })),
          },
          token: token,
        })
      );
    } catch (error) {
      console.error("Error during order registration:", error);
    }
  };

  // useEffect(() => {
  //   dispatch(getCountriesApi({ data: { city: userData.city }, token: cdekToken.access_token }));
  // }, [user])

  //         // await dispatch(getCountriesApi({ data: { city: userData.city }, token: token }));
  //         // Делаем запрос на расчет доставки
  //         await dispatch(
  //           calculateDeliverApi({
  //             data: {
  //               tariff_code: 137,
  //               from_location: {
  //                 // code: 433,
  //                 city: 'Набережные Челны',
  //                 address: 'проспект Казанский, 226 ст2',
  //               },
  //               to_location: {
  //                 code: countries.code,
  //                 // city: 'Казань',
  //                 // address: 'улица Разведчика Ахмерова 7',
  //               },
  //               packages: cartproducts.map((product) => ({
  //                 weight: parseFloat(product.weight),
  //               })),
  //             },
  //             token: token,
  //           })
  //         );
  //       } catch (error) {
  //         console.error("Ошибка при запросе:", error);
  //       }
  //     }
  //   };

  //   fetchTokenAndCalculateDelivery();
  // }, [dispatch, user]);

  useEffect(() => {
    if (redirecting && formUrl) {
      router.push(formUrl);
      setRedirecting(false);
    }
  }, [redirecting, formUrl, dispatch, user.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        authDeliverApi({
          grant_type: "client_credentials",
          client_id: "j8DuMgCvPlZ44wrKirinlIk2qIyWRv6X",
          client_secret: "dOb3lthS9H9KvZLc9IlUWd1yneFNlw3F",
        })
      )
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.orderBlock}>
      <h3 className={styles.orderBlock__title}>Ваш заказ</h3>
      <OrderCardList data={cartproducts} />
      <div className={styles.orderBlock__details}>
        <p className={styles.orderBlock__text}>
          {cartproducts.length} {getProductCountLabel(cartproducts.length)} на
          сумму
        </p>
        <p className={styles.orderBlock__text}>{sum} ₽</p>
      </div>
      {discount !== 0 ? (
        <p className={styles.orderBlock__sale}>{discountedSum} ₽ с учетом скидки {discount} %</p>
      ) : (
        ""
      )}
      {/* <div className={styles.orderBlock__details}>
        <p className{styles.orderBlock__text}rderBlock__text">Курьером...</p>
        <p className={styles.orderBlock__text}>{sum} ₽</p>
      </div> */}
      {/* <div className={styles.orderBlock__details}> */}
      {/* {totalWeight < 1000 ? (
        <p className={styles.orderBlock__text}>
          Итого - <span className={styles.orderBlock__total}>{discountedSum} ₽</span>,
          включая стоимость доставки 250 ₽
        </p>
      ) : (
        <p className={styles.orderBlock__text}>
          Итого - <span className={styles.orderBlock__total}>{discountedSum} ₽</span>
        </p>
      )}
      <p className={styles.orderBlock__text}>
        При заказе от 1кг доставка бесплатная по набережным челнам
      </p> */}
      {/* </div> */}
      <form
        className={styles.orderBlock__input_container}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <CustomInput
          inputType={CustomInputTypes.promo}
          labelText={"Поле для ввода промокода"}
          validation={{
            ...register("promo", PROMO_VALIDATION_CONFIG),
          }}
          // placeholder="email@example.com"
          error={errors?.promo?.message}
        />
        <button className={styles.orderBlock__button}>
          <Image
            className={styles.subscribe__button_img}
            alt="Иконка плюса"
            src={button}
            onClick={handleSubmit(onSubmit)}
          />
        </button>
      </form>
      <CustomButton
        buttonText={"Оплатить заказ"}
        handleButtonClick={handleClickPayButton}
        disabled={isPayButtonDisabled}
        type="submit"
        className={styles.orderBlock__pay_button}
      />
      <CustomButton
        buttonText={"Доставка"}
        handleButtonClick={handleDeliverOrder}
        disabled={!dataSaved}
        type="submit"
        className={styles.orderBlock__pay_button}
      />
      <p className={styles.orderBlock__disclaimer}>
        Нажимая на кнопку, я соглашаюсь на обработку моих персональных данных и
        ознакомлен(а) с условиями обработки персональных данных и регистрацией в
        программе лояльности.
      </p>
      <label className={styles.checkbox__order_block}>
        <input
          type="checkbox"
          className={styles.order__checkbox_button}
          id="female"
          value={1}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className={styles.order__checkbox_pseudoitem}></span>
        <span className={styles.span__checkbox}>
          Получать новости и спецпредложения
        </span>
        <Image className={styles.checkbox__img} src={ic_info} alt="Подписка на рассылку" />
      </label>
      <PopupPromo
        isOpened={isPromoPopupOpened}
        setIsOpened={setIsPromoPopupOpened}
        discount={discount}
      />
      <PopupErrorPromo
        isOpened={isErrorPopupOpened}
        setIsOpened={setIsErrorPopupOpened}
      />
    </div>
  );
};

