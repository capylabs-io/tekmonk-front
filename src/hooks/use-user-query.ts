import { ReqGetUserById } from "@/requests/login";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => ReqGetUserById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
