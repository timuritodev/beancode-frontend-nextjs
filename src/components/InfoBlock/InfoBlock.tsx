import styles from "./style.module.scss"; // Импортируйте CSS Module
import info_block from "../../images/info_block.jpeg";
import { useResize } from "../../hooks/useResize";
import Image from "next/image";

const InfoBlock = () => {
  const { width } = useResize();

  return (
    <div className={styles.info}>
      <div className={styles.info__container}>
        {width <= 767 ? (
          <>
            <div className={styles.info__text__container}>
              <div className={styles.info__digit_title__container}>
                <p className={styles.info__digit}>01</p>
                <h2 className={styles.info__title}>
                  Поставки зеленого кофе и входной контроль
                </h2>
              </div>
              <p className={styles.info__text}>
                Мы соблюдаем при входном контроле Российские и международные
                стандарты
              </p>
              <Image
                className={styles.info__img}
                alt="Изображение кофейных зерен"
                src={info_block} // TODO
              />
            </div>
          </>
        ) : (
          <>
            <p className={styles.info__digit}>01</p>
            <Image
              className={styles.info__img}
              src={info_block}
              alt="Изображение кофейных зерен"
            />
            <div className={styles.info__text__container}>
              <h2 className={styles.info__title}>
                Поставки зеленого кофе и входной контроль
              </h2>
              <p className={styles.info__text}>
                Мы соблюдаем при входном контроле Российские и международные
                стандарты
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoBlock;
