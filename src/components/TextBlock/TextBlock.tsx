import styles from "./style.module.scss"; // Импортируйте CSS Module

const TextBlock = () => {
  return (
    <div className={styles.textBlock}>
      <h2 className={styles.textTitle}>
        СТАБИЛЬНЫЙ ВКУС В КАЖДОЙ ЧАШКЕ
      </h2>
      <p className={styles.textText}>
        ВЫСТРОЕННЫЕ ПРОЦЕССЫ В КОМПАНИИ ПОЗВОЛЯЮТ ДОСТИЧЬ ПОВТОРЯЕМЫХ
        РЕЗУЛЬТАТОВ
      </p>
    </div>
  );
};

export default TextBlock;
