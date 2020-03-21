import http, { AxiosResponse, AxiosRequestConfig } from 'axios';

const post = http.post;
const get = http.get;
const del = http.delete;

http.post = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
  const custom: AxiosRequestConfig = {
    validateStatus: () => true,
  };
  return post(url, data, config ? { ...config, ...custom } : custom);
};

http.get = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R> => {
  const custom: AxiosRequestConfig = {
    validateStatus: () => true,
  };

  return get(url, config ? { ...config, ...custom } : custom);
};

http.delete = <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R> => {
  const custom: AxiosRequestConfig = {
    validateStatus: () => true,
  };

  return del(url, config ? { ...config, ...custom } : custom);
};

export default http;
