import axios, { AxiosRequestConfig } from 'axios';

const configApi: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

const configMock: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_MOCK_BASE_URL,
};

export const api = axios.create(configApi);
export const mock = axios.create(configMock);
