/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrderStatus } from "../../../../types/OrderStatus.types";
import { API_BASE_URL } from "../../../../utils/constants";

const checkRes = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

const objectToFormData = (obj: Record<string, any>) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

export const fetchGetStatus = (data: IOrderStatus): Promise<Response> => {
  const formData = objectToFormData(data);

  return fetch(`${API_BASE_URL}/api-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  }).then((res) => checkRes(res));
};
