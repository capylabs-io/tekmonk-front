import { AxiosError } from "axios";

//just for register contest - (axios - strapi)
export const HandleReturnMessgaeErrorAxios = (error: any) => {
  if (error.response) {
    const { data } = error.response;
    if (data.error.message == "Username") {
      return "username";
    }
    if (data.error.message == "Email") {
      return "email";
    }
    if (data.error.message == "unknown") {
      return "unknown";
    }
    return "Tài khoản hoặc email đã tồn tại";
  } else if (error.request) {
    return "Không thể kết nối đến server";
  } else {
    return "Lỗi không xác định";
  }
};

export const HandleReturnMessgaeErrorLogin = (error: any) => {
  if (error.response) {
    const { data } = error.response;
    if (data.error.message == "Invalid identifier") {
      return "Người dùng không tồn tại trên hệ thống";
    }
    if (data.error.message == "Invalid password") {
      return "Mật khẩu không chính xác";
    }
    if(data.error.message == "password is a required field") {
      return "Vui lòng nhập mật khẩu";
    }
    return "Lỗi không xác định";
  } else if (error.request) {
    return "Không thể kết nối đến server";
  } else {
    return "Lỗi không xác định";
  }
}
