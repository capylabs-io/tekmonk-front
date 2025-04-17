"use client";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "../common/button/Button";
import { cn } from "@/lib/utils";
import { Achievement, Mission } from "@/types/common-types";
import { CardState } from "./types";
import TextWithEllipsis from "./TextWithEllipsis";

type MissionCardContentProps = {
  data: Mission | Achievement;
  cardState: CardState;
  handleMissionOnClick: () => void;
};

export const MissionCardContent = ({
  data,
  cardState,
  handleMissionOnClick,
}: MissionCardContentProps) => {
  // Render the appropriate button based on the state
  const renderActionButton = () => {
    switch (cardState) {
      case CardState.IN_PROGRESS:
        return (
          <Button
            urlIcon="/image/home/coin.png"
            className="flex flex-row items-center justify-center py-[6px] px-[12px] gap-1 h-7 !bg-white !border-2 !border-gray-30 !text-primary-900 cursor-default rounded-md"
          >
            <span className="text-SubheadXs font-medium">{data.reward}</span>
          </Button>
        );
      case CardState.COMPLETED:
        return (
          <Button
            urlIcon="/image/home/coin.png"
            className="flex flex-row items-center justify-center py-[6px] px-[12px] gap-1 h-7 !bg-primary-60 !border-2 !border-primary-70 shadow-[0px_2px_0px_#9A1571] rounded-md"
            onClick={handleMissionOnClick}
          >
            <span className="text-SubheadXs font-medium text-white">
              {data.reward}
            </span>
          </Button>
        );
      case CardState.CLAIMED:
        return (
          <Button className="flex flex-row items-center justify-center py-[6px] px-[12px] gap-1 h-7 !bg-green-50 !text-green-400 cursor-default rounded-md">
            <Check size={16} className="mr-1" />{" "}
            <span className="text-SubheadXs font-medium">Đã nhận</span>
          </Button>
        );
    }
  };

  // Optional: Render progress indicator for in-progress missions
  const renderProgressIndicator = () => {
    if (
      cardState === CardState.IN_PROGRESS &&
      data.currentProgress !== undefined
    ) {
      return (
        <div className="text-BodyXs text-gray-70">
          {data.type === "Manual"
            ? "0/1"
            : `${data.currentProgress}/${data.requiredQuantity}`}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Add a subtle highlight overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/0 to-primary-50/0 hover:from-primary-50/10 hover:to-primary-50/5 rounded-2xl transition-colors duration-300 pointer-events-none"></div>

      <Image
        src={data.imageUrl || ""}
        alt={data.title || "mission"}
        width={100}
        height={100}
        className={cn(
          "object-contain h-1/2 relative z-10",
          cardState === CardState.IN_PROGRESS && "opacity-50 brightness-50"
        )}
      />

      <div className="flex flex-col items-center p-0 w-full gap-0 flex-none self-stretch relative z-10">
        <h3 className="text-SubheadSm font-medium text-center text-gray-95 w-full h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {data.title}
        </h3>

        <div className="mission-description-container text-BodyXs font-light text-gray-70 w-full h-8 text-center mt-1">
          <TextWithEllipsis text={data.description || ""} maxLines={2} />
        </div>

        {renderProgressIndicator()}
      </div>
      <div className="mt-2 relative z-10">{renderActionButton()}</div>
    </>
  );
};

export default MissionCardContent;
