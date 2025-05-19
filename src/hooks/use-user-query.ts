import { ReqGetUserById } from "@/requests/login";
import { ReqCustomGetUsers } from "@/requests/user";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

export const useGetUserQueryById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => ReqGetUserById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useSearchUsers = ({ username }: { username?: string }) => {
  return useQuery({
    queryKey: ["search-users", username],
    queryFn: async () => {
      const queryString = qs.stringify({
        username: {
          $containsi: username,
        },
      });
      return await ReqCustomGetUsers(queryString);
    },
    enabled: !!username,
    refetchOnWindowFocus: false,
  });
};
