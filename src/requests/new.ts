import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";

export const getEvent = async (filter?: string) => {
  // const url = BASE_URL + "/news" + (filter ? filter : "");
  const response = await tekdojoAxios.get(
    `${BASE_URL}/news?filters[type][$eq]=event`
  );
  return response.data;
};

export const getEventDetail = async (id?: number) => {
  const url = BASE_URL + "/news/${id}";
  const response = await tekdojoAxios.get(url);
  return response.data;
};

export const getNew = async () => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/news?filters[type][$eq]=news`
  );
  return response.data;
};
export const getHiring = async () => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/news?filters[type][$eq]=hiring`
  );
  return response.data;
};
