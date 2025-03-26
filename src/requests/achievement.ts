import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
import { Achievement } from "@/types/common-types";

export const ReqGetAllAchievementsInfo = async (query: string = "") => {
  const res = await tekdojoAxios.get(`/get-user-achievement-info?${query}`);
  return res.data as StrapiResponse<Achievement[]>;
};

export const ReqClaimAchievement = async (id: number) => {
  return await tekdojoAxios.put(`/achievement-histories/${id}`);
};
