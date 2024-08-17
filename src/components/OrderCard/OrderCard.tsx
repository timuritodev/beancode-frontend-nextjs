import "./OrderCard.css";
import { ICart } from "../../types/Cart.types";
import { FC } from "react";
import { API_BASE_URL } from "../../utils/constants";

interface OrderCardProps {
  data: ICart;
  count: number;
}

export const OrderCard: FC<OrderCardProps> = ({ data, count }) => {

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className="order-card">
      <img className="order-card__img" src={imageUrl} alt="image of product"/>
      <p className="order-card__title">{data.title}</p>
      <p className="order-card__number">x{count}</p>
      <p className="order-card__price">{data.price} ₽</p>
    </div>
  );
};
