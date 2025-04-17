import Myaxios from "./axiosInstance";

// 统一封装请求方法（方便替换、扩展）
const request = {
  get: (url, params, config = {}) => Myaxios.get(url, { params, ...config }),
  post: (url, data = {}, config = {}) => Myaxios.post(url, data, config),
  put: (url, data = {}, config = {}) => Myaxios.put(url, data, config),
  delete: (url, config = {}) => Myaxios.delete(url, config),
};

export { request, Myaxios };
