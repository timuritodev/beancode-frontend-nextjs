import "./Order.css";
// import { useNavigate } from "react-router";
// import { useAppDispatch } from "../../services/typeHooks";
import { IOrderDetails } from "../../types/Order.types";
import { Link } from "react-router-dom";

export const Order = ({ data }: { data: IOrderDetails }) => {
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

  const dateOrder = new Date(data.date_order);

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="order">
      <p className="order__number">№{data.orderNumber}</p>
      {/* <div className="order__text_wrapper">
        <p className="order__info">{data.info}</p>
        <p className="order_delivery">{data.delivery}</p>
      </div> */}
      <p className="order__status">Оплачено</p>
      <p className="order__products">{data.products_info}</p>
      <p className="order__link">{formatDate(dateOrder)}</p>
      {/* <Link className="order__link" to="/">
        Детали
      </Link> */}
      {/* <Link className="order__link" to="/">
        Оставить отзыв
      </Link> */}
    </div>
  );
};
