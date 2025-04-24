import { ReqGetUserAnalytic } from "@/requests/user";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const useUserAnalyticQuery = (id: number) => {
  return useQuery({
    queryKey: ["user-analytic", id],
    queryFn: async () => {
      const queryString = qs.stringify({
        id: id,
      });

      return await ReqGetUserAnalytic(queryString);
    },
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
