/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../../../../utils/constants";
import {
  DeliveryCalculateRequest,
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

export const fetchData = (
  url: string,
  method: string,
  data?: OrderRegistrationRequest | DeliveryCalculateRequest,
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