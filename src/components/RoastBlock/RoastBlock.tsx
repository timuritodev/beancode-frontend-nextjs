import styles from "./style.module.scss"; // Импортируйте CSS Module
import coffee_machine from "../../images/coffe_machine.jpg";
import roast_photo from "../../images/roast_block.jpeg";
import { useResize } from "../../hooks/useResize";

const RoastBlock = () => {
  const { width } = useResize();

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
            ростера составляетот до 15 кг. Максимально, за час работы, нам
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
