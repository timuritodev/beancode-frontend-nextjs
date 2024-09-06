import { Head } from "next/document";
import styles from "./style.module.scss";

const PaymentPage = () => {
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