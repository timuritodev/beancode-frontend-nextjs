import { IPromo } from "../../../../types/Promo.types";
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
    data?: IPromo,
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

export const fetchPromo = (data: IPromo): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/apply-promo-code`, "POST", data).then(
    (res) => checkRes(res)
  );
};
