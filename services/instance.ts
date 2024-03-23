import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

function successResponseInterceptor(response: AxiosResponse) {
  return response;
}

async function errorResponseInterceptor(error: AxiosError) {
  return Promise.reject(error);
}

function apiInstance(config: AxiosRequestConfig) {
  const instance = axios.create(config);
  instance.interceptors.response.use(
    (res) => {
      return successResponseInterceptor(res);
    },
    (err) => {
      return errorResponseInterceptor(err);
    }
  );

  return instance;
}

export default apiInstance({ baseURL: process.env.NEXT_PUBLIC_BE_ENDPOINT });

export interface CommonErrorResponse {
  error: string;
  message: string;
  statusCode: 400;
}