import { useQuery } from "@tanstack/react-query";
import { ReqGetAchievementHistory } from "@/requests/achievement-history";
import qs from "qs";

export const useAchievementHistory = ({
  page,
  pageSize,
  id,
}: {
  page: number;
  pageSize: number;
  id: number;
}) => {
  return useQuery({
    queryKey: ["achievement-history", page, pageSize],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: "*",
        pagination: {
          page,
          pageSize,
        },
        filters: {
          user: {
            id,
          },
        },
      });
      return await ReqGetAchievementHistory(queryString);
    },
  });
};
