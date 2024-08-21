import { Order } from "./Order";
import { FC } from "react";
import { IOrderProps } from "../../types/Order.types";
import styles from "./style.module.scss";

export const OrderList: FC<IOrderProps> = ({ data }) => {
  return (
    <div className={styles.orderlist}>
      {data.length !== 0 &&
        data.map((item) => <Order key={item.id} data={item} />)}
    </div>
  );
};
