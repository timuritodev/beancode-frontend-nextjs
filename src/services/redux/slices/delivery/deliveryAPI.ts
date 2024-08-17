/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../../../utils/constants";
import {
  IAuthDelivery,
  OrderRegistrationRequest,
} from "../../../../types/Deliver.types";

const checkRes = (res: any) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

// export const fetchData = (
//   url: string,
//   method: string,
//   data?: OrderRegistrationRequest,
//   token?: string
// ) => {
//   return fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(!!token && { Authorization: `Bearer ${token}` }),
//     },
//     // credentials: "include",
//     ...(!!data && { body: JSON.stringify(data) }),
//   }).then((res) => checkRes(res));
// };

export const fetchData = (
  url: string,
  method: string,
  data?: OrderRegistrationRequest,
  token?: string
) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => checkRes(res));
};

const objectToFormData = (obj: Record<string, any>) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

export const fetchAuthDelivery = (data: IAuthDelivery): Promise<any> => {
  const formData = objectToFormData(data);
  return fetch(`${API_BASE_URL}/api-auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  }).then((res) => checkRes(res).json());
};

// export const fetchDeliver2 = (
//   data: OrderRegistrationRequest,
//   token: string | { token: string }
// ): Promise<Response> => {
//   const tokenString = typeof token === "string" ? token : token.token;
//   return fetchData(
//     `${API_BASE_URL}/api-deliver`,
//     "POST",
//     data,
//     tokenString
//   ).then((res) => checkRes(res));
// };

export const fetchDeliver2 = (
  data: OrderRegistrationRequest,
  token: string
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/api-delivery`, "POST", data, token).then(
    (res) => checkRes(res)
  );
};

// export const fetchEditUserInfo = (
// 	data: IEditProfileData,
// 	token: string
// ): Promise<Response> => {
// 	return fetchData(API_USERS_ME_URL, 'PUT', data, token).then((res) =>
// 		checkRes(res)
// 	);
// };


// const handleClickDeliverRequest = async () => {
//   const token = deliver.token;
//   const url = "http://localhost:3001/api/api-delivery";
//   // const url = "https://api.edu.cdek.ru/v2/orders";

//   const data = {
//     number: "ddOererre7450813980068",
//     comment: "Новый заказ",
//     delivery_recipient_cost: {
//       value: 50,
//     },
//     delivery_recipient_cost_adv: [
//       {
//         sum: 3000,
//         threshold: 200,
//       },
//     ],
//     shipment_point: "NCHL46",
//     delivery_point: "KZN34",
//     packages: [
//       {
//         number: "bar-001",
//         comment: "Упаковка",
//         height: 10,
//         items: [
//           {
//             ware_key: "00055",
//             payment: {
//               value: 3000,
//             },
//             name: "Товар",
//             cost: 300,
//             amount: 2,
//             weight: 700,
//             url: "www.item.ru",
//           },
//         ],
//         length: 10,
//         weight: 4000,
//         width: 10,
//       },
//     ],
//     recipient: {
//       name: "Иванов Иван",
//       phones: [
//         {
//           number: "+79134637228",
//         },
//       ],
//     },
//     sender: {
//       name: "Петров Петр",
//     },
//     services: [
//       {
//         code: "SECURE_PACKAGE_A2",
//       },
//     ],
//     tariff_code: 139,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         Accept: "*/*",
//         // "User-Agent":
//         //   "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
//         // "Accept-Encoding": "gzip, deflate, br",
//         // Connection: "keep-alive",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("Success:", responseData);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };