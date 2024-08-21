import styles from "./style.module.scss";

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
