import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services/typeHooks";
import styles from "./style.module.scss"; // Импорт стилей
import Head from "next/head";
import { getMachinesApi } from "@/services/redux/slices/machine/machine";
import { MachineList } from "@/components/Machine/MachineList";

export const MachineCatalogPage = () => {
  const dispatch = useAppDispatch();

  const machines = useAppSelector((state) => state.machine.products);


  useEffect(() => {
    dispatch(getMachinesApi());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Кофе-машины - Каталог - Beancode</title>
        <meta name="description" content="Каталог кофемашин для дома и офиса. Выберите модель по характеристикам и получите доставку до двери." />
        <meta name="keywords" content="кофемашины, купить кофемашину, кофемашины для дома, кофемашины для офиса, каталог кофемашин" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru/machines" />
        <meta property="og:title" content="Кофемашины - Каталог - Beancode" />
        <meta property="og:description" content="Откройте для себя каталог кофемашин для дома и офиса с доставкой по Набережным Челнам и регионам." />
        <meta property="og:image" content="https://beancode.ru/api/images/open_graph.jpeg" />
      </Head>
      <div className={styles.catalog}>
        <div className={styles.catalog__container}>
          <h1 className={styles.catalog__title}>Каталог Кофемашин</h1>
          <MachineList data={machines} />
        </div>
      </div>
    </>
  );
};

export default MachineCatalogPage;
