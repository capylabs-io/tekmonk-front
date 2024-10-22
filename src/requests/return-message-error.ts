import { AxiosError } from "axios";

//just for register contest - (axios - strapi)
const HandleReturnMessgaeErrorAxios = (error: any) => {
  if (error.response) {
    return "Tài khoản hoặc email đã tồn tại";
  } else if (error.request) {
    return "Không thể kết nối đến server";
  } else {
    return "Lỗi không xác định";
  }
};
export default HandleReturnMessgaeErrorAxios;
