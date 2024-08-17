import { FC, useEffect, useState } from "react";
import "./Burger.css";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import icon from "../../images/person_active.svg";
import loop from "../../images/loop.svg";
import loop_small from "../../images/loop_small.svg";
import logo from "../../images/logo.svg";
import { selectUser } from "../../services/redux/slices/user/user";
import { useAppSelector } from "../../services/typeHooks";

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
    <div className={`burger ${isPopupOpen ? "burger_opened" : ""}`}>
      <div className="burger__content">
        <div className="burger__container">
          <div className="burger-header__container">
            <button
              className="burger__close"
              type="button"
              onClick={switchPopup}
            />
            <Link to="/">
              <img
                className="header__logo"
                alt="logo"
                src={logo}
                onClick={switchPopup}
              />
            </Link>
            <div className="burger-links__wrapper">
              <img
                className="header__search-button_search"
                src={loop_small}
                alt="Кнопка поиска"
                onClick={switchPopup}
              />
              <Link to="/profile">
                <img
                  className="header__profile-icon"
                  alt="icon"
                  src={icon}
                  onClick={switchPopup}
                />
              </Link>
            </div>
          </div>
          <form className="burger__search">
            <img
              className="burger__search-button_search"
              src={loop}
              alt="Кнопка поиска"
            />
            <input
              className="burger__search-input"
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
          <div className="burger__links-container">
            {/* {user.token && (
              <Link
                to="/catalog"
                className="burger__link"
                onClick={handleLinkClick}
              >
                Интернет-магазин
              </Link>
            )} */}
            {user.token === "" && (
              <>
                <Link
                  to="/sign-up"
                  className="burger__link"
                  onClick={handleLinkClick}
                >
                  Регистрация
                </Link>
                <Link
                  to="/sign-in"
                  className="burger__link"
                  onClick={handleLinkClick}
                >
                  Вход в учетную запись
                </Link>
              </>
            )}
            <Link
              to="/catalog"
              className="header__link"
              onClick={handleLinkClick}
            >
              Товары
            </Link>
            <Link
              to="/wholesale-page"
              className="header__link"
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
