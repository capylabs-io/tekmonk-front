import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useUserStore } from "@/store/UserStore";
import { getNewToken } from "./authService";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 120000,
};

const tekdojoAxios = axios.create(config);

const getJwt = async () => {
  const jwt = useUserStore.getState().jwt;
  return jwt;
};

tekdojoAxios.interceptors.request.use(
  async (config) => {
    const jwt = await getJwt();
    if (jwt) {
      // config.headers không đc gán trực tiếp mà phải thông qua phương thức set của đối tượng AxiosRequestConfig
      config.headers.set("Authorization", `Bearer ${jwt}`);
    }
    return config;
  },
  //check jwt expired
  //send request refresh token
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Biến cờ để ngăn chặn nhiều lần refresh token đồng thời
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

tekdojoAxios.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return tekdojoAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const tokenRefresh = useUserStore.getState().refreshToken; // Hoặc từ cookies
          if (!tokenRefresh) {
            throw new Error("Refresh token not available");
          }

          const newTokens = await getNewToken(tokenRefresh); // Gọi API để làm mới token
          const { jwt } = newTokens.data;

          useUserStore.getState().setRefreshToken(tokenRefresh);
          tekdojoAxios.defaults.headers["Authorization"] = "Bearer " + jwt;
          originalRequest.headers["Authorization"] = "Bearer " + jwt;

          processQueue(null, jwt);
          resolve(tekdojoAxios(originalRequest));
        } catch (err) {
          processQueue(err, null);
          console.log("err jwt", err);
          useUserStore.getState().setJwt(""); // Xóa token khỏi localStorage khi refresh token không hợp lệ
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);

export default tekdojoAxios;
