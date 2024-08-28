import { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
  title: 'Бонусная программа',
  description: 'Бонусная программа с накопительной системой скидок для зарегистрированных пользователей',
  keywords: 'бонус, бонусная программа, скидки, накопительная система, зарегистрированные пользователи',
  icons: '/favicon.ico',
}

const BonusPage = () => {
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

export default BonusPage;
