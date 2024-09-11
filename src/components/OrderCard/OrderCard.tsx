import styles from "./style.module.scss";
import { ICart } from "../../types/Cart.types";
import { FC } from "react";
import { API_BASE_URL } from "../../utils/constants";
import Image from "next/image";

interface OrderCardProps {
  data: ICart;
  count: number;
}

export const OrderCard: FC<OrderCardProps> = ({ data, count }) => {

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className={styles.orderCard}>
      <Image className={styles.orderCard__img} src={imageUrl} alt={`Изображение товара ${data.title}`} width={85} height={80} />
      <p className={styles.orderCard__title}>{data.title}</p>
      <p className={styles.orderCard__number}>x{count}</p>
      <p className={styles.orderCard__price}>{data.price} ₽</p>
    </div>
  );
};

