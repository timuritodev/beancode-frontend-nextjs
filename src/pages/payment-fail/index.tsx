import styles from "./style.module.scss";

export const InfoPaymentPageFail = () => {
  return (
    <section className={styles.infoPayment}>
      <div className={styles.infoPayment__container}>
        <h1 className={styles.infoPayment__title}>Ошибка оплаты</h1>
      </div>
    </section>
  );
};
