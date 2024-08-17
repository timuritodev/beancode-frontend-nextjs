import "./CartButton.css";
import cart__img from "../../images/shopping-cart_acitve.svg";
import { useAppSelector } from "../../services/typeHooks";
import { useState } from "react";
import { PopupCart } from "../PopupCart/PopupCart";
import { useLocation } from 'react-router';

const CartButton = () => {
    const location = useLocation();

    const cart = useAppSelector((state) => state.cart.cart);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

	const switchPopupTrailer = () => {
		setIsPopupOpen(!isPopupOpen);
	};

    return (
        <>
            {cart.length !== 0 && location.pathname !== '/order-page' ? <div className="cart-button">
                <button className="cart-button__button" onClick={switchPopupTrailer}>
                    <p className="cart-button__text">{cart.length}</p>
                    <img className="cart-button__img" src={cart__img} alt="image of product" />
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
