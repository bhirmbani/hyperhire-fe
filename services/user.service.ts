import to from "await-to-js";
import { AxiosError, AxiosResponse } from "axios";
import apiInstance, { CommonErrorResponse } from "./instance";

export interface RegisterUserRequest {
  username: string;
  password: string;
}

export interface RegisterUserResponse {
  id: number;
  password: string;
  point: number;
  username: string;
}

export interface GetUserCartResponse {
  id: number;
  userId: number;
  bookId: number;
  Book: {
    id: number;
    title: string;
    cover_img: string;
    point: number;
  };
}

export const registerUser = async (
  url: string,
  { arg }: { arg: RegisterUserRequest }
) => {
  const api = apiInstance.post(url, arg);

  const [err, data] = await to<
    AxiosResponse<RegisterUserResponse>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const loginUser = async (
  url: string,
  { arg }: { arg: RegisterUserRequest }
) => {
  const api = apiInstance.post(url, arg);

  const [err, data] = await to<
    AxiosResponse<RegisterUserResponse>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const getUserPoint = async (userId: string) => {
  const api = apiInstance.get(`/user/point/${userId}`);

  const [err, data] = await to<
    AxiosResponse<{ point: number }>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const getUserCart = async (userId: string) => {
  const api = apiInstance.get(`/cart/user/${userId}`);

  const [err, data] = await to<
    AxiosResponse<GetUserCartResponse[]>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};
