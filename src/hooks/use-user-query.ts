import { ReqGetUserById } from "@/requests/login";
import { ReqCustomGetUsers } from "@/requests/user";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import qs from "qs";

export const useGetUserQueryById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => ReqGetUserById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteSearchUsers = ({
  page = 1,
  limit = 10,
  username,
}: {
  page?: number;
  limit?: number;
  username?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["infinite-search-users", page, limit, username],
    queryFn: async ({ pageParam = page }) => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: pageParam,
            pageSize: limit,
          },
          filters: {
            user_role: {
              code: {
                $eq: "STUDENT",
              },
            },
            username: {
              $contains: username,
            },
          },
        });
        const result = await ReqCustomGetUsers(queryString);
        return result;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage: any) => {
      const currentPage = lastPage?.meta?.pagination?.page ?? 1;
      const pageCount = lastPage?.meta?.pagination?.pageCount ?? 1;
      const nextPage = currentPage < pageCount ? currentPage + 1 : undefined;
      return nextPage;
    },
    initialPageParam: page,
    enabled: !!username,
    refetchOnWindowFocus: false,
  });
};
