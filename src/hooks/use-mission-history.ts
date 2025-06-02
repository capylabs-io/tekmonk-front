import { ReqGetMissionHistory } from "@/requests/mission-history";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const useMissionHistory = ({
  page,
  pageSize,
  id,
}: {
  page: number;
  pageSize: number;
  id: number;
}) => {
  return useQuery({
    queryKey: ["mission-history", page, pageSize],
    queryFn: () =>
      ReqGetMissionHistory(
        qs.stringify({
          pagination: {
            page,
            pageSize,
          },
          populate: "*",
          filters: {
            user: {
              id,
            },
          },
        })
      ),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
