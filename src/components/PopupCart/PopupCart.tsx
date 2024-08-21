import { useAppSelector, useAppDispatch } from "../../services/typeHooks";
import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { ProductCardList } from "../ProductCard/ProductCardList";
import { deleteAllApi, deleteAllSessionApi } from "../../services/redux/slices/cart/cart";
import { selectUser } from "../../services/redux/slices/user/user";
import { useRouter } from "next/router";

interface PopupCartProps {
  isPopupOpen: boolean;
  switchPopupTrailer: () => void;
}

export const PopupCart: FC<PopupCartProps> = ({
  isPopupOpen,
  switchPopupTrailer,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const cartproducts = useAppSelector((state) => state.cart.cart);

  const handleClickOrderButton = () => {
    router.push("/order");
    switchPopupTrailer();
  };

  let sum = 0;

  cartproducts.forEach((product) => {
    sum += parseInt(product.price, 10);
  });

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (isPopupOpen && cartproducts.length === 0) {
      switchPopupTrailer();
    }
  }, [cartproducts.length, isPopupOpen, switchPopupTrailer]);

  return (
    <div className={`${styles.popupCart} ${isPopupOpen ? styles.popupCart_opened : ""}`}>
      <div className={styles.popupCart__content}>
        <h1 className={styles.popupCart__title}>Ваша корзина</h1>
        <p className={styles.popupCart__text}>
          В вашей корзине {cartproducts.length} товаров
        </p>
        <ProductCardList data={cartproducts} />
        <div className={styles.popupCart__info__container}>
          <button
            className={styles.popupCart__button_delete}
            type="button"
            onClick={() => {
              user.token ? dispatch(deleteAllApi(user.id)) : dispatch(deleteAllSessionApi());
              switchPopupTrailer();
            }}
          >
            Удалить все
          </button>
          <p className={styles.popupCart__text__sum}>Всего: {sum} ₽</p>
        </div>
        <div className={styles.popupCart__button__container}>
          <button
            className={styles.popupCart__button_continue}
            type="button"
            onClick={switchPopupTrailer}
          >
            Продолжить покупки
          </button>
          <button
            className={styles.popupCart__button_order}
            type="button"
            onClick={handleClickOrderButton}
          >
            Оформить заказ
          </button>
        </div>
      </div>
      <button
        className={styles.popupCart__close}
        type="button"
        onClick={switchPopupTrailer}
      />
    </div>
  );
};

