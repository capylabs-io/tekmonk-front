"use client";
import React from "react";
import { TNotification, NotificationType } from "@/types/notification";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  formatNotificationText,
  getNotificationIcon,
  truncateText,
} from "@/utils/notificationHelpers";

type LikeCommentNotificationProps = {
  notification: TNotification;
  onClick?: (id: number) => void;
};

export const LikeCommentNotification = ({
  notification,
  onClick,
}: LikeCommentNotificationProps) => {
  const { id, isRead, actor, type, createdAt, count } = notification;

  const handleClick = () => {
    if (isRead) return;
    if (onClick && id) {
      onClick(id);
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
      className={`pl-6 pr-4 py-4 flex justify-between items-center relative cursor-pointer hover:bg-[#f0f2f5] transition-colors ${
        !isRead ? "bg-blue-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex gap-x-3 items-center flex-1">
        {!isRead && (
          <div className="absolute left-2 h-2 w-2 rounded-full bg-blue-500" />
        )}

        <div className="relative flex-shrink-0">
          <div
            className="h-12 w-12 bg-center bg-cover rounded-full bg-gray-200"
            style={{
              backgroundImage: actor?.imageURL
                ? `url(${actor.imageURL})`
                : "url('/image/user/profile-pic-2.png')",
            }}
          />
          {/* Icon overlay for notification type */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-sm">{getNotificationIcon(type)}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-base text-gray-900 font-medium">
            {formatNotificationText(type, actor, count)}
          </div>
          {notification.post && notification.post.content && (
            <div
              className="text-sm text-gray-500 mt-1 overflow-hidden whitespace-nowrap text-ellipsis"
              dangerouslySetInnerHTML={{
                __html: `${truncateText(notification.post.content)}`,
              }}
            />
          )}
        </div>
      </div>

      <div className="text-right flex items-center gap-x-2 flex-shrink-0">
        <div className="text-sm text-gray-500">{formatDate(createdAt)}</div>
        {isRead && <div className="w-2 h-2 rounded-full bg-green-500" />}
      </div>
    </div>
  );
};
