import "./MainPage.css";
import PackageBlock from "../../components/PackageBlock/PackageBlock";
import ReadyBlock from "../../components/ReadyBlock/ReadyBlock";
import TreatmentBlock from "../../components/TreatmentBlock/TreatmentBlock";
import RoastBlock from "../../components/RoastBlock/RoastBlock";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import TextBlock from "../../components/TextBlock/TextBlock";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import { useAppDispatch, useAppSelector } from "../../services/typeHooks";
import { selectUser } from "../../services/redux/slices/user/user";
import { useEffect } from "react";
import { getCartApi, getSessionCartApi } from "../../services/redux/slices/cart/cart";
import { getOrdersApi } from "../../services/redux/slices/order/order";

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
    <section className="main">
      <div className="main__container">
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
