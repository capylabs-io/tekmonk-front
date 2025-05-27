import { User } from "./common-types";
import { ShopItem } from "./shop";

export type ClaimedItem = {
  id: number;
  code?: string;
  itemCode?: string;
  quantity?: number;
  user?: User;
  status: ClaimedItemStatus;
  shopItem: ShopItem;
  createdAt: string;
  updatedAt: string;
};

export enum ClaimedItemStatus {
  PENDING = "pending",
  CLAIMED = "claimed",
}
