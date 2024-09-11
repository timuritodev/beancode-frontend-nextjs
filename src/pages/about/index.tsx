import Head from "next/head";
import styles from "./style.module.scss";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>О компании - Beancode</title>
        <meta
          name="description"
          content="Beancode - это производство кофе в зернах с доставкой по Набережным Челнам. Узнайте больше о компании и качестве нашей продукции."
        />
        <meta
          name="keywords"
          content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах, обжарка кофе, производство кофе"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/about" />
        <meta
          property="og:title"
          content="О компании - Beancode - Кофе в Набережных Челнах"
        />
        <meta
          property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна Beancode. Прямые поставки сырья из Бразилии, Колумбии, Африки и Азии с международными стандартами качества."
        />
        <meta
          property="og:image"
          content="https://beancode.ru/api/images/open_graph.jpeg"
        />
      </Head>
      <div className={styles.about}>
        <div className={styles.about__container}>
          <h1 className={styles.about__title}>О компании</h1>
          <p className={styles.about__text}>
            Наименование организации - ИП Мугерман Роман Борисович
          </p>
          <p className={styles.about__text}>
            Адрес - 423826, Республика Татарстан, г. Набережные Челны,
            проспект Казанский, 226 ст2
          </p>
          <p className={styles.about__text}>ИНН - 165036672535</p>
          <p className={styles.about__text}>ОГРНИП - 323169000234774</p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
