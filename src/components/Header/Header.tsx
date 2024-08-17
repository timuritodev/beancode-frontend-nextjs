import { FC, useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
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

const Header: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

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
      className={`header ${location.pathname === "/" ? "header_dark" : ""}`}
    >
      <div className="header__container">
        {width < 767 && (
          <BurgerButton isPopupOpen={isPopupOpen} switchPopup={switchPopup} />
        )}
        <Link to="/">
          <img className="header__logo" alt="logo" src={logo} />
        </Link>
        <div className="header__links">
          {/* {user.token && (
            <Link to="/catalog" className="header__link">
              Интернет-магазин
            </Link>
          )} */}
          {user.token === "" && (
            <>
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
              <Link to="/sign-in" className="header__link">
                Вход в учетную запись
              </Link>
            </>
          )}
          <Link to="/catalog" className="header__link">
            Товары
          </Link>
          <Link to="/wholesale-page" className="header__link">
            Кофе для бизнеса
          </Link>
        </div>

        <div className="header__search__container">
          {width < 1279 ? (
            <img
              className="header__search-button_search"
              src={loop_small}
              alt="Кнопка поиска"
              onClick={switchPopup}
            />
          ) : (
            // TODO
            <form className="header__search">
              <img
                className="header__search-button_search"
                src={loop}
                alt="Кнопка поиска"
              />
              <input
                className="header__search-input"
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
          <Link to="/profile">
            <img className="header__profile-icon" alt="icon" src={icon} />
          </Link>
        </div>
      </div>
      <CartButton />
    </header>
  );
};

export default Header;
