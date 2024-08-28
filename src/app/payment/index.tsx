import { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
  title: 'Оплата заказа - Информация о способах оплаты',
  description: 'Узнайте о способах оплаты вашего заказа. Оплатите онлайн на сайте или выберите оплату при получении. Юридическим лицам предоставляется счёт на оплату сразу после оформления заказа.',
  keywords: 'оплата заказа, способы оплаты, онлайн оплата, оплата при получении, счёт на оплату',
  icons: '/favicon.ico',
};

const PaymentPage = () => {
  return (
    <section className={styles.payment}>
      <div className={styles.payment__container}>
        <h1 className={styles.payment__title}>Об оплате</h1>
        <p className={styles.payment__text}>
          Оплатить заказ можно онлайн на сайте или при получении.<br /> Юридическим
          лицам пришлём счёт на оплату сразу после оформления заказа.
        </p>
      </div>
    </section>
  );
};

export default PaymentPage;