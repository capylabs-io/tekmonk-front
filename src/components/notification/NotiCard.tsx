"use client";
import classNames from "classnames";
import { Check } from "lucide-react";
import {
  NotificationStatus,
  NotificationType,
  TNotification,
} from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
// import { LikeCommentNotification } from "./LikeCommentNotification";

type Props = {
  notification: TNotification;
  onClick?: (id: number) => void;
};

export const NotiCard = ({ notification, onClick }: Props) => {
  const { isRead, actor, type, createdAt, status, count } = notification;
  console.log("type", type);

  const handleClick = () => {
    // if already read, do nothing
    if (isRead) return;

    if (onClick && notification.id) {
      onClick(notification.id);
    }
  };

  const getNotificationTitle = () => {
    const actorName = actor?.username || "Người dùng";

    switch (type) {
      case NotificationType.LIKE:
        if (count <= 1) {
          return `${actorName} đã thích bài viết của bạn`;
        } else {
          const otherCount = count - 1;
          return `${actorName} và ${otherCount} người khác đã thích bài viết của bạn`;
        }
      case NotificationType.COMMENT:
        return `${actorName} đã bình luận bài viết của bạn`;
      case NotificationType.POST_CREATED:
        return "đã tạo thành công bài viết của bạn";
      case NotificationType.POST_ACCEPTED:
        return "bài viết của bạn đã được chấp thuận";
      case NotificationType.POST_DENIED:
        return "bài viết của bạn đã bị từ chối";
      case NotificationType.ACHIEVEMENT:
        return "bạn đã đạt được thành tích mới";
      case NotificationType.MISSION:
        return "bạn đã hoàn thành nhiệm vụ mới";
      case NotificationType.EXCHANGE_ITEMS:
        return "giao dịch đã được xử lý";
      default:
        return "có thông báo mới";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return "bg-green-500";
      case NotificationStatus.WARNING:
        return "bg-yellow-500";
      case NotificationStatus.ERROR:
        return "bg-red-500";
      case NotificationStatus.INFO:
      default:
        return "bg-blue-500";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: vi,
      });
    } catch {
      return dateString;
    }
  };

  const getNotificationIcon = () => {
    switch (type) {
      case NotificationType.LIKE:
        return "❤️";
      case NotificationType.COMMENT:
        return "💬";
      default:
        return null;
    }
  };

  const truncateText = (text: string, maxLength: number = 50): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const shouldShowIcon =
    type === NotificationType.LIKE || type === NotificationType.COMMENT;

  return (
    <div
      className={classNames(
        "pl-6 pr-4 py-4 flex justify-between items-center relative cursor-pointer hover:bg-[#f0f2f5] transition-colors",
        !isRead && "bg-blue-50"
      )}
      onClick={handleClick}
    >
      <div className="flex gap-x-3 items-center flex-1">
        {!isRead && (
          <div
            className={`absolute left-2 h-2 w-2 rounded-full ${
              type === NotificationType.LIKE ||
              type === NotificationType.COMMENT
                ? "bg-blue-500"
                : getStatusColor()
            }`}
          />
        )}

        <div className={`relative flex-shrink-0 ${shouldShowIcon ? "" : ""}`}>
          <div
            className="h-12 w-12 bg-center bg-cover rounded-full bg-gray-200"
            style={{
              backgroundImage: actor?.imageURL
                ? `url(${actor.imageURL})`
                : "url('/image/user/profile-pic-2.png')",
            }}
          />
          {shouldShowIcon && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-sm">{getNotificationIcon()}</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-base text-gray-900 font-medium">
            {getNotificationTitle()}
          </div>
        </div>
      </div>

      <div className="text-right flex items-center gap-x-2 flex-shrink-0">
        <div className="text-bodySm text-gray-500">{formatDate(createdAt)}</div>
        {!isRead ? (
          <div className="w-5 h-5" />
        ) : (
          <Check className="w-5 h-5" color="green" />
        )}
      </div>
    </div>
  );
};
