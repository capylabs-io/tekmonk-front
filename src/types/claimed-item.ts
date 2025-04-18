import { User } from "./common-types";

export type ClaimedItem = {
  id: number;
  code?: string;
  itemCode?: string;
  quantity?: number;
  user?: User;
  status: ClaimedItemStatus;
  createdAt: string;
  updatedAt: string;
};

export enum ClaimedItemStatus {
  PENDING = "pending",
  CLAIMED = "claimed",
}
