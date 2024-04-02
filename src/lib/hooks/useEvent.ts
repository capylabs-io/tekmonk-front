"use client";
import { useEffect, useState } from "react";
import { Event } from "@/types/common-types";

const API_URL = "http://localhost:3500/events";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch event cards");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching event cards:", error);
      }
    };

    fetchEvents();
  }, []);

  return events;
};
