import "./InfoBlock.css";
import info_block from "../../images/info_block.jpeg";
import { useResize } from "../../hooks/useResize";

const InfoBlock = () => {
  const { width } = useResize();

  return (
    <div className="info">
      <div className="info__container">
        {width <= 767 ? (
          <>
            <div className="info__text__container">
              <div className="info__digit-title__container">
                <p className="info__digit">01</p>
                <h2 className="info__title">
                  Поставки зеленого кофе и входной контроль
                </h2>
              </div>
              <p className="info__text">
                Мы соблюдаем при входном контроле Российские и международные
                стандарты
              </p>
              <img className="info__img" src={info_block} alt="image of coffee beans"/>
            </div>
          </>
        ) : (
          <>
            <p className="info__digit">01</p>
            <img className="info__img" src={info_block} alt="image of coffee beans"/>
            <div className="info__text__container">
              <h2 className="info__title">
                Поставки зеленого кофе и входной контроль
              </h2>
              <p className="info__text">
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
//   return (
//     <div className="info__block">
//       <div className="info__block__container">
//         {width <= 767 ? (
//           <>
//             <div className="info__container">
//               <div className="info__title-digit__container">
//                 <p className="info__digit">01</p>
//                 <h2 className="info__container__title">
//                   Поставки зеленого кофе и входной контроль
//                 </h2>
//               </div>
//               <p className="info__container__text">
//                 Мы соблюдаем при входном контроле Российские и международные
//                 стандарты
//               </p>
//             </div>
//             <img className="info__image" src={info_block} />
//           </>
//         ) : (
//           <>
//             <div className="info__container">
//               <div className="info__title-digit__container">
//                 <p className="info__digit">01</p>
//                 <img className="info__image" src={info_block} />
//                 <h2 className="info__container__title">
//                   Поставки зеленого кофе и входной контроль
//                 </h2>
//               </div>
//               <p className="info__container__text">
//                 Мы соблюдаем при входном контроле Российские и международные
//                 стандарты
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

export default InfoBlock;

// return (
//   <div className="info">
//     <div className="info__container">
//       {width <= 767 ? (
//         <>
//           <div className="info__text__container">
//             <div className="info__digit-title__container">
//               <p className="info__digit">04</p>
//               <h2 className="info__title">Готовая продукция</h2>
//             </div>
//             <p className="info__text_special">
//               Производим кофе согласно ГОСТ
//             </p>
//             <p className="info__text">
//               Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
//               позволяет нашим потребителям дольше сохранить вкус зерна.
//             </p>
//             <Link
//               to="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
//               className="info__link"
//             >
//               Документация
//             </Link>
//             <img className="info__img" src={info_block} />
//           </div>
//         </>
//       ) : (
//         <>
//           <p className="info__digit">04</p>
//           <img className="info__img" src={info_block} />
//           <div className="info__text__container">
//             <h2 className="info__title">Готовая продукция</h2>
//             <p className="info__text_special">
//               Производим кофе согласно ГОСТ
//             </p>
//             <p className="info__text">
//               Упаковка в пакеты с газоотводящим клапаном и Zip-lock замком
//               позволяет нашим потребителям дольше сохранить вкус зерна.
//             </p>
//             <Link
//               to="https://disk.yandex.ru/i/2mZekmtWRv35KQ"
//               className="info__link"
//             >
//               Документация
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   </div>
// );
// };
