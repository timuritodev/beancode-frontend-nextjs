import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link
        className="login-form__link login-form__link_profile not-found__link link"
        to="/"
        onClick={() => navigate(-1)}
      >
        Назад
      </Link>
    </section>
  );
};
