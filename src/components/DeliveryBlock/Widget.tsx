/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useResize } from "../../hooks/useResize";
import "./DeliveryBlock.css";

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

  const { width } = useResize();
  
  const widthValue = width > 1279 ? 756 : width;
  const heightValue = width > 1279 ? 600 : 400;

  // const createOrder = async (address: OfficeAddress) => {
  //   try {
  //     const response = await fetch('https://api.cdek.ru/v2/orders', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer YOUR_CDEK_API_TOKEN' // Обязательное поле: токен авторизации
  //       },
  //       body: JSON.stringify({
  //         "number": "123456", // Обязательное поле: уникальный номер заказа
  //         "recipientName": "Иванов Иван Иванович", // Обязательное поле: имя получателя
  //         "recipientPhone": "+79123456789", // Обязательное поле: телефон получателя
  //         "recipientEmail": "ivanov@example.com", // Необязательное поле: email получателя
  //         "comment": "Тестовый заказ", // Необязательное поле: комментарий к заказу
  //         // "tariffId": address.tariff.tariff_code, // Обязательное поле: код тарифа доставки
  //         "items": [ // Обязательное поле: массив товаров в заказе
  //           {
  //             "name": "Товар 1", // Обязательное поле: название товара
  //             "weight": 1.5, // Обязательное поле: вес товара в кг
  //             "quantity": 2, // Обязательное поле: количество товара
  //             "price": 1000, // Обязательное поле: цена товара за единицу
  //             "payment": 2000 // Обязательное поле: сумма оплаты за товар
  //           }
  //         ],
  //         "sender": {
  //           "address": "Адрес отправителя", // Необязательное поле: адрес отправителя
  //           "cityId": 44, // Необязательное поле: код города отправителя
  //           "name": "Иванов Петр Петрович", // Необязательное поле: имя отправителя
  //           "phone": "+79012345678" // Необязательное поле: телефон отправителя
  //         },
  //         "recipient": {
  //           "address": address.address, // Обязательное поле: адрес получателя (из ПВЗ)
  //           "cityId": address.city_code, // Обязательное поле: код города получателя
  //           "name": "Иванов Иван Иванович", // Обязательное поле: имя получателя
  //           "phone": "+79123456789" // Обязательное поле: телефон получателя
  //         }
  //       })
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Заказ успешно создан:', data);
  //     } else {
  //       console.error('Ошибка при создании заказа:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при отправке запроса:', error);
  //   }
  // };

  useEffect(() => {
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
    if (scriptLoaded) {
      initWidget();
    }
  }, [scriptLoaded]);
  
  type DeliveryMode = 'office';

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
          console.log('Выбранный тариф:', tariff);
          console.log('Адрес:', address);
          localStorage.setItem("Данные доставки", tariff.delivery_mode.toString());
        }
      });
    }
  };

  return (
    <div>
      <Helmet>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@cdek-it/widget@3"
        ></script>
      </Helmet>
      <div id="cdek-map" style={{ width: widthValue, height: heightValue }}></div>
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
