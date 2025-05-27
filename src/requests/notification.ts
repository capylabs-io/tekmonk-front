import tekdojoAxios from "./axios.config";
import { StrapiResponse } from "./strapi-response-pattern";
import { TNotification } from "@/types/notification";

const BASE_ROUTE = "notifications";
export const ReqGetNotifications = async (query: string = "") => {
  const response = await tekdojoAxios.get(`${BASE_ROUTE}?${query}`);
  return response.data as StrapiResponse<TNotification[]>;
};

export const ReqReadNotification = async (id: number) => {
  const response = await tekdojoAxios.put(`${BASE_ROUTE}/${id}`, {
    data: {
      isRead: true,
    },
  });
  return response.data;
};
