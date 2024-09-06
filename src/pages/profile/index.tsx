import styles from "./style.module.scss";
import exit_button from "../../images/exit-button.svg";
import cart from "../../images/shopping-cart.svg";
import cart_active from "../../images/shopping-cart_acitve.svg";
import person from "../../images/person.svg";
import person_active from "../../images/person_active.svg";
import { selectUser, signOut } from "../../services/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { useEffect, useState } from "react";
import { resetCart } from "../../services/redux/slices/cart/cart";
import { ProfileInputs } from "../../components/ProfileInputs/ProfileInputs";
import { OrderList } from "../../components/Order/OrderList";
import {
  getOrdersApi,
  resetOrders,
} from "../../services/redux/slices/order/order";
import { useResize } from "../../hooks/useResize";
import Link from "next/link";
import Image from "next/image";
import { Head } from "next/document";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const orders = useAppSelector((state) => state.order.info);

  const { width } = useResize();

  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isAccountVisible, setIsAccountVisible] = useState(true);

  const handleOrderButtonClick = () => {
    setIsOrderVisible(true);
    setIsAccountVisible(false);
  };

  const handleAccountButtonClick = () => {
    setIsAccountVisible(true);
    setIsOrderVisible(false);
  };

  useEffect(() => {
    if (user.token) {
      dispatch(getOrdersApi(user.id));
    }
  }, [dispatch, user.id, user.token]);

  return (
    <>
      <Head>
        <title>Оптовая форма - Beancode</title>
        <meta name="description" content="Кофе в зернах с бесплатной доставкой до двери" />
        <meta name="keywords" content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru" />
        <meta property="og:title" content="Кофе в зернах с бесплатной доставкой" />
        <meta property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна. Прямые поставки сырья из Бразилии, Колумбии, Африки, Азии. Голландская линия обжарки. Международные стандарты качества" />
        <meta property="og:image" content="https://beancode.ru/images/open_graph.jpeg" />
      </Head>
      <div className={styles.profile}>
        <div className={styles.profile__container}>
          <div className={styles.profile__buttons}>
            <button
              className={styles.button__profile}
              onClick={handleAccountButtonClick}
            >
              <Image
                className={styles.button__profile__img}
                src={isAccountVisible ? person_active : person}
                alt="icon profile"
              />
              <span
                className={`${styles.button__profile__text
                  } ${isAccountVisible ? styles.button__profile__text_active : ""}`}
              >
                Личные данные
              </span>
            </button>
            <button className={styles.button__profile} onClick={handleOrderButtonClick}>
              <Image
                className={styles.button__profile__img}
                src={isOrderVisible ? cart_active : cart}
                alt="icon cart"
              />
              <span
                className={`${styles.button__profile__text
                  } ${isOrderVisible ? styles.button__profile__text_active : ""}`}
              >
                Заказы
              </span>
            </button>
            {width > 767 && (
              <button
                className={styles.button__profile}
                onClick={() => {
                  dispatch(signOut());
                  dispatch(resetCart());
                  dispatch(resetOrders());
                }}
              >
                <Image className={styles.button__profile__img} src={exit_button} alt="icon exit" />
                <span className={styles.button__profile__text}>Выйти</span>
              </button>
            )}
          </div>
          {isAccountVisible && user.token !== "" ? (
            <ProfileInputs />
          ) : (
            user.token === "" && (
              <div className={styles.profile__links__container}>
                <Link href="/sign-up" className={styles.profile__link}>
                  Нужно Зарегистрироваться
                </Link>
                <p className={styles.profile__link}>или</p>
                <Link href="/sign-in" className={styles.profile__link}>
                  Войти в учетную запись
                </Link>
              </div>
            )
          )}
          {isOrderVisible && orders.length !== 0 && user.token !== "" ? (
            <OrderList data={orders} />
          ) : (
            isOrderVisible &&
            orders.length === 0 &&
            user.token !== "" && <p className={styles.profile__text}>Нет заказов</p>
          )}
          {width < 767 && (
            <button
              className={`${styles.button__profile} ${styles.button__profile_exit}`}
              onClick={() => {
                dispatch(signOut());
                dispatch(resetCart());
                dispatch(resetOrders());
              }}
            >
              <Image className={styles.button__profile__img} src={exit_button} alt="icon exit" />
              <span className={styles.button__profile__text}>Выйти</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;