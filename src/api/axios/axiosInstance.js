import axios from "axios";
import { showError } from "./notify";

// 创建 axios 实例
const Myaxios = axios.create({
  baseURL: "http://10.16.53.208:8000", // 修改为你的后端地址
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
Myaxios.interceptors.request.use(
  (config) => {
    const dataRequiredEndpoints = ['/train']; // 请求参数校验接口列表

    if (
      dataRequiredEndpoints.includes(config.url) &&
      (!config.data || Object.keys(config.data).length === 0)
    ) {
      showError("训练失败：参数不能为空");
      return Promise.reject(new Error("请求参数缺失"));
    }

    return config;
  },
  (error) => {
    showError("请求异常：" + error.message);
    return Promise.reject(error);
  }
);

// 响应拦截器
Myaxios.interceptors.response.use(
  (response) => {
    const { data } = response;

    // 自定义业务逻辑错误处理（非 200）
    if (data.code && data.code !== 200) {
      showError(data.message || "服务器返回异常");
      return Promise.reject(data);
    }

    return data; // 默认返回业务数据
  },
  (error) => {
    // 处理 HTTP 层级错误
    let msg = "请求失败，请检查网络连接";
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400: msg = data.message || "请求参数错误"; break;
        case 401: msg = "未授权，请重新登录"; break;
        case 403: msg = "权限不足"; break;
        case 404: msg = "资源不存在"; break;
        case 500: msg = "服务器内部错误"; break;
        default:  msg = data.message || `状态码：${status}`;
      }
    } else if (error.code === "ECONNABORTED") {
      msg = "请求超时，请稍后再试";
    } else if (axios.isCancel(error)) {
      msg = "请求已取消";
    }

    showError(msg);
    return Promise.reject(error);
  }
);

export default Myaxios;
