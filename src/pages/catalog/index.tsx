import "./CatalogPage.css";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { getProductsApi } from "../../services/redux/slices/product/product";
import { ProductList } from "../../components/Product/ProductList";
import { IProduct } from "../../types/Product.types";
import {
  getCartApi,
  getSessionCartApi,
} from "../../services/redux/slices/cart/cart";
import { selectUser } from "../../services/redux/slices/user/user";
// import { PopupWeight } from "../../components/Popups/PopupWeight";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const products = useAppSelector((state) => state.products.products);
  // const cartproducts = useAppSelector((state) => state.cart.cart);

  // const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
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

  // const totalWeight = cartproducts
  //   .map((item) => {
  //     const weight = item.weight.replace(" гр", "").trim();
  //     return parseFloat(weight);
  //   })
  //   .reduce((total, weight) => total + weight, 0);

  // useEffect(() => {
  //   if (totalWeight === 5000) {
  //     setIsPopupOpened(true);
  //   }
  // }, [totalWeight]);

  return (
    <section className="catalog">
      <div className="catalog__container">
        <h1 className="catalog__title">Интернет-магазин</h1>
        <form className="catalog__form">
          <select
            id="sortDropdown"
            className="catalog__dropdown"
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
        <h1 className="catalog__subtitle">Кофе для эспрессо</h1>
        <h2 className="catalog__description">Бразилия</h2>
        <ProductList data={filterProductsByCountry("Бразилия")} />
        <h2 className="catalog__description">Америка</h2>
        <ProductList data={filterProductsByCountry("Америка")} />
        <h2 className="catalog__description">Африка</h2>
        <ProductList data={filterProductsByCountry("Африка")} />
        <h2 className="catalog__description">Наборы</h2>
        <ProductList data={filterProductsByCountry("Набор")} />
        {/* <h1 className="">Кофе для фильтра</h1>
        <ProductList data={filterProductsByCountry("Америка")} /> */}
      </div>
      {/* <PopupWeight
        isOpened={isPopupOpened}
        setIsOpened={setIsPopupOpened}
        weight={totalWeight}
      /> */}
    </section>
  );
};
