import { useEffect, useState } from "react";
import { DeliveryBlock } from "../../components/DeliveryBlock/DeliveryBlock";
import { Widget } from "../../components/DeliveryBlock/Widget";
import { OrderInputs } from "../../components/OrderInputs/OrderInputs";
import { OrderBlock } from "../../components/OrdersBlock/OrdersBlock";
import { PaymentBlock } from "../../components/PaymentBlock/PaymentBlock";
import { SessionOrderInputs } from "../../components/SessionOrderInputs/SessionOrderInputs";
import { selectUser } from "../../services/redux/slices/user/user";
import { useAppSelector } from "../../services/typeHooks";
import styles from "./style.module.scss";
import { Head } from "next/document";

const OrderPage = () => {
  const user = useAppSelector(selectUser);

  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("dataSaved");
    if (savedData === "true" || user.token) {
      setDataSaved(true);
    }
  }, [user.token]);

  const handleDataSaved = () => {
    setDataSaved(true);
    localStorage.setItem("dataSaved", "true");
    // handleDataSaved(); // Вызываем переданную функцию
  };

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
      <div className={styles.orderPage}>
        <div className={styles.orderPage__container}>
          <h1 className={styles.orderPage__title}>Оформление заказа</h1>
          <div className={styles.orderPage__wrapper}>
            <div className={styles.orderPage__secWrapper}>
              <div>
                <h2 className={styles.orderPage__subtitle}>Личные данные</h2>
                {user.token ? (
                  <OrderInputs />
                ) : (
                  <SessionOrderInputs handleDataSaved={handleDataSaved} />
                )}
              </div>
              {/* <div>
              <h2 className={styles.orderPage__subtitle}>Способы доставки</h2>
              <DeliveryBlock />   
              <Widget />
            </div> */}
              {/*
            <div>
              <h2 className={styles.orderPage__subtitle}>Способы оплаты</h2>
              <PaymentBlock /> 
            </div> */}
            </div>
            <OrderBlock dataSaved={dataSaved} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
