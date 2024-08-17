import "./RoastBlock.css";
import coffee_machine from "../../images/coffe_machine.jpg";
import roast_photo from "../../images/roast_block.jpeg";
import { Link } from "react-router-dom";
import { useResize } from "../../hooks/useResize";

const RoastBlock = () => {
  const { width } = useResize();

  return (
    <div className="roast__block">
      <img className="roast__img" src={roast_photo} alt="roast machine" />
      <div className="roast__overlay"></div>
      <div className="roast__block__container">
        <div className="roast__container">
          <div className="roast__digit-title__container">
            <p className="roast__digit">02</p>
            <h2 className="roast__title">
              Процесс обжарки
              <br /> и сортировки
            </h2>
          </div>
          <p className="roast__text">
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
