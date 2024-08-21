import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import Search from "../Search/Search";
import icon from "../../images/person_active.svg";
import loop from "../../images/loop.svg";
import loop_small from "../../images/loop_small.svg";
import logo from "../../images/logo.svg";
import { selectUser } from "../../services/redux/slices/user/user";
import { useAppSelector } from "../../services/typeHooks";
import Link from "next/link";

interface BurgerProps {
  isPopupOpen: boolean;
  switchPopup: () => void;
}

export const Burger: FC<BurgerProps> = ({ isPopupOpen, switchPopup }) => {
  const user = useAppSelector(selectUser);

  const [values, setValues] = useState("");
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    setValues(value);
  };

  const setSearchClose = () => {
    setIsOpenSearch(false);
  };

  const handleLinkClick = () => {
    switchPopup();
  };

  useEffect(() => {
    if (values.length > 0) {
      setIsOpenSearch(true);
    }
    if (values.length < 1) {
      setIsOpenSearch(false);
    }
  }, [values]);
  return (
    <div className={`${styles.burger} ${isPopupOpen ? styles.burger_opened : ""}`}>
      <div className={styles.burger__content}>
        <div className={styles.burger__container}>
          <div className={styles.burger_header__container}>
            <button
              className={styles.burger__close}
              type="button"
              onClick={switchPopup}
            />
            <Link href="/">
              <img
                className={styles.header__logo}
                alt="logo"
                src={logo}
                onClick={switchPopup}
              />
            </Link>
            <div className={styles.burger_links__wrapper}>
              <img
                className={styles.header__search_button_search}
                src={loop_small}
                alt="Кнопка поиска"
                onClick={switchPopup}
              />
              <Link href="/profile">
                <img
                  className={styles.header__profile_icon}
                  alt="icon"
                  src={icon}
                  onClick={switchPopup}
                />
              </Link>
            </div>
          </div>
          <form className={styles.burger__search}>
            <img
              className={styles.burger__search_button_search}
              src={loop}
              alt="Кнопка поиска"
            />
            <input
              className={styles.burger__search_input}
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
              switchPopup={switchPopup}
            />
          </form>
          <div className={styles.burger__links_container}>
            {/* {user.token && (
              <Link
                href="/catalog"
                className={styles.burger__link}
                onClick={handleLinkClick}
              >
                Интернет-магазин
              </Link>
            )} */}
            {user.token === "" && (
              <>
                <Link
                  href="/sign-up"
                  className={styles.burger__link}
                  onClick={handleLinkClick}
                >
                  Регистрация
                </Link>
                <Link
                  href="/sign-in"
                  className={styles.burger__link}
                  onClick={handleLinkClick}
                >
                  Вход в учетную запись
                </Link>
              </>
            )}
            <Link
              href="/catalog"
              className={styles.header__link}
              onClick={handleLinkClick}
            >
              Товары
            </Link>
            <Link
              href="/wholesale-page"
              className={styles.header__link}
              onClick={handleLinkClick}
            >
              Кофе для бизнеса
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

