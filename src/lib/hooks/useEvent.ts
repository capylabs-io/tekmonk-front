"use client";
import { useEffect, useState } from "react";
import { Event } from "@/types/common-types";
import { getEvent } from "@/requests/new";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvent();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching new cards:", error);
      }
    };

    fetchEvents();
  }, []);

  return events;
};
