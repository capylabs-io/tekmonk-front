"use client";
import React from "react";
import { CardState } from "./types";

type MissionStatusBadgeProps = {
  cardState: CardState;
};

export const MissionStatusBadge = ({ cardState }: MissionStatusBadgeProps) => {
  return (
    <div className="absolute top-3 right-3">
      {cardState === CardState.IN_PROGRESS && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          In Progress
        </span>
      )}
      {cardState === CardState.COMPLETED && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
          Completed
        </span>
      )}
      {cardState === CardState.CLAIMED && (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Claimed
        </span>
      )}
    </div>
  );
};

export default MissionStatusBadge;
