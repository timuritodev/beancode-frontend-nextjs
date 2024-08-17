/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWholesale } from "../../../../types/Wholesale.types";
import { API_BASE_URL } from "../../../../utils/constants";

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
  data?: IWholesale,
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

export const fetchCreateWholesale = (data: IWholesale): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/wholesale/send`, "POST", data).then((res) =>
    checkRes(res)
  );
};