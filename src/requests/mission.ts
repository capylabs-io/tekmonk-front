import { Mission } from "@/types/common-types";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

export const ReqGetMissionInfo = async (query: string = "") => {
  const res = await tekdojoAxios.get(`/user-mission-info?${query}`);
  return res.data as StrapiResponse<Mission[]>;
};

export const ReqClaimMission = async (id: number) => {
  return await tekdojoAxios.put(`/mission-histories/${id}`);
};
