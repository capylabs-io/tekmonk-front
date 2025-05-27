export enum CardState {
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  CLAIMED = "claimed",
}

export type TooltipPosition = {
  top: number;
  left: string;
  direction: "right" | "left";
};
