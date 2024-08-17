import "./Product.css";
import { IProductsProp } from "../../types/Product.types";
import { Product } from "./Product";
import { FC } from "react";

export const ProductList: FC<IProductsProp> = ({ data }) => {
  return (
    <div className="productlist">
      {data.length !== 0 &&
        data.map((item) => <Product key={item.id} data={item} />)}
    </div>
  );
};
