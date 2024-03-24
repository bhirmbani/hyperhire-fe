import to from "await-to-js";
import { AxiosError, AxiosResponse } from "axios";
import apiInstance, { CommonErrorResponse } from "./instance";

export interface GetBookResponse {
  id: number;
  title: string;
  cover_img: string;
  point: number;
  Tag: {
    id: number;
    name: string;
  }[];
  Authors: {
    Author: {
      id: number;
      name: string;
    };
  }[];
}

export interface AddToCartRequest {
  userId: string;
  bookId: string;
}

export interface AddBookToCartResponse {
  bookId: number;
  id: number;
  userId: number;
}

export const getBooks = async (skip: string, take: string) => {
  const api = apiInstance.get("/books", {
    params: {
      skip,
      take,
    },
  });

  const [err, data] = await to<
    AxiosResponse<GetBookResponse[]>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const addBookToCart = async (
  url: string,
  { arg }: { arg: AddToCartRequest }
) => {
  const api = apiInstance.post(url, arg);

  const [err, data] = await to<
    AxiosResponse<AddBookToCartResponse>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};

export const removeBookFromCart = async (
  url: string,
  { arg }: { arg: { cartId: string } }
) => {
  const api = apiInstance.delete(`${url}/${arg.cartId}`);

  const [err, data] = await to<
    AxiosResponse<{ id: number; userId: number; bookId: number }>,
    AxiosError<CommonErrorResponse>
  >(api);

  const dataData = data?.data;

  if (err) throw new Error(err.response?.data.message);

  return {
    data: dataData,
  };
};
