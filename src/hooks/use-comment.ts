import { getListCommentPost } from "@/requests/post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from "qs";

type UseInfiniteLatestPostProps = {
  page: number;
  limit: number;
  postId?: number;
};

export const useInfiniteComment = ({
  page,
  limit,
  postId,
}: UseInfiniteLatestPostProps) => {
  return useInfiniteQuery({
    queryKey: ["infinite-comment", page, limit, postId],
    queryFn: async ({ pageParam = page }) => {
      try {
        const queryString = qs.stringify(
          {
            pagination: {
              page: pageParam,
              pageSize: limit,
            },
            sort: ["createdAt:desc"],
            populate: ["commentedBy", "post"],
            filters: {
              post: {
                id: Number(postId),
              },
            },
          },
          { encodeValuesOnly: true }
        );
        return await getListCommentPost(queryString);
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
    enabled: !!postId,
  });
};
