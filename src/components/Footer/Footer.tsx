import { FC } from "react";
import "./Footer.css";
import button from "../../images/paper-airplane.svg";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useAppDispatch } from "../../services/typeHooks";
import { subcribeApi } from "../../services/redux/slices/subscription/subscription";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import { CustomInputTypes } from "../../types/CustomInput.types";
import { EMAIL_VALIDATION_CONFIG } from "../../utils/constants";
import { ISubcription } from "../../types/Subcription.types";
import { useResize } from "../../hooks/useResize";

const Footer: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { width } = useResize();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISubcription>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ISubcription> = () => {
    dispatch(subcribeApi({ email: getValues("email") })).unwrap();
  };
  return (
    <footer
      className={`footer ${location.pathname === "/" ? "footer_dark" : ""}`}
    >
      <div className="footer__container">
        <div className="footer__blocks">
          <div className="subsribe__block">
            <h2 className="subscribe__title">Подпишитесь на нас,</h2>
            <p className="subscribe__text">
              Чтобы узнавать о новинках и скидках
            </p>
            <form
              className="footer-input__container"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <CustomInput
                inputType={CustomInputTypes.email}
                // labelText={"Электронная почта"}
                validation={{
                  ...register("email", EMAIL_VALIDATION_CONFIG),
                }}
                placeholder="email@example.com"
                error={errors?.email?.message}
              />
              <button className="subscribe__button">
                <img
                  className="subscribe__button_img"
                  alt="subscribe button image"
                  src={button}
                  onClick={handleSubmit(onSubmit)}
                />
              </button>
            </form>
          </div>
          <div className="faq__block">
            <h2 className="faq__title">FAQ</h2>
            <Link to="/delivery-page" className="faq__link">
              О доставке
            </Link>
            <Link to="/payment-page" className="faq__link">
              Об оплате
            </Link>
            {/* <Link to="/bonus-page" className="faq__link">
              Бонусная программа
            </Link> */}
            <Link to="/about-page" className="faq__link">
              О компании
            </Link>
          </div>
          <div className="contacts__block">
            <h2 className="contacts__title">Контакты</h2>
            <p className="contacts__text">По всем вопросам:</p>
            {/*<p className="contacts__number">+7911 910-33-29</p>
            <p className="contacts__text">Интернет-магазин</p>
            <p className="contacts__number">+921 912-00-95</p> */}
            <p className="contacts__number">+7 960 061-33-30</p>
            {width < 767 && (
              <h2 className="footer__email">coffee@beancode.ru</h2>
            )}
          </div>
        </div>
        <div className="logo__block">
          <img className="footer__logo" src={logo} alt="footer logo"/>
          {width > 767 && <h2 className="footer__email">coffee@beancode.ru</h2>}
        </div>
        <div className="copyright__block">
          <p className="copyright__text">© 2023. BEANCODE Все права защищены</p>
          {/* <p className="copyright__text">Дизайн - Гюзель Саберова</p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
