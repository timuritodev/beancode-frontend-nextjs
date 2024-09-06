/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./style.module.scss";
import { useAppSelector } from "../../services/typeHooks";
import { ProductsSlider } from "../../components/ProductsSlider/ProductsSlider";
import { useEffect, useState } from "react";
import { MinusPlusButtons } from "../../components/MinusPlusButtons/MinusPlusButtons";
import { Grains } from "../../components/Grains/Grains";
import { useResize } from "../../hooks/useResize";
import Loader from "../../components/Loader/Loader";
import { API_BASE_URL } from "../../utils/constants";
import { ProductImagesSlider } from "../../components/ProductImagesSlider/ProductImagesSlider";
import Image from "next/image";
import { Head } from "next/document";

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
      <Head>
        <title>Оптовая форма - Beancode</title>
        <meta name="description" content="Кофе в зернах с бесплатной доставкой до двери" />
        <meta name="keywords" content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru" />
        <meta property="og:title" content="Кофе в зернах с бесплатной доставкой" />
        <meta property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна. Прямые поставки сырья из Бразилии, Колумбии, Африки, Азии. Голландская линия обжарки. Международные стандарты качества" />
        <meta property="og:image" content="https://beancode.ru/images/open_graph.jpeg" />
      </Head>
      <>
        {loading === "loading" ? (
          <Loader />
        ) : (
          <div className={styles.products}>
            {width > 767 ? (
              <div className={styles.products__container}>
                <div className={styles.products__container__wrapper}>
                  <div className={styles.products__info__container}>
                    <h2 className={styles.products__title}>{product.title}</h2>
                    <p className={styles.products__description}>
                      {product.description}
                    </p>
                    <p className={styles.product__big_description}>
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
                      className={styles.products__dropdown}
                      onChange={() => handleDropdownChange}
                    >
                      <option value="option1">В зернах</option>
                      {/* <option value="option2">Опция 2</option> */}
                      {/* <option value="option3">Опция 3</option> */}
                    </select>
                    <div className={styles.product__big_weight__container}>
                      {product.price !== "0" && (
                        <div
                          className={`${styles.products__price__container} ${selectedPrice === product.price
                              ? styles.product_selected
                              : styles.product_not_selected
                            }`}
                          onClick={() =>
                            handleChange(product.price, product.weight)
                          }
                        >
                          <p className={styles.products__big_weight}>
                            {" "}
                            {product.weight}
                          </p>
                        </div>
                      )}
                      <div
                        className={`${styles.products__price__container} ${selectedPrice === product.low_price
                            ? styles.product_selected
                            : styles.product_not_selected
                          }`}
                        onClick={() =>
                          handleChange(product.low_price, product.low_weight)
                        }
                      >
                        <p className={styles.products__big_weight}>
                          {" "}
                          {product.low_weight}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.products__info__container}>
                    <Image
                      className={styles.products__image}
                      src={imageUrl}
                      alt={product.title}
                      width={85} height={80}
                    />
                    {/* <ProductImagesSlider images={product.additional_pictures} /> */}
                    <div className={styles.products__wrapper_2}>
                      {selectedPrice === product.price ? (
                        <div className={styles.products__price__container}>
                          <p className={styles.products__price}>
                            {product.price} ₽&nbsp;
                          </p>
                          <p className={styles.products__weight}>
                            {product.weight}
                          </p>
                        </div>
                      ) : (
                        <div className={styles.products__price__container}>
                          <p className={styles.products__price}>
                            {product.low_price} ₽&nbsp;
                          </p>
                          <p className={styles.products__weight}>
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
                <h2 className={styles.products__title_slider}>
                  Вам может понравиться
                </h2>
                <div className={styles.products__slider__container}>
                  <ProductsSlider data={products} />
                </div>
              </div>
            ) : (
              <div className={styles.products__container}>
                <div className={styles.products__container__wrapper}>
                  <div className={styles.products__info__container}>
                    <h2 className={styles.products__title}>{product.title}</h2>
                    <p className={styles.products__description}>
                      {product.description}
                    </p>
                    <p className={styles.product__big_description}>
                      {product.big_description}
                    </p>
                  </div>
                  <div className={styles.products__info__container}>
                    <Image
                      className={styles.products__image}
                      src={imageUrl}
                      alt={product.title}
                      width={85} height={80}
                    />
                    {/* <ProductImagesSlider images={product.additional_pictures} /> */}
                    <div>
                      <Grains
                        acidity={product.acidity}
                        density={product.density}
                      />
                      <select
                        id="dropdown"
                        className={styles.products__dropdown}
                        onChange={() => handleDropdownChange}
                      >
                        <option value="option1">В зернах</option>
                        {/* <option value="option2">Опция 2</option> */}
                        {/* <option value="option3">Опция 3</option> */}
                      </select>
                      <div className={styles.product__big_weight__container}>
                        <div
                          className={`${styles.products__price__container} ${selectedPrice === product.price
                              ? styles.product_selected
                              : styles.product_not_selected
                            }`}
                          onClick={() =>
                            handleChange(product.price, product.weight)
                          }
                        >
                          <p className={styles.products__big_weight}>
                            {" "}
                            {product.weight}
                          </p>
                        </div>
                        <div
                          className={`${styles.products__price__container} ${selectedPrice === product.low_price
                              ? styles.product_selected
                              : styles.product_not_selected
                            }`}
                          onClick={() =>
                            handleChange(product.low_price, product.low_weight)
                          }
                        >
                          <p className={styles.products__big_weight}>
                            {" "}
                            {product.low_weight}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.products__wrapper_2}>
                      {selectedPrice === product.price ? (
                        <div className={styles.products__price__container}>
                          <p className={styles.products__price}>
                            {product.price} ₽&nbsp;
                          </p>
                          <p className={styles.products__weight}>
                            {product.weight}
                          </p>
                        </div>
                      ) : (
                        <div className={styles.products__price__container}>
                          <p className={styles.products__price}>
                            {product.low_price} ₽&nbsp;
                          </p>
                          <p className={styles.products__weight}>
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
                <h2 className={styles.products__title_slider}>
                  Вам может понравиться
                </h2>
                <div className={styles.products__slider__container}>
                  <ProductsSlider data={products} />
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </>
  );
};

export default ProductPage;

