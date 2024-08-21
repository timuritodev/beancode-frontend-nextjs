import { IProductsProp } from "../../types/Product.types";
import { Product } from "./Product";
import { FC } from "react";
import styles from "./style.module.scss"; // Import CSS Module

export const ProductList: FC<IProductsProp> = ({ data }) => {
  return (
    <div className={styles.productlist}>
      {data.length !== 0 &&
        data.map((item) => <Product key={item.id} data={item} />)}
    </div>
  );
};
