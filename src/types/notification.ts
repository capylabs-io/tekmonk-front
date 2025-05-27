import { User } from "./common-types";
import { PostType } from "./posts";

export enum NotificationType {
  POST_CREATED = "postCreated",
  POST_DENIED = "postDenied",
  POST_ACCEPTED = "postAccepted",
  EXCHANGE_ITEMS = "exchangeItems",
  ACHIEVEMENT = "achievement",
  MISSION = "mission",
  LIKE = "like",
  COMMENT = "comment",
}

export enum NotificationStatus {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type TNotification = {
  id: number;
  user?: User;
  count: number;
  isRead: boolean;
  actor?: User;
  type: NotificationType;
  status: NotificationStatus;
  post?: PostType;
  createdAt: string;
  updatedAt: string;
};
