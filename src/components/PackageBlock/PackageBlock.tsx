import styles from "./style.module.scss"; // Import CSS Module
import roast_photo from "../../images/roast_block.jpeg"; // Image for roast block
import { useResize } from "../../hooks/useResize"; // Custom hook for responsive design

const RoastBlock = () => {
  const { width } = useResize(); // Get the current window width

  // Render different content based on the screen width
  return (
    <div className={styles.roastBlock}>
      <img className={styles.roastImg} src={roast_photo} alt="roast machine" />
      <div className={styles.roastOverlay}></div>
      <div className={styles.roastBlockContainer}>
        <div className={styles.roastContainer}>
          <div className={styles.roastDigitTitleContainer}>
            <p className={styles.roastDigit}>02</p>
            <h2 className={styles.roastTitle}>
              Процесс обжарки
              <br /> и сортировки
            </h2>
          </div>
          <p className={styles.roastText}>
            Мы обжариваем наши зёрна на ростере Giesen. Это оборудование,
            которое отличается стабильностью результата, позволяя получать
            неизменный вкус кофе. Единовременная загрузка зеленого зёрна у этого
            ростера составляет от до 15 кг. Максимально, за час работы, нам
            удаётся обжарить 60 кг кофе. Мы сортируем кофе от камней в
            специальных машинах - дистоунерах Giesen, надежно защищая кофемолки
            наших потребителей.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoastBlock;
