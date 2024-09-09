import Head from 'next/head';
import styles from './style.module.scss';

const BonusPage = () => {
  return (
    <>
      <Head>
        <title>Бонусная программа - Beancode</title>
        <meta
          name="description"
          content="Узнайте о бонусной программе Beancode! Накопительная система скидок на кофе в зернах для зарегистрированных пользователей."
        />
        <meta
          name="keywords"
          content="бонусная программа, кофе со скидкой, накопительная система, оптовая форма, купить кофе челны, кофе в зернах"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/bonus" />
        <meta
          property="og:title"
          content="Бонусная программа - Beancode | Оптовая форма"
        />
        <meta
          property="og:description"
          content="Присоединяйтесь к бонусной программе Beancode и получите накопительные скидки на кофе в зернах с бесплатной доставкой. Подробности на странице!"
        />
        <meta
          property="og:image"
          content="https://beancode.ru/images/open_graph.jpeg"
        />
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
