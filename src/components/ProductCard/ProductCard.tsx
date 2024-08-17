import { FC } from "react";
import "./ProductCard.css";
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
import { useNavigate } from "react-router";
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { ICart } from "../../types/Cart.types";
import { useResize } from "../../hooks/useResize";
import { API_BASE_URL } from "../../utils/constants";

interface ProductCardProps {
  data: ICart;
  count: number;
}

export const ProductCard: FC<ProductCardProps> = ({ data, count }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { width } = useResize();

  const handleClickImage = () => {
    navigate("/product-page");
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
    <div className="product-card">
      <img
        className="product-card__img"
        src={imageUrl}
        alt={data.title}
        onClick={handleClickImage}
      />
      <div className="product-card__text-container">
        <h3 className="product-card__title">{data.title}</h3>
        <p className="product-card__text">{data.weight}</p>
      </div>
      {width > 767 ? (
        <>
          <div className="product-card__count-container">
            <button className="product-card__button" onClick={handleClickMinus}>
              <img className="product-card__button__img_minus" src={minus} alt="icon minus"/>
            </button>
            <p className="product-card__count">{count}</p>
            <button className="product-card__button" onClick={handleClickPlus}>
              <img className="product-card__button__img_plus" src={plus} alt="icon plus"/>
            </button>
          </div>
          <p className="product-card__price">{data.price} ₽</p>
        </>
      ) : (
        <>
          <p className="product-card__price">{data.price} ₽</p>
          <div className="product-card__count-container">
            <button className="product-card__button" onClick={handleClickMinus}>
              <img className="product-card__button__img_minus" src={minus} alt="icon minus" />
            </button>
            <p className="product-card__count">{count}</p>
            <button className="product-card__button" onClick={handleClickPlus}>
              <img className="product-card__button__img_plus" src={plus} alt="icon plus"/>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
