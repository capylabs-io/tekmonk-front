import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";

type LoginBody = {
  identifier: string;
  password: string;
  role: {
    name: string;
  };
};
const isFinalContest = process.env.NEXT_PUBLIC_IS_FINAL_CONTEST || "false";
// set up axios interceptor
export const postLogin = async (body: LoginBody) => {
  if (isFinalContest == "true") {
    const response = await tekdojoAxios.post(
      `${BASE_URL}/custom-auth/login`,
      body
    );
    return response.data;
  } else {
    const response = await tekdojoAxios.post(`${BASE_URL}/auth/local`, body);

    return response.data;
  }
};
export const postRegister = async (body: LoginBody) => {
  const response = await tekdojoAxios.post(
    `${BASE_URL}/auth/local/register`,
    body
  );
  return response.data;
};
export const getMe = async () => {
  const response = await tekdojoAxios.get(`${BASE_URL}/users/me`);
  return response.data;
};
