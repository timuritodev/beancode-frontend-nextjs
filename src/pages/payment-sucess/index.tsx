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
import { getCartApi, getSessionCartApi } from "../../services/redux/slices/cart/cart";
import { useRouter } from "next/router";
import Head from 'next/head';

const InfoPaymentPageSucess = () => {
  const dispatch = useAppDispatch();
  const orderRes = useAppSelector((state) => state.pay.response);
  const orders = useAppSelector((state) => state.order.info);
  const orderStatus = useAppSelector((state) => state.orderStatus.response);
  const user = useAppSelector(selectUser);

  // Секретные данные больше не нужны - они на бэкенде

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
    // Обновляем список заказов
    if (user.id) {
      dispatch(getOrdersApi(user.id));
    }

    // Обновляем корзину после успешной оплаты (она должна быть пустой после удаления в webhook)
    if (user.token && user.id) {
      dispatch(getCartApi(user.id));
    } else {
      dispatch(getSessionCartApi());
    }
  }, [dispatch, user.id, user.token]);

  const currentTimestamp = Date.now();
  const currentDate = new Date(currentTimestamp);
  const formattedDate = currentDate.toISOString().split("T")[0];

  // useEffect(() => {
  //   if (!isOrderProcessed) {
  //     dispatch(
  //       createOrderApi({
  //         userId: user.id,
  //         phone: user.phone,
  //         email: user.email,
  //         address: user.address,
  //         city: user.city,
  //         sum: parseInt(sum || "0", 10),
  //         product_quantity: parseInt(product_quantity || "0", 10),
  //         products_info: products_info || "",
  //         orderNumber: orderId || "",
  //         date_order: formattedDate,
  //       })
  //     );
  //     // dispatch(
  //     //   sendEmailApi({
  //     //     email: user.email,
  //     //     subject: "Заказ",
  //     //     text: `Номер заказа - ${orderId} \nАдрес электронной почты - ${user.email} \nФИО - ${user.name} ${user.surname} \nНомер телефона - ${user.phone} \nАдрес - ${user.address} \nГород - ${user.city} \nСумма заказа - ${sum} руб.\nКол-во товаров - ${product_quantity} \nИнформация о товарах(id, Название, вес) - ${products_info}`,
  //     //     greetings: `Спасибо за ваш заказ.\n${products_info}`,
  //     //   })
  //     // );
  //   }
  // }, [
  //   dispatch,
  //   orderRes.orderId,
  //   payApiPassword,
  //   payApiUsername,
  //   user.id,
  //   user.email,
  //   user.phone,
  //   user.address,
  //   user.city,
  //   orderStatus.OrderStatus,
  //   user.name,
  //   user.surname,
  //   orderId,
  //   sum,
  //   product_quantity,
  //   products_info,
  //   formattedDate,
  //   isOrderProcessed,
  // ]);

  return (
    <>
      <Head>
        <title>Оплата прошла успешно - Beancode</title>
        <meta name="description" content="Ваш заказ успешно оплачен. Наш менеджер свяжется с вами для уточнения деталей." />
        <meta name="keywords" content="успешная оплата, подтверждение заказа, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/payment-success" />
        <meta property="og:title" content="Оплата прошла успешно - Beancode" />
        <meta property="og:description" content="Ваш заказ был успешно оплачен. Мы свяжемся с вами для уточнения всех деталей." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
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

