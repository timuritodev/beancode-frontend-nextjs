import { FC } from "react";
import styles from "./style.module.scss";
// import { IProduct } from "../../types/Product.types";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import {
  addToCartApi,
  addToSessionCartApi,
  deleteFromCartApi,
  deleteFromSessionCartApi,
} from "../../services/redux/slices/cart/cart";
import { selectUser } from "../../services/redux/slices/user/user";
import minus from "../../images/minus.svg";
import plus from "../../images/plus.svg";
import { useRouter } from "next/router";
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { ICart } from "../../types/Cart.types";
import { useResize } from "../../hooks/useResize";
import { API_BASE_URL } from "../../utils/constants";
import Image from "next/image";

interface ProductCardProps {
  data: ICart;
  count: number;
}

export const ProductCard: FC<ProductCardProps> = ({ data, count }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { width } = useResize();

  const handleClickImage = () => {
    router.push("/product");
    dispatch(getProductbyidApi(data.id));
  };

  const userId = user.id;
  const productId = data.id;
  const product_price = data.price;
  const product_weight = data.weight;

  const handleClickPlus = () => {
    if (user.token) {
      dispatch(
        addToCartApi({ userId, productId, product_price, product_weight })
      );
    } else {
      // setIsSavedPopupOpened(true);
      dispatch(
        addToSessionCartApi({ productId, product_price, product_weight })
      );
    }
  };

  const handleClickMinus = () => {
    if (user.token) {
      dispatch(
        deleteFromCartApi({ userId, productId, product_price, product_weight })
      );
    } else {
      // setIsSavedPopupOpened(true);
      dispatch(
        deleteFromSessionCartApi({ productId, product_price, product_weight })
      );
    }
  };

  const imageUrl = API_BASE_URL + data.v_picture

  return (
    <div className={styles.productCard}>
      <Image
        className={styles.productCard__img}
        src={imageUrl}
        alt={`Изображение товара ${data.title}`}
        onClick={handleClickImage}
        width={100} height={100}
      />
      <div className={styles.productCard__textContainer}>
        <h3 className={styles.productCard__title}>{data.title}</h3>
        <p className={styles.productCard__text}>{data.weight}</p>
      </div>
      {width > 767 ? (
        <>
          <div className={styles.productCard__countContainer}>
            <button className={styles.productCard__button} onClick={handleClickMinus}>
              <Image className={styles.productCard__button__imgMinus} src={minus} alt="Иконка минуса" width={24} height={32}/>
            </button>
            <p className={styles.productCard__count}>{count}</p>
            <button className={styles.productCard__button} onClick={handleClickPlus}>
              <Image className={styles.productCard__button__imgPlus} src={plus} alt="Иконка плюса" width={24} height={32}/>
            </button>
          </div>
          <p className={styles.productCard__price}>{data.price} ₽</p>
        </>
      ) : (
        <>
          <p className={styles.productCard__price}>{data.price} ₽</p>
          <div className={styles.productCard__countContainer}>
            <button className={styles.productCard__button} onClick={handleClickMinus}>
              <Image className={styles.productCard__button__imgMinus} src={minus} alt="Иконка минуса" width={24} height={32}/>
            </button>
            <p className={styles.productCard__count}>{count}</p>
            <button className={styles.productCard__button} onClick={handleClickPlus}>
              <Image className={styles.productCard__button__imgPlus} src={plus} alt="Иконка плюса" width={24} height={32}/>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

