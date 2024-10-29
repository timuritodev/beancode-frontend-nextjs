import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/typeHooks";
import { IProduct } from "@/types/Product.types";
import { selectUser } from "@/services/redux/slices/user/user";
import styles from "./style.module.scss"; // Импорт стилей
import Head from "next/head";
import { getMachinesApi } from "@/services/redux/slices/machine/machine";
import { MachineList } from "@/components/Machine/MachineList";
import { IMachine } from "@/types/Machine.types";

export const MachineCatalogPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const machines = useAppSelector((state) => state.machine.products);
  const [filteredProducts, setFilteredProducts] = useState<IMachine[]>([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    dispatch(getMachinesApi());
  }, [dispatch]);

  useEffect(() => {
    const sortedProducts = [...machines];

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
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [machines, sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.catalog__container}>
          <h1 className={styles.catalog__title}>Каталог Кофе Машин</h1>
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
          <MachineList data={machines} />
        </div>
      </div>
    </>
  );
};

export default MachineCatalogPage;
