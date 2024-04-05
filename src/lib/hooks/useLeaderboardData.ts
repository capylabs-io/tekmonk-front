"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LeaderboardData } from "@/types/common-types";

const API_URL = "http://localhost:3500/leaderboardDatas";

export const useLeaderboardDatas = () => {
  const [leaderboardDatas, setLeaderboardDatas] = useState<LeaderboardData[]>(
    []
  );

  useEffect(() => {
    const fetchLeaderboardDatas = async () => {
      try {
        const response = await axios.get(API_URL);
        setLeaderboardDatas(response.data);
      } catch (error) {
        console.error("Error fetching leaderboardData cards:", error);
      }
    };

    fetchLeaderboardDatas();
  }, []);

  return leaderboardDatas;
};
