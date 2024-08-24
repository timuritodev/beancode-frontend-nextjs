import styles from "./style.module.scss"; // Импортируйте CSS Module

const TextBlock = () => {
  return (
    <div className={styles.text__block}>
      <h2 className={styles.text__title}>
        СТАБИЛЬНЫЙ ВКУС В КАЖДОЙ ЧАШКЕ
      </h2>
      <p className={styles.text__text}>
        ВЫСТРОЕННЫЕ ПРОЦЕССЫ В КОМПАНИИ ПОЗВОЛЯЮТ ДОСТИЧЬ ПОВТОРЯЕМЫХ
        РЕЗУЛЬТАТОВ
      </p>
    </div>
  );
};

export default TextBlock;
