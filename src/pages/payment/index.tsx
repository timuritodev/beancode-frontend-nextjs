import "./PaymentPage.css";

export const PaymentPage = () => {
  return (
    <section className="payment">
      <div className="payment__container">
        <h1 className="payment__title">Об оплате</h1>
        <p className="payment__text">
          Оплатить заказ можно онлайн на сайте или при получении.<br/> Юридическим
          лицам пришлём счёт на оплату сразу после оформления заказа.
        </p>
      </div>
    </section>
  );
};
