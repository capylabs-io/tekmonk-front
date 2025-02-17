import { TNews } from "@/types/common-types";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

//GET METHODS
export const ReqGetAllNews = async (query: string) => {
  try {
    const res = await tekdojoAxios.get(`/news?${query}`);
    return res.data as StrapiResponse<TNews[]>;
  } catch (error) {
    console.log("Error: ", error);
    return Promise.reject(error);
  }
};

export const ReqGetRamdomNews = async (type: string) => {
  try {
    const res = await tekdojoAxios.get(`/news/random-news?type=${type}`);
    return res.data as StrapiResponse<TNews[]>;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ReqGetNewsById = async (id: string) => {
  try {
    const res = await tekdojoAxios.get(`/news/${id}`);
    return res.data as StrapiResponse<TNews>;
  } catch (error) {
    return Promise.reject(error);
  }
};
