import { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
  title: 'О компании - ИП Мугерман Роман Борисович',
  description: 'Информация о компании ИП Мугерман Роман Борисович. Адрес, ИНН, ОГРНИП и другая юридическая информация.',
  keywords: 'ИП Мугерман Роман Борисович, О компании, Адрес, ИНН, ОГРНИП, Юридическая информация',
  icons: '/favicon.ico',
};

const AboutPage = () => {
  return (
    <section className={styles.about}>
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
    </section>
  );
};

export default AboutPage;
