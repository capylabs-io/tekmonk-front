import { Achievement, User } from "./common-types";

export type AchievementHistory = {
  id: number;
  user?: User;
  achievement?: Achievement;
  createdAt: string;
  updatedAt: string;
};
