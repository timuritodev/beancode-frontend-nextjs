import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import logo from "../../images/logo.svg";
import icon from "../../images/person_active.svg";
import loop from "../../images/loop.svg";
import loop_small from "../../images/loop_small.svg";
import CartButton from "../CartButton/CartButton";
import Search from "../Search/Search";
import { useResize } from "../../hooks/useResize";
import { BurgerButton } from "../BurgerButton/BurgerButton";
import { useAppSelector } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  const [values, setValues] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setValues(value);
  };

  const { width } = useResize();

  const setSearchClose = () => {
    setIsOpenSearch(false);
  };

  useEffect(() => {
    if (values.length > 0) {
      setIsOpenSearch(true);
    }
    if (values.length < 1) {
      setIsOpenSearch(false);
    }
  }, [values]);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Burger

  const switchPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header
      className={`${styles.header} ${router.pathname === "/" ? styles.header_dark : ""}`}
    >
      <div className={styles.header__container}>
        {width < 767 && (
          <BurgerButton isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
        )}
        <Link href="/">
          <Image className={styles.header__logo} alt="Логотип Beancode" src={logo} />
        </Link>
        <div className={styles.header__links}>
          {/* {user.token && (
            <Link href="/catalog" className={styles.header__link}>
              Интернет-магазин
            </Link>
          )} */}
          {user.token === "" && (
            <>
              {/* <Link href="/sign-up" className={styles.header__link}>
                Регистрация
              </Link> */}
              <Link href="/sign-in" className={styles.header__link}>
                Вход
              </Link>
            </>
          )}
          <Link href="/catalog" className={styles.header__link}>
            Товары
          </Link>
          <Link href="/syrups" className={styles.header__link}>
            Сиропы
          </Link>
          <Link href="/coffee-machines" className={styles.header__link}>
            Кофемашины
          </Link>
          <Link href="/wholesale" className={styles.header__link}>
            Кофе для бизнеса
          </Link>
        </div>

        <div className={styles.header__search__container}>
          {width < 1279 ? (
            <Image
              className={styles.header__search_button_search}
              src={loop_small}
              alt="Кнопка поиска"
              onClick={switchPopup}
            />
          ) : (
            // TODO
            <form className={styles.header__search}>
              <Image
                className={styles.header__search_button_search}
                src={loop}
                alt="Кнопка поиска"
              />
              <input
                className={styles.header__search_input}
                id="name"
                name="name"
                type="text"
                placeholder="Поиск"
                onChange={handleChange}
                //   onBlur={setSearchClose}
                value={values}
                autoComplete="off"
              />
              <Search
                isOpenSearch={isOpenSearch}
                isClose={setSearchClose}
                values={values}
              />
            </form>
          )}
          <Link href="/profile">
            <Image className={styles.header__profile_icon} alt="Иконка профиля" src={icon} />
          </Link>
        </div>
      </div>
      <CartButton />
    </header>
  );
};

export default Header;

