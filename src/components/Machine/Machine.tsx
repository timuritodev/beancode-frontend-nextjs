import { useEffect, useState } from "react";
import { IProduct } from "../../types/Product.types";
import styles from "./style.module.scss"; // Import CSS Module
import { useRouter } from "next/router"; // Use useRouter from next/router
import { getProductbyidApi } from "../../services/redux/slices/productbyid/productbyid";
import { useAppDispatch } from "../../services/typeHooks";
import { MinusPlusButtons } from "../MinusPlusButtons/MinusPlusButtons";
import { API_BASE_URL } from "../../utils/constants";
import { Grains } from "../Grains/Grains";
import Image from "next/image";
import { IMachine } from "@/types/Machine.types";
import { PopupForm } from "../Popups/PopupForm";

export const Machine = ({ data }: { data: IMachine }) => {
  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const handleClickImage = () => {
    // router.push("/product"); 
    // dispatch(getProductbyidApi(data.id));
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

  useEffect(() => {
    setIsPopupOpened(false);
  }, []);

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Image
          className={styles.product__image}
          src={imageUrl}
          alt={`Изображение товара ${data.title}`}
          onClick={handleClickImage}
          width={348} height={348}
        />
        <h2 className={styles.product__title}>{data.title}</h2>
        <p className={styles.product__description}>{data.description}</p>
        <button
          type="submit"
          className={styles.product__button}
          onClick={() => {setIsPopupOpened(true)}}
        >
          Заказать
        </button>
      </div>
      <PopupForm
        isOpened={isPopupOpened}
        setIsOpened={setIsPopupOpened}
      />
    </div>
  );
};
