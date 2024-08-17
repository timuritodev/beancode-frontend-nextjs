import { useEffect, useState } from "react";
import { DeliveryBlock } from "../../components/DeliveryBlock/DeliveryBlock";
import { Widget } from "../../components/DeliveryBlock/Widget";
import { OrderInputs } from "../../components/OrderInputs/OrderInputs";
import { OrderBlock } from "../../components/OrdersBlock/OrdersBlock";
import { PaymentBlock } from "../../components/PaymentBlock/PaymentBlock";
import { SessionOrderInputs } from "../../components/SessionOrderInputs/SessionOrderInputs";
import { selectUser } from "../../services/redux/slices/user/user";
import { useAppSelector } from "../../services/typeHooks";
import "./OrderPage.css";

export const OrderPage = () => {
  const user = useAppSelector(selectUser);

  const [dataSaved, setDataSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("dataSaved");
    if (savedData === "true" || user.token) {
      setDataSaved(true);
    }
  }, [user.token]);

  const handleDataSaved = () => {
    setDataSaved(true);
    localStorage.setItem("dataSaved", "true");
    // handleDataSaved(); // Вызываем переданную функцию
  };

  return (
    <section className="order-page">
      <div className="order-page__container">
        <h1 className="order-page__title">Оформление заказа</h1>
        <div className="order-page__wrapper">
          <div className="order-page__sec-wrapper">
            <div>
              <h2 className="order-page__subtitle">Личные данные</h2>
              {user.token ? (
                <OrderInputs />
              ) : (
                <SessionOrderInputs handleDataSaved={handleDataSaved} />
              )}
            </div>
            {/* <div>
              <h2 className="order-page__subtitle">Способы доставки</h2>
              <DeliveryBlock />   
              <Widget />
            </div> */}
            {/*
            <div>
              <h2 className="order-page__subtitle">Способы оплаты</h2>
              <PaymentBlock /> 
            </div> */}
          </div>
          <OrderBlock dataSaved={dataSaved} />
        </div>
      </div>
    </section>
  );
};
