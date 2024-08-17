import { FC } from "react";
import "./Grains.css";

interface ProductCardListProps {
  acidity: number;
  density: number;
}

export const Grains: FC<ProductCardListProps> = ({ acidity, density }) => {
  return (
    <div className="products__wrapper">
      <div className="grains__container">
        <div className="products__grains">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`grain ${index < acidity ? "filled" : "empty"}`}
            ></span>
          ))}
        </div>
        <p className="products__info">Кислотность</p>
      </div>
      <div className="grains__container">
        <div className="products__grains">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`grain ${index < density ? "filled" : "empty"}`}
            ></span>
          ))}
        </div>
        <p className="products__info">Плотность</p>
      </div>
    </div>
  );
};
