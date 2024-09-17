/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../../../utils/constants";
import {
  DeliveryCalculateRequest,
  IAuthDelivery,
  IDeliveryCountries,
  OrderRegistrationRequest,
} from "../../../../types/Deliver.types";

const checkRes = (res: any) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

export const fetchData = (
  url: string,
  method: string,
  data?: OrderRegistrationRequest | DeliveryCalculateRequest | IDeliveryCountries,
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

export const fetchCalculateDelivery = (
  data: DeliveryCalculateRequest,
  token: string
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/api-calculate`, "POST", data, token).then(
    (res) => checkRes(res)
  );
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

export const fetchDeliver2 = (
  data: OrderRegistrationRequest,
  token: string
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/api-delivery`, "POST", data, token).then(
    (res) => checkRes(res)
  );
};

// export const fetchCountries = (
//   data: IDeliveryCountries,
//   token: string
// ): Promise<Response> => {
//   return fetchData(`${API_BASE_URL}/api-countries`, "GET", data, token).then(
//     (res) => checkRes(res)
//   );
// };

export const fetchCountries = (
  data: IDeliveryCountries,
  token: string
): Promise<Response> => {
  const queryParams = new URLSearchParams(data as Record<string, string>).toString();
  return fetchData(`${API_BASE_URL}/api-countries?${queryParams}`, "GET", undefined, token).then(
    (res) => checkRes(res)
  );
};
