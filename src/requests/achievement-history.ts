import { AchievementHistory } from "@/types/achievement-history";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
const BASE_ROUTE = "/achievement-histories";
export const ReqGetAchievementHistory = async (query: string = "") => {
  const response = await tekdojoAxios.get(`${BASE_ROUTE}?${query}`);
  return response.data as StrapiResponse<AchievementHistory[]>;
};
