import Head from 'next/head';
import styles from "./style.module.scss";

const DeliveryPage = () => {
  return (
    <>
      <Head>
        <title>Условия доставки - Beancode</title>
        <meta name="description" content="Узнайте об условиях доставки кофе от Beancode. Бесплатная доставка до двери по России." />
        <meta name="keywords" content="доставка кофе, бесплатная доставка, условия доставки, Beancode" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/delivery" />
        <meta property="og:title" content="Условия доставки кофе - Beancode" />
        <meta property="og:description" content="Мы сотрудничаем с крупными транспортными компаниями и доставляем заказы до двери, пунктов выдачи и постаматов. Доставка за наш счёт." />
        <meta property="og:image" content="https://beancode.ru/images/delivery_og.jpeg" />
      </Head>
      <div className={styles.delivery}>
        <div className={styles.delivery__container}>
          <h1 className={styles.delivery__title}>О доставке</h1>
          <p className={styles.delivery__text}>
            Мы сотрудничаем с крупными транспортными компаниями и доставляем
            заказы
            <br /> до двери, пунктов выдачи и постаматов. Доставка за наш счёт.
            <br />
            Стоимость доставки в труднодоступные/удалённые города и регионы России
            <br />и другие страны рассчитывается автоматически в корзине.
          </p>
        </div>
      </div>
    </>
  );
};

export default DeliveryPage;
