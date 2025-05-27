import { MissionHistory } from "@/types/mission-history";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
const BASE_ROUTE = "/mission-histories";
export const ReqGetMissionHistory = async (query: string = "") => {
  const response = await tekdojoAxios.get(`${BASE_ROUTE}?${query}`);
  return response.data as StrapiResponse<MissionHistory[]>;
};
