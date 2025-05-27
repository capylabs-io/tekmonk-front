"use client";
import React, { useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { NotiCard } from "@/components/notification/NotiCard";
import { NotificationSkeletonList } from "@/components/notification/NotificationSkeleton";
import {
  useInfiniteNotifications,
  useReadNotification,
} from "@/hooks/use-notification";
import { useUserStore } from "@/store/UserStore";
import { TNotification } from "@/types/notification";
import { Button } from "@/components/common/button/Button";
import { RefreshCw } from "lucide-react";
import { EmptyState } from "@/components/lottie/EmptyState";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
import { CommonLoading } from "@/components/common/CommonLoading";

export default function Notification() {
  const userInfo = useUserStore((state) => state.userInfo);
  const readNotificationMutation = useReadNotification();

  // Fetch all notifications
  const {
    data: allNotificationsData,
    fetchNextPage: fetchNextAllPage,
    hasNextPage: hasNextAllPage,
    isFetchingNextPage: isFetchingNextAllPage,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useInfiniteNotifications({
    userId: userInfo?.id,
    pageSize: 10,
  });

  // Fetch unread notifications
  const {
    data: unreadNotificationsData,
    fetchNextPage: fetchNextUnreadPage,
    hasNextPage: hasNextUnreadPage,
    isFetchingNextPage: isFetchingNextUnreadPage,
    isLoading: isLoadingUnread,
    refetch: refetchUnread,
  } = useInfiniteNotifications({
    userId: userInfo?.id,
    isRead: false,
    pageSize: 10,
  });

  // Flatten notifications from pages
  const allNotifications = useMemo(() => {
    return allNotificationsData?.pages?.flatMap((page) => page.data) || [];
  }, [allNotificationsData]);

  const unreadNotifications = useMemo(() => {
    return unreadNotificationsData?.pages?.flatMap((page) => page.data) || [];
  }, [unreadNotificationsData]);

  const handleNotificationClick = async (notificationId: number) => {
    try {
      await readNotificationMutation.mutateAsync(notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleRefresh = () => {
    refetchAll();
    refetchUnread();
  };

  const renderNotificationList = (
    notifications: TNotification[],
    hasNextPage: boolean,
    fetchNextPage: () => void,
    isFetchingNextPage: boolean,
    isLoading: boolean
  ) => {
    if (isLoading) {
      return <NotificationSkeletonList count={5} />;
    }

    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 ">
          <CommonEmptyState />
        </div>
      );
    }

    return (
      <div>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <NotiCard
              notification={notification}
              onClick={handleNotificationClick}
            />
            {index + 1 !== notifications.length && (
              <hr className="border-t border-gray-200" />
            )}
          </React.Fragment>
        ))}

        {isFetchingNextPage && (
          <>
            <hr className="border-t border-gray-200" />
            <NotificationSkeletonList count={2} />
          </>
        )}

        {hasNextPage && (
          <div className="flex justify-center py-4">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              outlined={true}
              className="flex items-center gap-2"
            >
              {isFetchingNextPage ? (
                <>
                  <CommonLoading />
                </>
              ) : (
                "Tải thêm"
              )}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="text-xl text-primary-900">Thông báo</div>
        <Button
          onClick={handleRefresh}
          outlined={true}
          size="small"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">
            Tất cả ({allNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Chưa đọc ({unreadNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="overflow-y-auto mt-0">
          {renderNotificationList(
            allNotifications,
            hasNextAllPage,
            fetchNextAllPage,
            isFetchingNextAllPage,
            isLoadingAll
          )}
        </TabsContent>

        <TabsContent value="unread" className="overflow-y-auto mt-0">
          {renderNotificationList(
            unreadNotifications,
            hasNextUnreadPage,
            fetchNextUnreadPage,
            isFetchingNextUnreadPage,
            isLoadingUnread
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
