import styles from "./style.module.scss";

export const BonusPage = () => {
  return (
    <section className={styles.bonus}>
      <div className={styles.bonus__container}>
        <h1 className={styles.bonus__title}>Бонусная программа</h1>
        <p className={styles.bonus__text}>
          Для зарегистрированных пользователей у нас предусмотрена накопительная
          <br /> система скидок
        </p>
      </div>
    </section>
  );
};

