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
import Head from "next/head";
import { getProducts } from "@/services/redux/slices/product/productAPI";
import { GetServerSideProps } from "next";

interface CatalogProps {
  products: IProduct[];
}

export const getServerSideProps: GetServerSideProps<CatalogProps> = async () => {
  try {
    const products: IProduct[] = await getProducts();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Ошибка при загрузке продуктов в getServerSideProps:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

const CatalogPage: React.FC<CatalogProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
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
    <>
      <Head>
        <title>Интернет-магазин кофе - Beancode</title>
        <meta
          name="description"
          content="Купите кофе в зернах в интернет-магазине Beancode с доставкой по Набережным Челнам. Широкий ассортимент кофе для эспрессо из Бразилии, Америки, Африки и специальных наборов."
        />
        <meta
          name="keywords"
          content="интернет-магазин кофе, кофе в зернах, кофе купить челны, кофе для эспрессо, бразильский кофе, африканский кофе, американский кофе, наборы кофе"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/catalog" />
        <meta
          property="og:title"
          content="Интернет-магазин кофе - Beancode | Кофе в зернах"
        />
        <meta
          property="og:description"
          content="Откройте для себя интернет-магазин кофе Beancode! В нашем каталоге широкий выбор кофе для эспрессо из Бразилии, Америки, Африки и уникальных наборов."
        />
        <meta
          property="og:image"
          content="https://beancode.ru/api/images/open_graph.jpeg"
        />
      </Head>
      <div className={styles.catalog}>
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
          <h2 className={styles.catalog__description}>Новинки</h2>
          <ProductList data={filterProductsByCountry("Новинка")} />
          <h2 className={styles.catalog__description}>Бразилия</h2>
          <ProductList data={filterProductsByCountry("Бразилия")} />
          <h2 className={styles.catalog__description}>Америка</h2>
          <ProductList data={filterProductsByCountry("Америка")} />
          <h2 className={styles.catalog__description}>Африка</h2>
          <ProductList data={filterProductsByCountry("Африка")} />
          <h2 className={styles.catalog__description}>Наборы</h2>
          <ProductList data={filterProductsByCountry("Набор")} />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
