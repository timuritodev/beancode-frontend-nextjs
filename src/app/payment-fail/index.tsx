import { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
  title: 'Ошибка оплаты - Не удалось завершить транзакцию',
  description: 'Страница ошибки оплаты сообщает, что возникла проблема при попытке завершить транзакцию. Пожалуйста, попробуйте снова или свяжитесь с поддержкой.',
  keywords: 'ошибка оплаты, сбой транзакции, не удалось оплатить, проблемы с оплатой',
  icons: '/favicon.ico',
};

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