import { useState } from "react";
import { IProduct } from "../../types/Product.types";
import styles from "./style.module.scss"; // Import CSS Module
import { useRouter } from "next/router"; // Use useRouter from next/router
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { useAppDispatch } from "../../services/typeHooks";
import { MinusPlusButtons } from "../MinusPlusButtons/MinusPlusButtons";
import { API_BASE_URL } from "../../utils/constants";
import { Grains } from "../Grains/Grains";

export const Product = ({ data }: { data: IProduct }) => {
  const dispatch = useAppDispatch();
  const router = useRouter(); // Initialize router

  const [selectedPrice, setSelectedPrice] = useState(data.low_price);
  const [selectedWeight, setSelectedWeight] = useState(data.low_weight);

  const handleClickImage = () => {
    router.push("/product-page"); // Use router.push for navigation
    dispatch(getProductbyidApi(data.id));
  };

  const handleChange = (price: string, weight: string) => {
    setSelectedPrice(price);
    setSelectedWeight(weight);
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <img
          className={styles.product__image}
          src={imageUrl}
          alt={data.title}
          onClick={handleClickImage}
        />
        <h2 className={styles.product__title}>{data.title}</h2>
        <p className={styles.product__description}>{data.description}</p>
        <div className={styles.grains__wrapper}>
          {data.density !== 0 && (
            <Grains acidity={data.acidity} density={data.density} />
          )}
        </div>
        <div className={styles.product__wrapper}>
          <div className={styles.product__price__wrapper}>
            <div
              className={`${styles.product__price__container} ${selectedPrice === data.low_price ? styles.selected : styles.notSelected
                }`}
              onClick={() => handleChange(data.low_price, data.low_weight)}
            >
              <p className={styles.product__price}>{data.low_price} ₽/</p>
              <p className={styles.product__weight}> {data.low_weight}</p>
            </div>
            {data.price !== "0" && (
              <div
                className={`${styles.product__price__container} ${selectedPrice === data.price ? styles.selected : styles.notSelected
                  }`}
                onClick={() => handleChange(data.price, data.weight)}
              >
                <p className={styles.product__price}>{data.price} ₽/</p>
                <p className={styles.product__weight}> {data.weight}</p>
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
