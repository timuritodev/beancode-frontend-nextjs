import { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
  title: 'О доставке - Доставка заказов',
  description: 'Мы сотрудничаем с крупными транспортными компаниями, обеспечивая доставку заказов до двери, пунктов выдачи и постаматов. Узнайте о нашей бесплатной доставке и стоимости доставки в удалённые регионы и другие страны.',
  keywords: 'доставка, транспортные компании, бесплатная доставка, доставка заказов, доставка в регионы',
  icons: '/favicon.ico',
};

const DeliveryPage = () => {
  return (
    <section className={styles.delivery}>
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
    </section>
  );
};

export default DeliveryPage;
