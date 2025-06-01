// components/Header/Header.tsx
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
  // 1) Читаем user из Redux
  const user = useAppSelector(selectUser);
  const router = useRouter();

  // 2) Из хука useResize получаем width. 
  //    На сервере и в первом клиентском рендере width будет 0.
  const { width } = useResize();

  // 3) Локальный флаг, чтобы понимать, что мы уже на клиенте
  //    (SSR + первый клиентский рендер: isClient = false).
  //    После монтирования в браузере isClient станет true.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 4) Логика поиска (только в браузере)
  const [values, setValues] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  useEffect(() => {
    if (values.length > 0) {
      setIsOpenSearch(true);
    } else {
      setIsOpenSearch(false);
    }
  }, [values]);

  // 5) Логика бургерного меню
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const switchPopup = () => setIsPopupOpen((prev) => !prev);

  // 6) Вычисляем, какой токен нам использовать для условных веток:
  //    – если ещё не isClient, то считаем token пустым,
  //      чтобы серверный render и первый клиентский render совпадали
  //    – как только isClient === true, можно юзать настоящий user.token
  const tokenForRender = isClient ? user.token : "";

  return (
    <header
      className={`${styles.header} ${router.pathname === "/" ? styles.header_dark : ""
        }`}
    >
      <div className={styles.header__container}>
        {/*
          Условие с шириной. На сервере width=0, и в первом клиентском рендере width=0 → 
          width<767=true, поэтому и там, и там отрисуется BurgerButton. 
          Позже, когда isClient=true и width поменяется на реальный, React может перестроить.
        */}
        {isClient && width < 767 && <BurgerButton isPopupOpen={isPopupOpen} switchPopup={switchPopup} />}

        <Link href="/">
          <Image className={styles.header__logo} alt="Логотип Beancode" src={logo} />
        </Link>

        <div className={styles.header__links}>
          {/*
            Сравниваем tokenForRender. Если isClient=false → tokenForRender="" → рендерим "Вход".
            Когда isClient переключится в true, и real token будет != "", React после гидрации
            покажет "Профиль" — уже безопасно, потому что гидрация закончилась.
          */}
          {tokenForRender === "" ? (
            <Link href="/sign-in" className={styles.header__link}>
              Вход
            </Link>
          ) : (
            <Link href="/profile" className={styles.header__link}>
              Профиль
            </Link>
          )}
          <Link href="/catalog" className={styles.header__link}>
            Товары
          </Link>
          <Link href="/coffee-machines" className={styles.header__link}>
            Кофемашины
          </Link>
          <Link href="/wholesale" className={styles.header__link}>
            Кофе для бизнеса
          </Link>
        </div>

        <div className={styles.header__search__container}>
          {/*
            Аналогично: на SSR/первом клиентском render width=0 → width<1279=true,
            поэтому покажем маленькую иконку (loop_small). После гидрации, когда width
            реально >1279, React заменит на полноценную форму <form>.
          */}
          {width < 1279 ? (
            <Image
              className={styles.header__search_button_search}
              src={loop_small}
              alt="Кнопка поиска"
              onClick={() => setIsOpenSearch(true)}
            />
          ) : (
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
                onChange={(e) => setValues(e.target.value)}
                value={values}
                autoComplete="off"
              />
              <Search
                isOpenSearch={isOpenSearch}
                isClose={() => setIsOpenSearch(false)}
                values={values}
              />
            </form>
          )}
          <Link href="/profile">
            <Image
              className={styles.header__profile_icon}
              alt="Иконка профиля"
              src={icon}
            />
          </Link>
        </div>
      </div>
      <CartButton />
    </header>
  );
};

export default Header;
