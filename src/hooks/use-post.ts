import { PostTypeEnum, PostVerificationType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "qs";

import { getListPostCustom } from "@/requests/post";

export const useInfiniteLatestPost = ({
  page,
  limit,
  type,
}: {
  page: number;
  limit: number;
  type: PostTypeEnum;
}) => {
  return useInfiniteQuery({
    queryKey: ["latest-sell-post", page, limit, type],
    queryFn: async ({ pageParam = page }) => {
      try {
        const queryString = qs.stringify(
          {
            page: pageParam,
            limit,
            sort: "desc",
            isVerified: PostVerificationType.ACCEPTED,
            type: type || "normal",
          },
          { encodeValuesOnly: true }
        );
        const result = await getListPostCustom(queryString);

        return result;
      } catch (error) {
        console.error("Error fetching posts:", error);
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
    refetchOnWindowFocus: false,
  });
};
