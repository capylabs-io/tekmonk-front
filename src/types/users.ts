import { User } from "./common-types";

export type UserStatProps = {
  missions: number;
  points: number;
  achievements: number;
  isVerifiedPost: number;
  certificates: number;
  items: number;
};

export type UserRankingProps = {
  user: User;
  count: number;
};

export enum UserRankingType {
  TOTAL_PRICE = "totalPrice",
  POINT = "point",
  POST = "post",
  PROJECT = "project",
}
