import { ISubcription } from "../../../../types/Subcription.types";
import { API_BASE_URL } from "../../../../utils/constants";

const checkRes = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

export const fetchData = (
  url: string,
  method: string,
  email?: ISubcription,
  token?: string
) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!email && { body: JSON.stringify({ email }) }),
    // body: JSON.stringify({ email: data }),
  }).then((res) => checkRes(res));
};

export const fetchSubcribe = (data: ISubcription): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/subscription/add`, "POST", data).then(
    (res) => checkRes(res)
  );
};
