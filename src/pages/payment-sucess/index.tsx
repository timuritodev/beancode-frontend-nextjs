import styles from "./style.module.scss";
import { useAppSelector, useAppDispatch } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import { getStatusApi } from "../../services/redux/slices/orderStatus/orderStatus";
import { useEffect } from "react";
import {
  createOrderApi,
  getOrdersApi,
} from "../../services/redux/slices/order/order";
import { sendEmailApi } from "../../services/redux/slices/mailer/mailer";
import { useRouter } from "next/router";
import { Head } from "next/document";

const InfoPaymentPageSucess = () => {
  const dispatch = useAppDispatch();
  const orderRes = useAppSelector((state) => state.pay.response);
  const orders = useAppSelector((state) => state.order.info);
  const orderStatus = useAppSelector((state) => state.orderStatus.response);
  const user = useAppSelector(selectUser);

  const payApiUsername = process.env.NEXT_PUBLIC_PAY_API_USERNAME;
  const payApiPassword = process.env.NEXT_PUBLIC_PAY_API_PASSWORD;

  const { query } = useRouter();

  const orderId = query.orderId as string;
  const userId = query.userId as string;
  const email = query.email as string;
  const phone = query.phone as string;
  const sum = query.sum as string;
  const product_quantity = query.product_quantity as string;
  const products_info = query.products_info as string;

  const isOrderProcessed = orders.some(
    (order) => order.orderNumber === orderId
  );

  useEffect(() => {
    dispatch(getOrdersApi(user.id));
  }, [dispatch, user.id]);

  const currentTimestamp = Date.now();
  const currentDate = new Date(currentTimestamp);
  const formattedDate = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    if (!isOrderProcessed) {
      dispatch(
        createOrderApi({
          userId: user.id,
          phone: user.phone,
          email: user.email,
          address: user.address,
          city: user.city,
          sum: parseInt(sum || "0", 10),
          product_quantity: parseInt(product_quantity || "0", 10),
          products_info: products_info || "",
          orderNumber: orderId || "",
          date_order: formattedDate,
        })
      );
      // dispatch(
      //   sendEmailApi({
      //     email: user.email,
      //     subject: "Заказ",
      //     text: `Номер заказа - ${orderId} \nАдрес электронной почты - ${user.email} \nФИО - ${user.name} ${user.surname} \nНомер телефона - ${user.phone} \nАдрес - ${user.address} \nГород - ${user.city} \nСумма заказа - ${sum} руб.\nКол-во товаров - ${product_quantity} \nИнформация о товарах(id, Название, вес) - ${products_info}`,
      //     greetings: `Спасибо за ваш заказ.\n${products_info}`,
      //   })
      // );
    }
  }, [
    dispatch,
    orderRes.orderId,
    payApiPassword,
    payApiUsername,
    user.id,
    user.email,
    user.phone,
    user.address,
    user.city,
    orderStatus.OrderStatus,
    user.name,
    user.surname,
    orderId,
    sum,
    product_quantity,
    products_info,
    formattedDate,
    isOrderProcessed,
  ]);

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
      <div className={styles.infoPayment}>
        <div className={styles.infoPayment__container}>
          <h1 className={styles.infoPayment__title}>
            Оплата прошла успешно
          </h1>
          <p className={styles.infoPayment__text}>
            В ближайшее время с вами свяжется менеджер и уточнит детали заказа
          </p>
        </div>
      </div>
    </>
  );
};

export default InfoPaymentPageSucess;

