import "./MinusPlusButtons.css";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import minus from "../../images/minus_white.svg";
import plus from "../../images/plus_white.svg";
import { IProduct } from "../../types/Product.types";
import { FC, useEffect, useState } from "react";
import {
  addToCartApi,
  addToSessionCartApi,
  deleteFromCartApi,
  deleteFromSessionCartApi,
} from "../../services/redux/slices/cart/cart";
import { PopupChanges } from "../Popups/PopupChanges";
import { PopupErrorAdd } from "../Popups/PopupErrorAdd";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

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

  const handleClickButton = () => {
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

  useEffect(() => {
    setIsSavedPopupOpened(false);
  }, []);

  return (
    <>
      {productCountInCart === 0 ? (
        <button
          type="submit"
          className={`product__button ${
            location.pathname === "/product-page"
              ? "minus-plus__count-container_add"
              : ""
          } `}
          onClick={handleClickButton}
        >
          В корзину
        </button>
      ) : (
        <div
          className={`minus-plus__count-container ${
            location.pathname === "/product-page"
              ? "minus-plus__count-container_add"
              : ""
          } `}
        >
          <button
            className="minus-plus__button minus-plus__button_minus"
            onClick={handleClickMinus}
          >
            <img className="minus-plus__button__img_minus" src={minus} alt="icon minus" />
          </button>
          <p className="minus-plus__count">{productCountInCart}</p>
          <button
            className="minus-plus__button minus-plus__button_plus"
            onClick={handleClickPlus}
          >
            <img className="minus-plus__button__img_plus" src={plus} alt="icon plus"/>
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
