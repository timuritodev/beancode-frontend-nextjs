import { FC } from "react";
import styles from "./style.module.scss";

interface ProductCardListProps {
  acidity: number;
  density: number;
}

export const Grains: FC<ProductCardListProps> = ({ acidity, density }) => {
  return (
    <div className={styles.grains__wrapper}>
      <div className={styles.grains__container}>
        <div className={styles.grains__row}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.grains__grain} ${index < acidity ? styles.grains__grain_filled : styles.grains__grain_empty}`}
            ></span>
          ))}
        </div>
        <p className={styles.grains__info}>Кислотность</p>
      </div>
      <div className={styles.grains__container}>
        <div className={styles.grains__row}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.grains__grain} ${index < density ? styles.grains__grain_filled : styles.grains__grain_empty}`}
            ></span>
          ))}
        </div>
        <p className={styles.grains__info}>Плотность</p>
      </div>
    </div>
  );
};
