import { FC } from "react";
import styles from "./style.module.scss";

interface ProductCardListProps {
  acidity: number;
  density: number;
}

export const Grains: FC<ProductCardListProps> = ({ acidity, density }) => {
  return (
    <div className={styles.products__wrapper}>
      <div className={styles.grains__container}>
        <div className={styles.products__grains}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.grain} ${index < acidity ? styles.filled : styles.empty}`}
            ></span>
          ))}
        </div>
        <p className={styles.products__info}>Кислотность</p>
      </div>
      <div className={styles.grains__container}>
        <div className={styles.products__grains}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.grain} ${index < density ? styles.filled : styles.empty}`}
            ></span>
          ))}
        </div>
        <p className={styles.products__info}>Плотность</p>
      </div>
    </div>
  );
};

