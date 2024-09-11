import Head from 'next/head';
import styles from "./style.module.scss";

const InfoPaymentPageFail = () => {
  return (
    <>
      <Head>
        <title>Ошибка оплаты - Beancode</title>
        <meta name="description" content="Произошла ошибка при оплате заказа. Пожалуйста, попробуйте снова или свяжитесь с нами для получения помощи." />
        <meta name="keywords" content="ошибка оплаты, неудачная оплата, проблемы с оплатой, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/payment-fail" />
        <meta property="og:title" content="Ошибка оплаты - Beancode" />
        <meta property="og:description" content="Произошла ошибка при оплате заказа. Свяжитесь с нами, чтобы мы помогли вам решить эту проблему." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
      </Head>
      <div className={styles.infoPayment}>
        <div className={styles.infoPayment__container}>
          <h1 className={styles.infoPayment__title}>Ошибка оплаты</h1>
        </div>
      </div>
    </>
  );
};

export default InfoPaymentPageFail;