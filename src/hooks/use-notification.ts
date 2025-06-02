import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import qs from "qs";
import {
  ReqGetNotifications,
  ReqReadNotification,
} from "@/requests/notification";

type UseInfiniteNotificationProps = {
  page?: number;
  pageSize?: number;
  isRead?: boolean;
  userId?: number;
};

export const useInfiniteNotifications = ({
  page = 1,
  pageSize = 10,
  isRead,
  userId,
}: UseInfiniteNotificationProps = {}) => {
  return useInfiniteQuery({
    queryKey: ["infinite-notifications", page, pageSize, isRead, userId],
    queryFn: async ({ pageParam = page }) => {
      try {
        const filters: any = {};

        if (isRead !== undefined) {
          filters.isRead = isRead;
        }

        if (userId) {
          filters.user = { id: userId };
        }

        const queryString = qs.stringify({
          pagination: {
            page: pageParam,
            pageSize,
          },
          sort: ["isRead:asc", "createdAt:desc"],
          populate: ["user", "actor", "post"],
          filters,
        });

        const result = await ReqGetNotifications(queryString);
        return result;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.pagination?.page ?? 1;
      const pageCount = lastPage?.meta?.pagination?.pageCount ?? 1;
      const nextPage = currentPage < pageCount ? currentPage + 1 : undefined;
      return nextPage;
    },
    initialPageParam: page,
    refetchOnWindowFocus: false,
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => ReqReadNotification(notificationId),
    onSuccess: () => {
      // Invalidate and refetch notifications to update the read status
      queryClient.invalidateQueries({ queryKey: ["infinite-notifications"] });
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
    },
  });
};

export const useNotifications = ({
  page = 1,
  pageSize = 10,
  isRead,
  userId,
}: UseInfiniteNotificationProps = {}) => {
  return useInfiniteNotifications({ page, pageSize, isRead, userId });
};
