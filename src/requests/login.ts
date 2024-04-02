import tekdojoAxios from "./axios.config";

type LoginBody = {
  identifier: string;
  password: string;
  role: {
    name: string;
  };
};

// Backend base url
const BASE_URL = "http://localhost:1337/api";

// set up axios interceptor
export const postLogin = async (body: LoginBody) => {
  const response = await tekdojoAxios.post(`${BASE_URL}/auth/local`, body);
  return response.data;
};

export const getMe = async () => {
  const response = await tekdojoAxios.get(`${BASE_URL}/users/me`);
  return response.data;
};
