import axios, { AxiosRequestConfig } from 'axios';
import { tokenService } from '../local-storage';

const configApi: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

const configMock: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_MOCK_BASE_URL,
};

export const api = axios.create(configApi);
export const mock = axios.create(configMock);

api.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      tokenService.removeAccessToken();
      tokenService.removeRefreshToken();
      return api
        .get('/auth/refresh')
        .then((response) => {
          tokenService.setAccessToken(response.data.accessToken);
          tokenService.setRefreshToken(response.data.refreshToken);
          return api.request(error.config);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);
