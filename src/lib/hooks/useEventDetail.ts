"use client";
import { useEffect, useState } from "react";
import { EventDetail } from "@/types/common-types";

const API_URL = "http://localhost:3500/eventDetail";

export const useEventDetail = () => {
  const [eventDetail, setEventDetail] = useState<EventDetail>({
    title: "",
    eventTime: "",
    eventVenue: "",
    address: "",
    month: "",
    day: "",
    weekday: "",
    content: "",
  });

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEventDetail(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetail();
  }, []);

  const updateEventDetail = (key: keyof EventDetail, value: string) => {
    const updatedDetail = { ...eventDetail };
    updatedDetail[key] = value;
    setEventDetail(updatedDetail);
  };

  return {
    eventDetail,
    updateEventDetail,
  };
};
