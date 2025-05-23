import classNames from "classnames";
import { Check, Dot, MoreHorizontal } from "lucide-react";
import React from "react";
import { NotificationStatus, TNotification } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

type Props = {
  notification: TNotification;
  onClick?: (id: number) => void;
};

export const NotiCard = ({ notification, onClick }: Props) => {
  const { isRead, actor, type, createdAt, status } = notification;

  const handleClick = () => {
    // if already read, do nothing
    if (isRead) return;

    if (onClick && notification.id) {
      onClick(notification.id);
    }
  };

  const getNotificationTitle = () => {
    switch (type) {
      case "postCreated":
        return "đã tạo thành công bài viết của bạn";
      case "postAccepted":
        return "bài viết của bạn đã được chấp thuận";
      case "postDenied":
        return "bài viết của bạn đã bị từ chối";
      case "like":
        return "đã thích bài viết của bạn";
      case "comment":
        return "đã bình luận bài viết của bạn";
      case "achievement":
        return "bạn đã đạt được thành tích mới";
      case "mission":
        return "bạn có nhiệm vụ mới";
      case "exchangeItems":
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

  return (
    <div
      className={classNames(
        "pl-6 pr-4 py-4 flex justify-between items-center relative cursor-pointer hover:bg-[#f0f2f5] transition-colors",
        !isRead && ""
      )}
      onClick={handleClick}
    >
      <div className="flex gap-x-3 items-center">
        {!isRead && (
          <div
            className={`absolute left-2 h-2 w-2 rounded-full ${getStatusColor()}`}
          />
        )}
        <div
          className="h-12 w-12 bg-center bg-cover rounded-full bg-gray-200"
          style={{
            backgroundImage: actor?.imageURL
              ? `url(${actor.imageURL})`
              : "url('/image/user/profile-pic-2.png')",
          }}
        />
        <div className="text-base">
          <span className="ml-2">{getNotificationTitle()}</span>
        </div>
      </div>
      <div className="text-right flex items-center gap-x-2">
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
