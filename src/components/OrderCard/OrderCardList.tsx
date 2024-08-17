import "./OrderCard.css";
import { FC } from "react";
import { IOrderCardProps } from "../../types/Order.types";
import { OrderCard } from "./OrderCard";
import { ICart } from "../../types/Cart.types";

export const OrderCardList: FC<IOrderCardProps> = ({ data }) => {
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
      (item) => String(item.id) === id && item.price === (price)
    );
    return {
      ...product,
      count: productCounts[key],
    };
  });

  return (
    <div className="order-cardlist">
      {uniqueData.length !== 0 &&
        uniqueData.map((item) => (
          <OrderCard key={item.id} data={item as ICart} count={item.count} />
        ))}
    </div>
  );
};


// export const OrderCardList: FC<IOrderCardProps> = ({ data }) => {
//   return (
//     <div className="order-cardlist">
//       {data.length !== 0 &&
//         data.map((item) => <OrderCard key={item.id} data={item} />)}
//     </div>
//   );
// };
