import styles from "./style.module.scss";
import coffee_machine from "../../images/coffe_machine.jpg";
import roast_photo from "../../images/roast_block.jpeg";

const RoastBlock = () => {

  return (
    <div className={styles.roast__block}>
      <img className={styles.roast__img} src={roast_photo} alt="roast machine" />
      {/* TODO */}
      <div className={styles.roast__overlay}></div>
      <div className={styles.roast__block__container}>
        <div className={styles.roast__container}>
          <div className={styles.roast__digit_title__container}>
            <p className={styles.roast__digit}>02</p>
            <h2 className={styles.roast__title}>
              Процесс обжарки
              <br /> и сортировки
            </h2>
          </div>
          <p className={styles.roast__text}>
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

