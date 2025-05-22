import { PostTypeEnum, PostVerificationType } from "@/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from "qs";

import { countPosts, getListPostCustom } from "@/requests/post";

type UseInfiniteLatestPostProps = {
  page: number;
  limit: number;
  type?: PostTypeEnum;
  isVerified: PostVerificationType;
  authorId?: number;
  searchTerm?: string;
};

export const useInfiniteLatestPost = ({
  page,
  limit,
  type,
  isVerified = PostVerificationType.ACCEPTED,
  authorId,
  searchTerm,
}: UseInfiniteLatestPostProps) => {
  return useInfiniteQuery({
    queryKey: [
      "infinite-latest-post",
      page,
      limit,
      type,
      isVerified,
      authorId,
      searchTerm,
    ],
    queryFn: async ({ pageParam = page }) => {
      try {
        const queryString = qs.stringify(
          {
            page: pageParam,
            limit,
            sort: "desc",
            isVerified: isVerified,
            type: type,
            authorId: authorId,
            searchTerm: searchTerm,
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

export const useCountPosts = (isVerified: string, userId?: number) => {
  return useQuery({
    queryKey: ["count-posts", isVerified, userId],
    queryFn: async () => {
      const queryString = qs.stringify({ isVerified });
      const result = await countPosts(queryString);
      return result;
    },
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
