import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

function requestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = localStorage.getItem('Authorization');

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
}

function requestError(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function responseSuccess<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function responseError(error: AxiosError): Promise<never> {
  console.error('error >>>', error);
  return Promise.reject(error);
}

client.interceptors.request.use(requestSuccess, requestError);
client.interceptors.response.use(responseSuccess, responseError);

export { client };
