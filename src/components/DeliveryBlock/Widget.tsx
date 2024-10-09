/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useResize } from "../../hooks/useResize";
import styles from './Widget.module.scss';

interface Tariff {
  tariff_code: number;
  tariff_name: string;
  tariff_description: string;
  delivery_mode: number;
  period_min: number;
  period_max: number;
  delivery_sum: number;
}

interface OfficeAddress {
  city_code: number;
  city: string;
  type: string;
  postal_code: string;
  country_code: string;
  have_cashless: boolean;
  have_cash: boolean;
  allowed_cod: boolean;
  is_dressing_room: boolean;
  code: string;
  name: string;
  address: string;
  work_time: string;
  location: number[];
}

export const Widget = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Стейт для модального окна

  const { width } = useResize();

  const widthValue = width > 1279 ? 756 : width;
  const heightValue = width > 1279 ? 600 : 400;

  useEffect(() => {
    // Загружаем скрипт виджета CDEK
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && isModalOpen) {
      initWidget();
    }
  }, [scriptLoaded, isModalOpen]);

  type DeliveryMode = "office";

  const initWidget = () => {
    if (window.CDEKWidget) {
      new window.CDEKWidget({
        from: "Москва",
        root: "cdek-map",
        apiKey: "c71385a4-e8d4-4e71-8c0d-f0d16956e3ba",
        servicePath: "https://beancode.ru/service.php",
        defaultLocation: "Москва",
        hideDeliveryOptions: {
          office: false,
          door: true,
        },
        onChoose: (deliveryMode: DeliveryMode, tariff: Tariff, address: OfficeAddress) => {
          console.log(`Выбранный режим доставки: ${deliveryMode}`);
          console.log('Адрес:', address);
          localStorage.setItem("Данные доставки", address.code);
        }
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        ></script>
      </Helmet>

      {/* Кнопка для открытия модального окна */}
      <button onClick={openModal}>Выбрать пункт выдачи</button>

      {/* Модальное окно с виджетом */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <div id="cdek-map" style={{ width: widthValue, height: heightValue }}></div>
          </div>
        </div>

      )}
    </div>
  );
};

// import React, { useEffect } from "react";
// import { Helmet } from "react-helmet";

// export const Widget = () => {
//   const initWidget = () => {
//     if (window.CDEKWidget) {
//       new window.CDEKWidget({
//         from: "Новосибирск",
//         root: "cdek-map",
//         apiKey: "c71385a4-e8d4-4e71-8c0d-f0d16956e3ba",
//         servicePath: "https://beancode.ru/service.php",
//         defaultLocation: "Новосибирск",
//       });
//     }
//   };

//   useEffect(() => {
//     initWidget(); // Вызываем инициализацию виджета при первом отображении компонента
//   }, []);

//   return (
//     <div>
//       <Helmet>
//         <script
//           type="text/javascript"
//           src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
//         ></script>
//       </Helmet>
//       <div id="cdek-map" style={{ width: "800px", height: "600px" }}></div>
//     </div>
//   );
// };
