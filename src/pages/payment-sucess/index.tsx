import styles from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import { useLayoutEffect } from "react";
import { getCartApi, getSessionCartApi, resetCart } from "../../services/redux/slices/cart/cart";
import Head from 'next/head';

const InfoPaymentPageSucess = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useLayoutEffect(() => {
    // Сбрасываем корзину в Redux сразу (синхронно до отрисовки)
    dispatch(resetCart());

    // Обновляем корзину после успешной оплаты (она должна быть пустой после удаления в webhook)
    // useLayoutEffect выполняется синхронно до отрисовки, что помогает избежать мигания
    // Добавляем небольшую задержку, чтобы дать webhook время обработаться
    const timer = setTimeout(() => {
      if (user.token && user.id) {
        dispatch(getCartApi(user.id));
      } else {
        dispatch(getSessionCartApi());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, user.id, user.token]);

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

