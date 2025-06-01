import styles from "./style.module.scss";
import { FC } from "react";
import { IProduct } from "../../types/Product.types";
import { useRouter } from "next/router";
import { API_BASE_URL } from "../../utils/constants";
import Image from "next/image";

export interface SearchCardProps {
  data: IProduct;
  isClose: () => void;
  switchPopup: () => void;
}

export const SearchCard: FC<SearchCardProps> = ({ data, isClose, switchPopup }) => {

  const handleClick = () => {
    isClose();
    // switchPopup();
    window.scrollTo(0, 0);
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  const router = useRouter();

  return (
    <div
      key={data.id}
      onClick={() => {
        router.push(`/product/${data.id}`);
        handleClick();
      }}
      className={styles.search__card}
    >
      <Image className={styles.search__card_poster} src={imageUrl} alt={`Изображение товара ${data.title}`} width={85} height={80}/>
      <article className={styles.search__card_desc}>
        <p className={styles.search__card_name}>{data.title}</p>
        <div className={styles.search__card_info}>
          <p className={styles.search__card_year}>{data.low_price} ₽</p>
          <p className={styles.search__card_year}>{data.low_weight}</p>
        </div>
      </article>
    </div>
  );
};

