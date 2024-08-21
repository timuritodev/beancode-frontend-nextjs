import styles from "./style.module.scss";
// import { useNavigate } from "react-router";
// import { useAppDispatch } from "../../services/typeHooks";
import { IOrderDetails } from "../../types/Order.types";

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
    <div className={styles.order}>
      <p className={styles.order__number}>№{data.orderNumber}</p>
      {/* <div className={styles.order__text_wrapper}>
        <p className={styles.order__info}>{data.info}</p>
        <p className={styles.order_delivery}>{data.delivery}</p>
      </div> */}
      <p className={styles.order__status}>Оплачено</p>
      <p className={styles.order__products}>{data.products_info}</p>
      <p className={styles.order__link}>{formatDate(dateOrder)}</p>
      {/* <Link className={styles.order__link} to="/">
        Детали
      </Link> */}
      {/* <Link className={styles.order__link} to="/">
        Оставить отзыв
      </Link> */}
    </div>
  );
};

