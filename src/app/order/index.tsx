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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Оформление заказа - Завершите покупку',
  description: 'Оформите свой заказ, заполнив личные данные и выбрав способы доставки и оплаты. У нас простая и удобная форма заказа, которая поможет вам завершить покупку без лишних усилий.',
  keywords: 'оформление заказа, покупка, личные данные, доставка, оплата, форма заказа',
  icons: '/favicon.ico',
};

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
    <section className={styles.orderPage}>
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
    </section>
  );
};

export default OrderPage;
