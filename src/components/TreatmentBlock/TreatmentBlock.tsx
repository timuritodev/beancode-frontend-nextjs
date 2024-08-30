import Link from "next/link";
import styles from "./style.module.scss"; // Импортируйте CSS Module

const TreatmentBlock = () => {
  return (
    <div className={styles.treatment}>
      <div className={styles.treatment__container}>
        <div className={styles.treatment__text__container}>
          <div className={styles.treatment__digit_title__container}>
            <p className={styles.treatment__digit}>05</p>
            <h2 className={styles.treatment__title}>
              Специальный подход
              <br /> к оптовым покупателям
            </h2>
          </div>
          <p className={styles.treatment__text}>
            Выстраиваем долгосрочные отношения с оптовыми покупателями на основе
            <br />
            индивидуального подбора смеси, формульного ценообразования.
          </p>
          <Link href="/wholesale" className={styles.treatment__link}>
            Страница для оптовых покупателей
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TreatmentBlock;
