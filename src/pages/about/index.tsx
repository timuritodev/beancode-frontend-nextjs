import { Head } from "next/document";
import styles from "./style.module.scss";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>О компании - Beancode</title>
        <meta name="description" content="Кофе в зернах с бесплатной доставкой до двери" />
        <meta name="keywords" content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru" />
        <meta property="og:title" content="Кофе в зернах с бесплатной доставкой" />
        <meta property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна. Прямые поставки сырья из Бразилии, Колумбии, Африки, Азии. Голландская линия обжарки. Международные стандарты качества" />
        <meta property="og:image" content="https://beancode.ru/images/open_graph.jpeg" />
      </Head>
      <div className={styles.about}>
        <div className={styles.about__container}>
          <h1 className={styles.about__title}>О компании</h1>
          <p className={styles.about__text}>
            Наименование организации - ИП Мугерман Роман Борисович
          </p>
          {/* <p className="about__text">
          Юридический адрес - 423826, Республика Татарстан, г. Набережные Челны,
          ул. З.Яруллина, д. 32
        </p> */}
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
