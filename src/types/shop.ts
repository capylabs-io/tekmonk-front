import { Category } from "./Category";

export type ShopItem = {
  id: number;
  name?: string;
  image?: string;
  price?: number;
  description?: string;
  category: Category;
  type?: ShopItemEnum;
  quantity: number;
  isHidden?: boolean;
};

export enum ShopItemEnum {
  VIRTUAL = "virtual",
  STATIONERY = "stationery",
  DEFAULT = "default",
}
