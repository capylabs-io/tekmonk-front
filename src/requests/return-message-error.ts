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
    if (!!data.error.message) {
      console.log(data.error.message);
      return data.error.message.toString();
    }
    return data.error.message.toString();
  } else if (error.request) {
    return "Không thể kết nối đến server";
  } else {
    return "Lỗi không xác định";
  }
}
