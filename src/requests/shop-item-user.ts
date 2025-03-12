// http://localhost:1337/api/custom-auth/users?filters[user_role][code][$eq]=STUDENT&populate=user_role&page=1&pageSize=10

import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
import { ShopItemUser } from "@/types/common-types";

export const ReqGetUserShopItems = async (query: string = "") => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/shop-item-users?${query}`
  );
  return response.data as StrapiResponse<ShopItemUser[]>;
};

export const ReqBuyShopItem = async (data: any) => {
  const response = await tekdojoAxios.post(`${BASE_URL}/shop-item-users`, data);
  return response.data;
};
