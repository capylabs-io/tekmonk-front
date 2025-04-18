import { Category } from "@/types/common-types";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

export const GetCategories = async () => {
  const response = await tekdojoAxios.get(`/categories`);
  return response.data as StrapiResponse<Category[]>;
};
