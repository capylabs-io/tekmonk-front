"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { TooltipPosition, CardState } from "./types";
import { Achievement, Mission } from "@/types/common-types";
import MissionTooltipContent from "./MissionTooltipContent";

type MissionTooltipProps = {
  data: Mission | Achievement;
  cardState: CardState;
  plainTextDescription: string;
  tooltipPosition: TooltipPosition;
  tooltipRef: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const MissionTooltip = ({
  data,
  cardState,
  plainTextDescription,
  tooltipPosition,
  tooltipRef,
  onMouseEnter,
  onMouseLeave,
}: MissionTooltipProps) => {
  return (
    <div
      ref={tooltipRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "fixed z-[9999] bg-white rounded-lg shadow-xl border border-gray-200 w-[300px] overflow-hidden",
        "shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]",
        tooltipPosition.direction === "right"
          ? "animate-in fade-in-50 slide-in-from-right-5"
          : "animate-in fade-in-50 slide-in-from-left-5"
      )}
      style={{
        top: `${tooltipPosition.top}px`,
        left: tooltipPosition.left,
      }}
    >
      {/* Tooltip Arrow */}
      {tooltipPosition.direction === "right" ? (
        <div className="absolute left-[-6px] z-[9999] top-8 w-3 h-3 bg-white border-l border-t border-gray-200 transform rotate-[-45deg] shadow-[-2px_-2px_3px_rgba(0,0,0,0.05)]"></div>
      ) : (
        <div className="absolute right-[-6px] z-[9999] top-8 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-[-45deg] shadow-[2px_2px_3px_rgba(0,0,0,0.05)]"></div>
      )}

      <MissionTooltipContent
        data={data}
        cardState={cardState}
        plainTextDescription={plainTextDescription}
      />
    </div>
  );
};

export default MissionTooltip;
