import {TPostUpload, SingleResponseDto} from "@/types";
import tekdojoAxios from "./axios.config";
import { BASE_URL } from "@/contants/api-url";

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

export const uploadPost = async (user_id: string, postBody: TPostUpload): Promise<SingleResponseDto> => {
  try {
      const convertData = {
        ...postBody,
        postedBy: user_id,
      }
    const response = await tekdojoAxios.post(`${BASE_URL}/posts`, convertData);
    if(response.status == 201) {
        return {
            status: true,
            message: "Upload post successfully",
            value: response.data,
        };
    }
    return {
        status: false,
        message: "Upload post failed with status code " + response.status,
    };
  }catch (error) {
    console.error("Error when upload post", error);
    return {
      status: false,
      message: "Error when upload post",
    };
  }
};

export const uploadMedia = async (formData: FormData): Promise<SingleResponseDto> => {
  try {
    const res = await tekdojoAxios.post(`/upload`, formData);
      return {
          status: res.status == 200,
          message: "Upload media successfully",
      }
  }catch (error) {
    console.error("Error when upload media", error);
   return {
     status: false,
        message: "Error when upload media",
   }
  }
};
