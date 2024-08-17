/* eslint-disable @typescript-eslint/no-unused-vars */
import "./ProductPage.css";
import { useAppSelector } from "../../services/typeHooks";
import { ProductsSlider } from "../../components/ProductsSlider/ProductsSlider";
import { useEffect, useState } from "react";
import { MinusPlusButtons } from "../../components/MinusPlusButtons/MinusPlusButtons";
import { Grains } from "../../components/Grains/Grains";
import { useResize } from "../../hooks/useResize";
import Loader from "../../components/Loader/Loader";
import { API_BASE_URL } from "../../utils/constants";
import { ProductImagesSlider } from "../../components/ProductImagesSlider/ProductImagesSlider";

const ProductPage = () => {
  const product = useAppSelector((state) => state.productbyid.product);
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.productbyid.status);
  const { width } = useResize();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedPrice(product.low_price);
      setSelectedWeight(product.low_weight);
    }
  }, [product]);
  const handleChange = (price: string, weight: string) => {
    setSelectedPrice(price);
    setSelectedWeight(weight);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selected Option:", e.target.value);
  };

  const imageUrl = API_BASE_URL + product.v_picture;

  return (
    <>
      {loading === "loading" ? (
        <Loader />
      ) : (
        <div className="products">
          {width > 767 ? (
            <div className="products__container">
              <div className="products__container__wrapper">
                <div className="products__info__container">
                  <h2 className="products__title">{product.title}</h2>
                  <p className="products__description">{product.description}</p>
                  <p className="product__big-description">
                    {product.big_description}
                  </p>
                  {product.density !== 0 && (
                    <Grains
                      acidity={product.acidity}
                      density={product.density}
                    />
                  )}
                  <select
                    id="dropdown"
                    className="products__dropdown"
                    onChange={() => handleDropdownChange}
                  >
                    <option value="option1">В зернах</option>
                    {/* <option value="option2">Опция 2</option> */}
                    {/* <option value="option3">Опция 3</option> */}
                  </select>
                  <div className="product__big-weight__container">
                    {product.price !== "0" && (
                      <div
                        className={`products__price__container ${
                          selectedPrice === product.price
                            ? "product-selected"
                            : "product-not-selected"
                        }`}
                        onClick={() =>
                          handleChange(product.price, product.weight)
                        }
                      >
                        <p className="products__big-weight">
                          {" "}
                          {product.weight}
                        </p>
                      </div>
                    )}
                    <div
                      className={`products__price__container ${
                        selectedPrice === product.low_price
                          ? "product-selected"
                          : "product-not-selected"
                      }`}
                      onClick={() =>
                        handleChange(product.low_price, product.low_weight)
                      }
                    >
                      <p className="products__big-weight">
                        {" "}
                        {product.low_weight}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="products__info__container">
                  <img
                    className="products__image"
                    src={imageUrl}
                    alt={product.title}
                  />
                  {/* <ProductImagesSlider images={product.additional_pictures} /> */}
                  <div className="products__wrapper_2">
                    {selectedPrice === product.price ? (
                      <div className="products__price__container">
                        <p className="products__price">
                          {product.price} ₽&nbsp;
                        </p>
                        <p className="products__weight"> {product.weight}</p>
                      </div>
                    ) : (
                      <div className="products__price__container">
                        <p className="products__price">
                          {product.low_price} ₽&nbsp;
                        </p>
                        <p className="products__weight">
                          {" "}
                          {product.low_weight}
                        </p>
                      </div>
                    )}
                    <MinusPlusButtons
                      data={product}
                      product_price={selectedPrice}
                      product_weight={selectedWeight}
                    />
                  </div>
                </div>
              </div>
              <h2 className="products__title_slider">Вам может понравиться</h2>
              <div className="products__slider__container">
                <ProductsSlider data={products} />
              </div>
            </div>
          ) : (
            <div className="products__container">
              <div className="products__container__wrapper">
                <div className="products__info__container">
                  <h2 className="products__title">{product.title}</h2>
                  <p className="products__description">{product.description}</p>
                  <p className="product__big-description">
                    {product.big_description}
                  </p>
                </div>
                <div className="products__info__container">
                  <img
                    className="products__image"
                    src={imageUrl}
                    alt={product.title}
                  />
                  {/* <ProductImagesSlider images={product.additional_pictures} /> */}
                  <div className="">
                    <Grains
                      acidity={product.acidity}
                      density={product.density}
                    />
                    <select
                      id="dropdown"
                      className="products__dropdown"
                      onChange={() => handleDropdownChange}
                    >
                      <option value="option1">В зернах</option>
                      {/* <option value="option2">Опция 2</option> */}
                      {/* <option value="option3">Опция 3</option> */}
                    </select>
                    <div className="product__big-weight__container">
                      <div
                        className={`products__price__container ${
                          selectedPrice === product.price
                            ? "product-selected"
                            : "product-not-selected"
                        }`}
                        onClick={() =>
                          handleChange(product.price, product.weight)
                        }
                      >
                        <p className="products__big-weight">
                          {" "}
                          {product.weight}
                        </p>
                      </div>
                      <div
                        className={`products__price__container ${
                          selectedPrice === product.low_price
                            ? "product-selected"
                            : "product-not-selected"
                        }`}
                        onClick={() =>
                          handleChange(product.low_price, product.low_weight)
                        }
                      >
                        <p className="products__big-weight">
                          {" "}
                          {product.low_weight}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="products__wrapper_2">
                    {selectedPrice === product.price ? (
                      <div className="products__price__container">
                        <p className="products__price">
                          {product.price} ₽&nbsp;
                        </p>
                        <p className="products__weight"> {product.weight}</p>
                      </div>
                    ) : (
                      <div className="products__price__container">
                        <p className="products__price">
                          {product.low_price} ₽&nbsp;
                        </p>
                        <p className="products__weight">
                          {" "}
                          {product.low_weight}
                        </p>
                      </div>
                    )}
                  </div>
                  <MinusPlusButtons
                    data={product}
                    product_price={selectedPrice}
                    product_weight={selectedWeight}
                  />
                </div>
              </div>
              <h2 className="products__title_slider">Вам может понравиться</h2>
              <div className="products__slider__container">
                <ProductsSlider data={products} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;