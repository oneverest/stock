import http, { AxiosResponse, AxiosRequestConfig } from 'axios';

const post = http.post;
http.post = <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> => {
  const custom: AxiosRequestConfig = {
    validateStatus: () => true,
  };
  return post(url, data, config ? { ...config, ...custom } : custom);
};
export default http;
