import { useState } from "react";
import { IProduct } from "../../types/Product.types";
import "./Product.css";
import { useNavigate } from "react-router";
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { useAppDispatch } from "../../services/typeHooks";
import { MinusPlusButtons } from "../MinusPlusButtons/MinusPlusButtons";
import { API_BASE_URL } from "../../utils/constants";
import { Grains } from "../Grains/Grains";

export const Product = ({ data }: { data: IProduct }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(data.low_price);
  const [selectedWeight, setSelectedWeight] = useState(data.low_weight);

  const handleClickImage = () => {
    navigate("/product-page");
    dispatch(getProductbyidApi(data.id));
  };

  const handleChange = (price: string, weight: string) => {
    setSelectedPrice(price);
    setSelectedWeight(weight);
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className="product">
      <div className="product__container">
        <img
          className="product__image"
          src={imageUrl}
          alt={data.title}
          onClick={handleClickImage}
        />
        <h2 className="product__title">{data.title}</h2>
        <p className="product__description">{data.description}</p>
        <div className="grains__wrapper">
          {data.density !== 0 && (
            <Grains acidity={data.acidity} density={data.density} />
          )}
        </div>
        <div className="product__wrapper">
          <div className="product__price__wrapper">
            <div
              className={`product__price__container ${
                selectedPrice === data.low_price ? "selected" : "not-selected"
              }`}
              onClick={() => handleChange(data.low_price, data.low_weight)}
            >
              <p className="product__price">{data.low_price} ₽/</p>
              <p className="product__weight"> {data.low_weight}</p>
            </div>
            {data.price !== "0" && (
              <div
                className={`product__price__container ${
                  selectedPrice === data.price ? "selected" : "not-selected"
                }`}
                onClick={() => handleChange(data.price, data.weight)}
              >
                <p className="product__price">{data.price} ₽/</p>
                <p className="product__weight"> {data.weight}</p>
              </div>
            )}
          </div>
          <MinusPlusButtons
            data={data}
            product_price={selectedPrice}
            product_weight={selectedWeight}
          />
        </div>
      </div>
    </div>
  );
};

// INSERT INTO product (title, description, price, weight, h_picture, v_picture,
//  acidity, density, big_description, low_price, low_weight, country) VALUES 
// ('Вся Бразилия', 'Серрадо, Можиана, Суль-де-Минас', '0', '0', 
// '/images/brazil_pack.jpeg', '/images/brazil_pack.jpeg', 0, 0, 'Для эспрессо', '1350', '3 х 250 гр', 'Набор');

// INSERT INTO product (title, description, price, weight, h_picture, v_picture,
//  acidity, density, big_description, low_price, low_weight, country) VALUES 
// ('Интересная Америка', 'Коста-Рико Ла Пастора, Гондурас Маджестик Лемпира, Колумбия Супремо', '0', '0', 
// '/images/america_pack.jpeg', '/images/america_pack.jpeg', 0, 0, 'Для эспрессо', '1850', '3 х 250 гр', 'Набор');

// INSERT INTO product (title, description, price, weight, h_picture, v_picture,
//  acidity, density, big_description, low_price, low_weight, country) VALUES 
// ('Вся Эфиопия', 'Гуджи мытая обработка, Гуджи анаэробная обработка', '0', '0', 
// '/images/brazil_pack.jpeg', '/images/brazil_pack.jpeg', 0, 0, 'Для эспрессо', '1350', '2 х 250 гр', 'Набор');

// INSERT INTO product (title, description, price, weight, h_picture, v_picture, acidity, density, big_description, low_price, low_weight) VALUES ('Набор из 3ёх сортов', 'Набор включает в себя наши лучшие сорта кофе', '0', '0', '/images/three_pack.jpeg', '/images/three_pack.jpeg', 0, 0, 'Для эспрессо', '1449', '750 гр');