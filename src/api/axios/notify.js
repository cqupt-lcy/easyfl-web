import { notification } from "antd";

// 通用错误提示
export const showError = (description, title = "错误提示") => {
  notification.error({
    message: title,
    description,
    duration: 4.5,
  });
};

// 成功提示（可选）
export const showSuccess = (description, title = "操作成功") => {
  notification.success({
    message: title,
    description,
    duration: 3,
  });
};
