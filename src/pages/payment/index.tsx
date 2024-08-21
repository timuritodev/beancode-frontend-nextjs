import styles from "./style.module.scss";

const PaymentPage = () => {
  return (
    <section className={styles.payment}>
      <div className={styles.payment__container}>
        <h1 className={styles.payment__title}>Об оплате</h1>
        <p className={styles.payment__text}>
          Оплатить заказ можно онлайн на сайте или при получении.<br /> Юридическим
          лицам пришлём счёт на оплату сразу после оформления заказа.
        </p>
      </div>
    </section>
  );
};

export default PaymentPage;