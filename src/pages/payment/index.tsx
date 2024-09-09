import Head from 'next/head';
import styles from "./style.module.scss";

const PaymentPage = () => {
  return (
    <>
      <Head>
        <title>Оплата заказа - Beancode</title>
        <meta name="description" content="Узнайте об условиях оплаты заказа на кофе в зернах. Оплата онлайн или при получении, возможность оплаты для юридических лиц." />
        <meta name="keywords" content="оплата заказа, кофе в зернах, оплата онлайн, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/payment" />
        <meta property="og:title" content="Оплата заказа - Beancode" />
        <meta property="og:description" content="Оплатить заказ можно онлайн на сайте или при получении. Для юридических лиц доступна оплата по счёту." />
        <meta property="og:image" content="https://beancode.ru/images/payment_og.jpeg" />
      </Head>
      <div className={styles.payment}>
        <div className={styles.payment__container}>
          <h1 className={styles.payment__title}>Об оплате</h1>
          <p className={styles.payment__text}>
            Оплатить заказ можно онлайн на сайте или при получении.<br /> Юридическим
            лицам пришлём счёт на оплату сразу после оформления заказа.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;