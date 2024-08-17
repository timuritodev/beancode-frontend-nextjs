/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../../../utils/constants";
import {
  ICart,
  ICartData,
  ISessionCartData,
} from "../../../../types/Cart.types";

const checkRes = (res: any) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

const checkRes2 = (res: any) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

export const fetchData = (
  url: string,
  method: string,
  data?: ICartData | ISessionCartData | number,
  token?: string
) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    credentials: 'include', 
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => checkRes(res));
};

export const fetchAddToCart = (data: ICartData): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/cart/add`, "POST", data).then((res) =>
    checkRes(res)
  );
};

export const fetchDeleteFromCart = (data: ICartData): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/cart/remove`, "POST", data).then((res) =>
    checkRes(res)
  );
};

export const fetchAddToSessionCart = (
  data: ISessionCartData
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/session-cart/add`, "POST", data).then(
    (res) => checkRes(res)
  );
};

export const fetchDeleteFromSessionCart = (
  data: ISessionCartData
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/session-cart/remove`, "POST", data).then(
    (res) => checkRes(res)
  );
};

export const fetchDeleteAll = (data: number): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/cart/${data}`, "DELETE").then((res) =>
    checkRes(res)
  );
};

export const fetchDeleteSessionAll = (): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/session-cart/clear/`, "DELETE").then((res) =>
    checkRes(res)
  );
};

export const fetchGetCart = (userId: number): Promise<Array<ICart>> => {
  return fetchData(`${API_BASE_URL}/cart/${userId}`, "GET").then((res) =>
    checkRes2(res)
  );
};

export const fetchGetSessionCart = (): Promise<Array<ICart>> => {
  return fetchData(`${API_BASE_URL}/session-cart`, "GET").then((res) =>
    checkRes2(res)
  );
};

// export const fetchGetUserInfo = (
//   token: string | { token: string }
// ): Promise<Response> => {
//   const tokenString = typeof token === "string" ? token : token.token; // Extract token string
//   console.log("Authorization Token:", tokenString);

//   return fetchData(`${API_BASE_URL}/user`, "GET", undefined, tokenString).then(
//     (res) => checkRes(res)
//   );
// };
