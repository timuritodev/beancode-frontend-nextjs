import { API_BASE_URL } from "../../../../utils/constants";
import {
  ISignInData,
  ISignUpData,
  IUser,
  IEditProfileData,
  IChangePassword,
  IRecoverPassword,
  IResetPassword,
} from "../../../../../src/types/Auth.types";

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
  data?: ISignInData | ISignUpData | IUser | IEditProfileData | IChangePassword | IRecoverPassword | IResetPassword,
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

export const fetchSignUp = (data: ISignUpData): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/signup`, "POST", data).then((res) =>
    checkRes(res)
  );
};

export const fetchSignIn = (data: ISignInData): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/signin`, "POST", data).then((res) =>
    checkRes(res)
  );
};

export const fetchGetUserInfo = (
  token: string | { token: string }
): Promise<Response> => {
  const tokenString = typeof token === "string" ? token : token.token;
  return fetchData(`${API_BASE_URL}/user`, "GET", undefined, tokenString).then(
    (res) => checkRes(res)
  );
};

export const fetchEditUserInfo = (
  data: IEditProfileData,
  token: string | { token: string }
): Promise<Response> => {
  const tokenString = typeof token === "string" ? token : token.token;
  return fetchData(`${API_BASE_URL}/users-me`, "PATCH", data, tokenString).then(
    (res) => checkRes(res)
  );
};

export const fetchChangePassword = (
  data: IChangePassword,
  token: string | { token: string }
): Promise<Response> => {
  const tokenString = typeof token === "string" ? token : token.token;
  return fetchData(`${API_BASE_URL}/change-password`, "PATCH", data, tokenString).then(
    (res) => checkRes(res)
  );
};

export const fetchRecoverPassword = (
  data: IRecoverPassword,
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/forgot-password`, "POST", data).then(
    (res) => checkRes(res)
  );
};

export const fetchResetPassword = (
  data: IResetPassword,
): Promise<Response> => {
  return fetchData(`${API_BASE_URL}/reset-password`, "POST", data).then(
    (res) => checkRes(res)
  );
};

// export const fetchEditUserInfo = (
//   data: IEditProfileData,
//   token: string
// ): Promise<Response> => {
//   return fetchData(`${API_BASE_URL}/users-me`, "PUT", data, token).then((res) =>
//     checkRes(res)
//   );
// };

// export const fetchGetUserInfo = (token: string): Promise<Response> => {
//   return fetchData(`${API_BASE_URL}/user`, "GET", undefined, token).then(
//     (res) => checkRes(res)
//   );
// };
