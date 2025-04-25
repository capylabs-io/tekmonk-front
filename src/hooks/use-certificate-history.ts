import { useQuery } from "@tanstack/react-query";
import { ReqGetCertificateHistories } from "@/requests/certificate";
import qs from "qs";

export const useCertificateHistory = ({
  page,
  pageSize,
  id,
}: {
  page: number;
  pageSize: number;
  id: number;
}) => {
  return useQuery({
    queryKey: ["certificate-history", page, pageSize, id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["certificate", "student"],
        pagination: {
          page,
          pageSize,
        },
        filters: {
          student: {
            id,
          },
        },
      });
      return await ReqGetCertificateHistories(queryString);
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
