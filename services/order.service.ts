import { AxiosError, AxiosResponse } from "axios";
import { CommonErrorResponse } from "./instance";
import apiInstance from "./instance";
import to from "await-to-js";

export interface GetUserOder {
  id: number;
  userId: number;
  status: string;
  Books: {
    Book: {
      id: number;
      title: string;
      cover_img: string;
      point: number;
      Tag: {
        id: number;
        name: string;
        bookId: number;
      }[];
      Authors: {
        id: number;
        bookId: number;
        authorId: number;
        Author: {
          id: number;
          name: string;
        };
      }[];
    };
  }[];
}

export const createOrder = async (
  url: string,
  { arg }: { arg: { userId: string } }
) => {
  const api = apiInstance.post(url, arg);

  const [err, data] = await to<
    AxiosResponse<{
      id: number;
      userId: number;
      status: "UNPAID" | "PAID" | "CANCEL";
    }>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const getUserOrder = async (userId: string) => {
  const api = apiInstance.get(`/order/user/${userId}`);

  const [err, data] = await to<
    AxiosResponse<GetUserOder[]>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const cancelOrder = async (
  url: string,
  { arg }: { arg: { orderId: string; userId: string } }
) => {
  const api = apiInstance.put(`${url}/${arg.orderId}`, {
    userId: `${arg.userId}`,
  });

  const [err, data] = await to<
    AxiosResponse<{ id: number; status: "CANCEL"; userId: number }>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const payOrder = async (
  url: string,
  { arg }: { arg: { orderId: string; userId: string } }
) => {
  const api = apiInstance.put(`${url}/${arg.orderId}`, {
    userId: `${arg.userId}`,
  });

  const [err, data] = await to<
    AxiosResponse<{ id: number; userId: number; status: string }>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};
