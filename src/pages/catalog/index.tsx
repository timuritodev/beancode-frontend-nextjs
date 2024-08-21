import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/typeHooks";
import { getProductsApi } from "@/services/redux/slices/product/product";
import { ProductList } from "@/components/Product/ProductList";
import { IProduct } from "@/types/Product.types";
import {
  getCartApi,
  getSessionCartApi,
} from "@/services/redux/slices/cart/cart";
import { selectUser } from "@/services/redux/slices/user/user";
import styles from "./style.module.scss"; // Импорт стилей

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const products = useAppSelector((state) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getProductsApi());
    if (user.token) {
      dispatch(getCartApi(user.id));
    } else {
      dispatch(getSessionCartApi());
    }
  }, [dispatch, user.id, user.token]);

  useEffect(() => {
    const sortedProducts = [...products];

    switch (sortOption) {
      case "name":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "maxPrice":
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;
      case "minPrice":
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case "acidity":
        sortedProducts.sort((a, b) => a.acidity - b.acidity);
        break;
      case "density":
        sortedProducts.sort((a, b) => a.density - b.density);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [products, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filterProductsByCountry = (country: string) => {
    return filteredProducts.filter((product) =>
      product.country.includes(country)
    );
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <h1 className={styles.catalog__title}>Интернет-магазин</h1>
        <form className={styles.catalog__form}>
          <select
            id="sortDropdown"
            className={styles.catalog__dropdown}
            name="sortOption"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Выберите опцию сортировки</option>
            <option value="name">Названию (в алфавитном порядке)</option>
            <option value="maxPrice">Макс. Цене (по убыванию)</option>
            <option value="minPrice">Мин. Цене (по возрастанию)</option>
            <option value="acidity">Кислотности</option>
            <option value="density">Плотности</option>
          </select>
        </form>
        <h1 className={styles.catalog__subtitle}>Кофе для эспрессо</h1>
        <h2 className={styles.catalog__description}>Бразилия</h2>
        <ProductList data={filterProductsByCountry("Бразилия")} />
        <h2 className={styles.catalog__description}>Америка</h2>
        <ProductList data={filterProductsByCountry("Америка")} />
        <h2 className={styles.catalog__description}>Африка</h2>
        <ProductList data={filterProductsByCountry("Африка")} />
        <h2 className={styles.catalog__description}>Наборы</h2>
        <ProductList data={filterProductsByCountry("Набор")} />
      </div>
    </section>
  );
};

export default CatalogPage;
