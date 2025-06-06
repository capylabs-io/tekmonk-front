import { BASE_URL } from "@/contants/api-url";
import { AvatarConfig } from "@/types/common-types";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

export const ReqGetAvatarConfig = async (query: string = "") => {
  const response = await tekdojoAxios.get(
    `${BASE_URL}/avatar-configs?${query}`
  );
  return response.data as StrapiResponse<AvatarConfig[]>;
};

export const ReqUpdateAvatarConfig = async (id: number, data: AvatarConfig) => {
  const response = await tekdojoAxios.put(`${BASE_URL}/avatar-configs/${id}`, {
    data,
  });
  return response.data as StrapiResponse<AvatarConfig>;
};
