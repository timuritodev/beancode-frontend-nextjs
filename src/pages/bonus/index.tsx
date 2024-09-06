import { Head } from "next/document";
import styles from "./style.module.scss";

const BonusPage = () => {
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
      <div className={styles.bonus}>
        <div className={styles.bonus__container}>
          <h1 className={styles.bonus__title}>Бонусная программа</h1>
          <p className={styles.bonus__text}>
            Для зарегистрированных пользователей у нас предусмотрена накопительная
            <br /> система скидок
          </p>
        </div>
      </div>
    </>
  );
};

export default BonusPage;