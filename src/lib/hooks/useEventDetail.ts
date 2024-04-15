"use client";
import { useEffect, useState } from "react";
import { EventDetail } from "@/types/common-types";
import { BASE_URL } from "@/contants/api-url";
import tekdojoAxios from "@/requests/axios.config";
import { get } from "lodash";

export const useEventDetail = (paramsId: string) => {
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await tekdojoAxios.get<EventDetail>(
          `${BASE_URL}/news/${paramsId}`
        );
        setEventDetail(get(response.data, "data", null));
        //truy cập trường data của response.data
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetail();
  }, [paramsId]);

  const updateEventDetail = (
    key: keyof EventDetail["attributes"],
    value: string
  ) => {
    if (eventDetail) {
      const updatedDetail = { ...eventDetail };
      updatedDetail.attributes[key] = value;
      setEventDetail(updatedDetail);
    }
  };

  return {
    eventDetail,
    updateEventDetail,
  };
};
