import styles from "./style.module.scss";

const AboutPage = () => {
  return (
    <section className={styles.about}>
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
    </section>
  );
};

export default AboutPage;
