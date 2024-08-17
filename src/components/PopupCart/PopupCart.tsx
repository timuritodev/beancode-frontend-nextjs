import { useAppSelector, useAppDispatch } from "../../services/typeHooks";
import { FC, useEffect } from "react";
import "./PopupCart.css";
import { ProductCardList } from "../ProductCard/ProductCardList";
import { deleteAllApi, deleteAllSessionApi } from "../../services/redux/slices/cart/cart";
import { selectUser } from "../../services/redux/slices/user/user";
import { useNavigate } from "react-router";

interface PopupCartProps {
  isPopupOpen: boolean;
  switchPopupTrailer: () => void;
}

export const PopupCart: FC<PopupCartProps> = ({
  isPopupOpen,
  switchPopupTrailer,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const cartproducts = useAppSelector((state) => state.cart.cart);

  const handleClickOrderButton = () => {
    navigate("/order-page");
    switchPopupTrailer();
  };

  let sum = 0;

  cartproducts.forEach((product) => {
    sum += parseInt(product.price, 10);
  });

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (isPopupOpen && cartproducts.length === 0) {
      switchPopupTrailer();
    }
  }, [cartproducts.length, isPopupOpen, switchPopupTrailer]);

  return (
    <div className={`popup-cart ${isPopupOpen ? "popup-cart_opened" : ""}`}>
      <div className="popup-cart__content">
        <h1 className="popup-cart__title">Ваша корзина</h1>
        <p className="popup-cart__text">
          В вашей корзине {cartproducts.length} товаров
        </p>
        <ProductCardList data={cartproducts} />
        <div className="popup-cart__info__container">
          <button
            className="popup-cart__button-delete"
            type="button"
            onClick={() => {
              user.token ? dispatch(deleteAllApi(user.id)) : dispatch(deleteAllSessionApi());
              switchPopupTrailer();
            }}
          >
            Удалить все
          </button>
          <p className="popup-cart__text__sum">Всего: {sum} ₽</p>
        </div>
        <div className="popup-cart__button__container">
          <button
            className="popup-cart__button-continue"
            type="button"
            onClick={switchPopupTrailer}
          >
            Продолжить покупки
          </button>
          <button
            className="popup-cart__button-order"
            type="button"
            onClick={handleClickOrderButton}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      <button
        className="popup-cart__close"
        type="button"
        onClick={switchPopupTrailer}
      />
    </div>
  );
};
