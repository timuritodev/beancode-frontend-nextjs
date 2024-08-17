import { Link } from "react-router-dom";
import "./TreatmentBlock.css";

const TreatmentBlock = () => {
  return (
    <div className="treatment">
      <div className="treatment__container">
        <div className="treatment__text__container">
          <div className="treatment__digit-title__container">
            <p className="treatment__digit">05</p>
            <h2 className="treatment__title">
              Специальный подход
              <br /> к оптовым покупателям
            </h2>
          </div>
          <p className="treatment__text">
            Выстраиваем долгосрочные отношения с оптовыми покупателями на основе
            <br />
            индивидуального подбора смеси, формульного ценообразования.
          </p>
          <Link to="/wholesale-page" className="treatment__link">Страница для оптовых покупателей</Link>
        </div>
      </div>
    </div>
  );
};

export default TreatmentBlock;
