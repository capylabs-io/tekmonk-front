// http://localhost:1337/api/custom-auth/users?filters[user_role][code][$eq]=STUDENT&populate=user_role&page=1&pageSize=10

import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
import { ShopItem } from "@/types/common-types";

export const ReqGetShopItems = async (query: string = "") => {
  const response = await tekdojoAxios.get(`${BASE_URL}/shop-items?${query}`);
  return response.data as StrapiResponse<ShopItem[]>;
};
