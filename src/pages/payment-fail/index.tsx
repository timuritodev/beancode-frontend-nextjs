import styles from "./style.module.scss";

const InfoPaymentPageFail = () => {
  return (
    <section className={styles.infoPayment}>
      <div className={styles.infoPayment__container}>
        <h1 className={styles.infoPayment__title}>Ошибка оплаты</h1>
      </div>
    </section>
  );
};

export default InfoPaymentPageFail;