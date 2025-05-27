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
};

export enum ShopItemEnum {
  VIRTUAL = "virtual",
  STATIONERY = "stationery",
}
