import "./Order.css";
import { Order } from "./Order";
import { FC } from "react";
import { IOrderProps } from "../../types/Order.types";

export const OrderList: FC<IOrderProps> = ({ data }) => {
  return (
    <div className="orderlist">
      {data.length !== 0 &&
        data.map((item) => <Order key={item.id} data={item} />)}
    </div>
  );
};
