import { NotificationType } from "@/types/notification";
import { User } from "@/types/common-types";

export const formatNotificationText = (
  type: NotificationType,
  actor: User | undefined,
  count: number
): string => {
  if (!actor) return "";

  const actorName = actor.username || "Người dùng";

  if (count <= 1) {
    // Single user action
    switch (type) {
      case NotificationType.LIKE:
        return `${actorName} đã thích bài viết của bạn`;
      case NotificationType.COMMENT:
        return `${actorName} đã bình luận bài viết của bạn`;
      default:
        return `${actorName} đã tương tác với bài viết của bạn`;
    }
  } else {
    // Multiple users action
    const otherCount = count - 1;
    switch (type) {
      case NotificationType.LIKE:
        return `${actorName} và ${otherCount} người khác đã thích bài viết của bạn`;
      case NotificationType.COMMENT:
        return `${actorName} và ${otherCount} người khác đã bình luận bài viết của bạn`;
      default:
        return `${actorName} và ${otherCount} người khác đã tương tác với bài viết của bạn`;
    }
  }
};

export const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case NotificationType.LIKE:
      return "❤️";
    case NotificationType.COMMENT:
      return "💬";
    case NotificationType.POST_CREATED:
      return "📝";
    case NotificationType.POST_ACCEPTED:
      return "✅";
    case NotificationType.POST_DENIED:
      return "❌";
    case NotificationType.ACHIEVEMENT:
      return "🏆";
    case NotificationType.MISSION:
      return "🎯";
    case NotificationType.EXCHANGE_ITEMS:
      return "🔄";
    default:
      return "👍";
  }
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
