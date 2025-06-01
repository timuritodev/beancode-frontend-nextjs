/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProductbyid, getProducts } from '@/services/redux/slices/product/productAPI';
import { IProduct } from '@/types/Product.types';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Grains } from "../../components/Grains/Grains";
import Loader from "../../components/Loader/Loader";
import { MinusPlusButtons } from "../../components/MinusPlusButtons/MinusPlusButtons";
import { ProductsSlider } from "../../components/ProductsSlider/ProductsSlider";
import { useResize } from "../../hooks/useResize";
import { API_BASE_URL } from "../../utils/constants";
import styles from "./style.module.scss";

interface ProductPageProps {
  product: IProduct;
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  try {
    const product = await getProductbyid(+id);
    const products = await getProducts();

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        product,
        products,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

const ProductPage: NextPage<ProductPageProps> = ({ product, products }) => {
  const { width } = useResize();
  const [selectedPrice, setSelectedPrice] = useState(product.low_price);
  const [selectedWeight, setSelectedWeight] = useState(product.low_weight);

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

  const imageUrl = API_BASE_URL + product?.v_picture;

  if (!product?.title) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{`Купить кофе ${product.title} - Beancode`}</title>
        <meta
          name="description"
          content={`Купить кофе ${product.title} с доставкой по всей России. Прямые поставки, высокое качество, разные степени обжарки и помола. Заказывайте сейчас!`}
        />
        <meta
          name="keywords"
          content={`купить кофе ${product.title}, кофе ${product.title}, зерновой кофе, кофе на заказ, кофе оптом`}
        />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://beancode.ru/products/${product.id}`} />
        <meta property="og:title" content={`Купить ${product.title} - Beancode`} />
        <meta
          property="og:description"
          content={`Кофе ${product.title} с насыщенным вкусом и ароматом. Прямые поставки из лучших регионов. Успейте заказать!`}
        />
        <meta property="og:image" content={`https://beancode.ru/api${product.v_picture}`} />
      </Head>

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
                  alt={`Изображение товара ${product.title}`}
                  width={513} height={489}
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
                  alt={`Изображение товара ${product.title}`}
                  width={513} height={489}
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
    </>
  );
};

export default ProductPage;