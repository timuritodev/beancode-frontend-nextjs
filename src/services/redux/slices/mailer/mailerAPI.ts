import { IData } from "../../../../types/Mailer.types";
import { API_BASE_URL } from "../../../../utils/constants";

const checkRes = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

export const fetchData = (url: string, method: string, data: IData) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => checkRes(res));
};

export const fetchSendEmail = (data: IData): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/send-email`, "POST", data);
};
