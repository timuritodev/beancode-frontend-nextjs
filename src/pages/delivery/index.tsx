import { Head } from "next/document";
import styles from "./style.module.scss";

const DeliveryPage = () => {
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
