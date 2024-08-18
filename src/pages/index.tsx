import IntroBlock from "@/components/IntroBlock/IntroBlock";
// import "./MainPage.css";
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
    <section className={styles.main}>
      <div className={styles.main__container}>
        <IntroBlock />
        <TextBlock />
        <InfoBlock />
        <RoastBlock />
        <PackageBlock />
        <ReadyBlock />
        <TreatmentBlock />
      </div>
    </section>
  );
};

export default MainPage;
