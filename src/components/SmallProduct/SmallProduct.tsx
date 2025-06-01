import { IProduct } from "../../types/Product.types";
import styles from "./style.module.scss";
import { API_BASE_URL } from "../../utils/constants";
import { useRouter } from "next/router";
import Image from "next/image";

export const SmallProduct = ({ data }: { data: IProduct }) => {
  const router = useRouter();

  const handleClickImage = () => {
    router.push(`/product/${data.id}`);
  };

  const imageUrl = API_BASE_URL + data.v_picture;

  return (
    <div className={styles.smallproduct}>
      <div className={styles.smallproduct__container}>
        <Image
          className={styles.smallproduct__image}
          src={imageUrl}
          alt={`Изображение товара ${data.title}`}
          onClick={handleClickImage}
          width={280} height={280}
        />
        <h2 className={styles.smallproduct__title}>{data.title}</h2>
        <p className={styles.smallproduct__description}>{data.description}</p>
      </div>
    </div>
  );
};

