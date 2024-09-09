import Head from 'next/head';
import IntroBlock from "@/components/IntroBlock/IntroBlock";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import PackageBlock from "@/components/PackageBlock/PackageBlock";
import ReadyBlock from "@/components/ReadyBlock/ReadyBlock";
import RoastBlock from "@/components/RoastBlock/RoastBlock";
import TextBlock from "@/components/TextBlock/TextBlock";
import TreatmentBlock from "@/components/TreatmentBlock/TreatmentBlock";
import { getCartApi, getSessionCartApi } from "@/services/redux/slices/cart/cart";
import { getOrdersApi } from "@/services/redux/slices/order/order";
import { selectUser } from "@/services/redux/slices/user/user";
import { useAppDispatch, useAppSelector } from "@/services/typeHooks";
import { useEffect } from "react";
import styles from "./index.module.scss";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.token) {
      dispatch(getCartApi(user.id));
      dispatch(getOrdersApi(user.id));
    } else {
      dispatch(getSessionCartApi());
    }
  }, [dispatch, user.id, user.token]);

  return (
    <>
      <Head>
        <title>Кофе в зернах - Beancode</title>
        <meta name="description" content="Кофе в зернах с бесплатной доставкой до двери" />
        <meta name="keywords" content="кофе челны, кофе купить набережные челны, кофе купить челны, кофе в зернах, кофе на заказ, кофе доставка, кофе в Набережных Челнах" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beancode.ru" />
        <meta property="og:title" content="Кофе в зернах с бесплатной доставкой" />
        <meta property="og:description"
          content="В Набережных Челнах открылось производство кофейного зерна. Прямые поставки сырья из Бразилии, Колумбии, Африки, Азии. Голландская линия обжарки. Международные стандарты качества" />
        <meta property="og:image" content="https://bean-code.ru/images/open_graph.jpeg" />
      </Head>
      <div className={styles.main}>
        <div className={styles.main__container}>
          <IntroBlock />
          <TextBlock />
          <InfoBlock />
          <RoastBlock />
          <PackageBlock />
          <ReadyBlock />
          <TreatmentBlock />
        </div>
      </div>
    </>
  );
};

export default MainPage;
