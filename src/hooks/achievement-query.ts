import { ReqGetAllAchievementsInfo } from "@/requests/achievement";
import { useQuery } from "@tanstack/react-query";

export const useAchievementQuery = () => {
  return useQuery({
    queryKey: ["achievement"],
    queryFn: async () => {
      return await ReqGetAllAchievementsInfo();
    },
  });
};
