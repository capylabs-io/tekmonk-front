import { ReqGetUserAnalytic, ReqGetUserRanking } from "@/requests/user";
import { UserRankingType } from "@/types/users";
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

export const useUserRanking = ({
  id,
  page,
  pageSize,
  type = UserRankingType.TOTAL_PRICE,
}: {
  id?: number;
  page: number;
  pageSize: number;
  type: UserRankingType;
}) => {
  return useQuery({
    queryKey: ["user-ranking", id, page, pageSize, type],
    queryFn: async () => {
      /**
       * totalPrice = true,
        point = false,
        post = false,
        project = false,
       */

      let queryString = qs.stringify({
        page: page,
        pageSize: pageSize,
      });

      if (id) {
        queryString += `&id=${id}`;
      }
      queryString += `&${type}=true`;

      return await ReqGetUserRanking(queryString);
    },
    refetchOnWindowFocus: false,
  });
};
