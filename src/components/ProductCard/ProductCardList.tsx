import { FC } from "react";
import { ProductCard } from "./ProductCard";
import { ICart } from "../../types/Cart.types";
import { hashString } from "../../utils/constants";

interface ProductCardListProps {
  data: ICart[];
}

export const ProductCardList: FC<ProductCardListProps> = ({ data }) => {
  const countProducts = (products: ICart[]) => {
    const productCount: Record<string, number> = {};
    products.forEach((product) => {
      const productKey = `${String(product.id)}_${product.price}`;
      productCount[productKey] = (productCount[productKey] || 0) + 1;
    });
    return productCount;
  };

  const productCounts = countProducts(data);

  const uniqueData = Array.from(
    new Set(data.map((item) => `${String(item.id)}_${item.price}`))
  ).map((key) => {
    const [id, price] = key.split("_");
    const product = data.find(
      (item) => String(item.id) === id && item.price === price
    );
    return {
      ...product,
      count: productCounts[key],
    };
  });

  return (
    <div className="product-card-list">
      {uniqueData.length !== 0 &&
        uniqueData.map((item) => (
          <ProductCard
            key={`${item.title ? hashString(item.title) : ""}`}
            data={item as ICart}
            count={item.count}
          />
        ))}
    </div>
  );
};
