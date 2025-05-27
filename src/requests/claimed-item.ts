import { ClaimedItem } from "@/types/claimed-item";
import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";

export const ReqGetClaimedItems = async (query = "") => {
  const response = await tekdojoAxios.get(`/claimed-items?${query}`);
  return response.data as StrapiResponse<ClaimedItem[]>;
};
