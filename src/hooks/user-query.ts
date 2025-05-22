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
  searchValue,
}: {
  id?: number;
  page: number;
  pageSize: number;
  type: UserRankingType;
  searchValue?: string;
}) => {
  return useQuery({
    queryKey: ["user-ranking", id, page, pageSize, type, searchValue],
    queryFn: async () => {
      let queryString = qs.stringify({
        page: page,
        pageSize: pageSize,
        searchValue: searchValue,
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

export const useTopThreeRanking = ({
  type = UserRankingType.TOTAL_PRICE,
}: {
  type: UserRankingType;
}) => {
  return useQuery({
    queryKey: ["top-three-ranking", type],
    queryFn: async () => {
      let queryString = qs.stringify({
        page: 1,
        pageSize: 3,
      });

      queryString += `&${type}=true`;

      return await ReqGetUserRanking(queryString);
    },
    refetchOnWindowFocus: false,
  });
};

export const useBulkUserRanking = ({
  type = UserRankingType.TOTAL_PRICE,
}: {
  type: UserRankingType;
}) => {
  return useQuery({
    queryKey: ["bulk-user-ranking", type],
    queryFn: async () => {
      let queryString = qs.stringify({
        page: 1,
        pageSize: 100, // Fetch 100 users at once
      });

      queryString += `&${type}=true`;

      return await ReqGetUserRanking(queryString);
    },
    refetchOnWindowFocus: false,
  });
};
