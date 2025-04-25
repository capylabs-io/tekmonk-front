import { Mission, User } from "./common-types";

export type MissionHistory = {
  id: number;
  user?: User;
  mission?: Mission;
  isClaim: boolean;
  createdAt: string;
  updatedAt: string;
};
