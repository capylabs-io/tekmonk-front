import { PostType } from "@/types";
import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";
import { AxiosResponse } from "axios";
import { StrapiResponse } from "./strapi-response-pattern";
import { PostComment } from "@/types/common-types";

const fakeData = [
  {
    id: 1,
    content: "Hello",
    media: "https://www.google.com",
    postedBy: 1,
    type: "image",
    metadata: "metadata",
  },
];

//for get all post (pagination)
export const getPostsPagination = async (page: number, limit: number) => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/posts?page=${page}&limit=${limit}`
  ); // fix later
  return response.data;
};
export const getListPost = async (query?: any) => {
  try {
    const res = await tekdojoAxios.get(`${BASE_URL}/posts?${query}`);
    return res.data as StrapiResponse<PostType[]>;
  } catch (error) {
    console.log("Error: ", error);
    return Promise.reject(error);
  }
};
export const getListPostCustom = async (query?: any) => {
  try {
    const res = await tekdojoAxios.get(
      `${BASE_URL}/get-custom-list-posts?${query}`
    );
    return res.data as StrapiResponse<PostType[]>;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const uploadPost = async (data: any) => {
  const response = await tekdojoAxios.post(`${BASE_URL}/posts`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const findPost = async (id: number) => {
  const response = await tekdojoAxios.get(`${BASE_URL}/posts/${id}`);
  return response.data as PostType;
};
export const updatePost = async (id: number, data: any) => {
  const response = await tekdojoAxios.put(`${BASE_URL}/posts/${id}`, { data });
  return response.data;
};

export const likePost = async (data: any) => {
  const response = await tekdojoAxios.post(`${BASE_URL}/likes`, data);
  return response.data;
};
export const getListCommentPost = async (query?: any) => {
  const response = await tekdojoAxios.get(`${BASE_URL}/comments?${query}`);
  return response.data as StrapiResponse<PostComment[]>;
};
export const addCommentPost = async (data: any) => {
  const response = await tekdojoAxios.post(`${BASE_URL}/comments`, { data });
  return response.data;
};
export const editCommentPost = async (id: number, data: any) => {
  const response = await tekdojoAxios.put(`${BASE_URL}/comments/${id}`, {
    data,
  });
  return response.data;
};
export const deleteCommentPost = async (id: number) => {
  const response = await tekdojoAxios.delete(`${BASE_URL}/comments/${id}`);
  return response.data;
};
