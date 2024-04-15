"use client";
import { useEffect, useState } from "react";
import { Hiring, New } from "@/types/common-types";
import { getHiring, getNew } from "@/requests/new";

export const useNews = () => {
  const [news, setNews] = useState<New[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNew();
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching new cards:", error);
      }
    };

    fetchNews();
  }, []);

  return news;
};

export const useHirings = () => {
  const [hirings, setHirings] = useState<Hiring[]>([]);

  useEffect(() => {
    const fetchHirings = async () => {
      try {
        const response = await getHiring();
        setHirings(response.data);
      } catch (error) {
        console.error("Error fetching new cards:", error);
      }
    };

    fetchHirings();
  }, []);

  return hirings;
};
