import { useAppSelector } from "../../services/typeHooks";
import { useState } from "react";
import { PopupCart } from "../PopupCart/PopupCart";
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const CartButton = () => {
    const router = useRouter();

    const cart = useAppSelector((state) => state.cart.cart);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const switchPopupTrailer = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <>
            {cart.length !== 0 && router.pathname !== '/order-page' ? <div className={styles.cartButton}>
                <button className={styles.cartButtonBtn} onClick={switchPopupTrailer}>
                    <p className={styles.cartButtonText}>{cart.length}</p>
                    <img className={styles.cartButtonImg} src="/shopping-cart_active.svg" alt="image of product" />
                </button>
            </div> : ''
            }
            <PopupCart
                isPopupOpen={isPopupOpen}
                switchPopupTrailer={switchPopupTrailer}
            />
        </>
    );
};

export default CartButton;

