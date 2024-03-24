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
