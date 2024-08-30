import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import minus from "../../images/minus_white.svg";
import plus from "../../images/plus_white.svg";
import { IProduct } from "../../types/Product.types";
import {
  addToCartApi,
  addToSessionCartApi,
  deleteFromCartApi,
  deleteFromSessionCartApi,
} from "../../services/redux/slices/cart/cart";
import { PopupErrorAdd } from "../Popups/PopupErrorAdd";
import { useRouter } from "next/router"; // Use useRouter from next/router
import styles from "./style.module.scss";
import Image from "next/image";

interface MinusPlusButtonsProps {
  data: IProduct;
  product_price: string;
  product_weight: string;
}

export const MinusPlusButtons: FC<MinusPlusButtonsProps> = ({
  data,
  product_price,
  product_weight,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter(); // Initialize router

  const cartproduct = useAppSelector((state) => state.cart.cart);

  const userId = user.id;
  const productId = data.id;

  const [isSavedPopupOpened, setIsSavedPopupOpened] = useState<boolean>(false);

  const productCountInCart = cartproduct.filter(
    (item) => item.id === productId
  ).length;

  const handleClickPlus = () => {
    if (user.token) {
      dispatch(
        addToCartApi({ userId, productId, product_price, product_weight })
      );
    } else {
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
      dispatch(
        deleteFromSessionCartApi({ productId, product_price, product_weight })
      );
    }
  };

  const handleClickButton = () => {
    if (user.token) {
      dispatch(
        addToCartApi({ userId, productId, product_price, product_weight })
      );
    } else {
      dispatch(
        addToSessionCartApi({ productId, product_price, product_weight })
      );
    }
  };

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <>
      {productCountInCart === 0 ? (
        <button
          type="submit"
          className={`${styles.product__button} ${router.pathname === "/product" ? styles.minusplus__count_container_add : ""
            }`}
          onClick={handleClickButton}
        >
          В корзину
        </button>
      ) : (
        <div
          className={`${styles.minusplus__count_container} ${router.pathname === "/product" ? styles.minusplus__count_container_add : ""
            }`}
        >
          <button
            className={`${styles.minusplus__button} ${styles.minusplus__button_minus}`}
            onClick={handleClickMinus}
          >
            <Image
              className={styles.minusplus__button__img_minus}
              src={minus}
              alt="icon minus"
            />
          </button>
          <p className={styles.minusplus__count}>{productCountInCart}</p>
          <button
            className={`${styles.minusplus__button} ${styles.minusplus__button_plus}`}
            onClick={handleClickPlus}
          >
            <Image
              className={styles.minusplus__button__img_plus}
              src={plus}
              alt="icon plus"
            />
          </button>
        </div>
      )}
      <PopupErrorAdd
        isOpened={isSavedPopupOpened}
        setIsOpened={setIsSavedPopupOpened}
      />
    </>
  );
};
