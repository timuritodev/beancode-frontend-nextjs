import "./ReadyBlock.css";
import package_photo from "../../images/package.jpg";
import ready_block from "../../images/ready_block.jpeg";
import { Link } from "react-router-dom";
import { useResize } from "../../hooks/useResize";

const ReadyBlock = () => {
  const { width } = useResize();

  return (
    <div className="ready">
      <div className="ready__container">
        {width <= 767 ? (
          <>
            <div className="ready__text__container">
              <div className="ready__digit-title__container">
                <p className="ready__digit">04</p>
                <h2 className="ready__title">Готовая продукция</h2>
              </div>
              <p className="ready__text_special">
                Производим кофе согласно ГОСТ
              </p>
              <p className="ready__text">
                Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
                позволяет нашим потребителям дольше сохранить вкус зерна.
              </p>
              <Link
                to="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
                className="ready__link"
              >
                Документация
              </Link>
              <img className="ready__img" src={ready_block} alt="image of beans"/>
            </div>
          </>
        ) : (
          <>
            <p className="ready__digit">04</p>
            <img className="ready__img" src={ready_block} alt="image of beans"/>
            <div className="ready__text__container">
              <h2 className="ready__title">Готовая продукция</h2>
              <p className="ready__text_special">
                Производим кофе согласно ГОСТ
              </p>
              <p className="ready__text">
                Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
                позволяет нашим потребителям дольше сохранить вкус зерна.
              </p>
              <Link
                to="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
                className="ready__link"
              >
                Документация
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadyBlock;
