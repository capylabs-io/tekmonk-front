"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../common/button/Button";
import { Check } from "lucide-react";
import { CommonCard } from "../common/CommonCard";
import { cn } from "@/lib/utils";
import { Achievement, Mission } from "@/types/common-types";

// Mission/Achievement states:
// 1. In Progress: When data has currentProgress field
// 2. Done but not claimed: When data has isClaim=false
// 3. Done and claimed: When data has isClaim=true

enum CardState {
  IN_PROGRESS = "inProgress",
  COMPLETED = "completed",
  CLAIMED = "claimed",
}

type Props = {
  data: Mission | Achievement;
  onClick: (id: number) => void;
};

export const MissionCard = ({ data, onClick }: Props) => {
  // Determine the card state based on the data
  const getCardState = (): CardState => {
    if (data.currentProgress !== undefined) {
      return CardState.IN_PROGRESS;
    } else if (data.isClaim === false) {
      return CardState.COMPLETED;
    } else {
      return CardState.CLAIMED;
    }
  };

  const cardState = getCardState();

  const handleMissionOnClick = () => {
    // Only allow clicking if the mission is completed but not claimed
    if (cardState === CardState.COMPLETED && onClick) {
      if (!data.historyId) {
        return;
      }
      onClick(data.historyId);
    }
  };

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
          ({data.currentProgress}/{data.requiredQuantity})
        </div>
      );
    }
    return null;
  };

  const TextWithEllipsis = ({
    text,
    maxLines,
  }: {
    text: string;
    maxLines: number;
  }) => {
    return (
      <div
        className={`overflow-hidden text-ellipsis whitespace-pre-line ${
          maxLines ? `line-clamp-${maxLines}` : ""
        }`}
      >
        {text}
      </div>
    );
  };

  return (
    <CommonCard
      isActive={
        cardState === CardState.IN_PROGRESS || cardState === CardState.CLAIMED
      }
      className={cn(
        "flex flex-col items-center justify-center w-[200px] h-[250px] p-4 gap-2 !bg-white border-2 border-gray-20",
        " !cursor-default rounded-2xl"
      )}
    >
      <Image
        src={data.imageUrl || ""}
        alt={data.title || "mission"}
        width={100}
        height={100}
        className={cn(
          "object-contain h-1/2",
          cardState === CardState.IN_PROGRESS && "opacity-50 brightness-50"
        )}
      />

      <div className="flex flex-col items-center p-0 w-full  gap-0 flex-none self-stretch">
        <h3 className="text-SubheadSm font-medium text-center text-gray-95 w-full h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {data.title}
        </h3>

        <div className="text-BodyXs font-light text-gray-70 w-full h-8 text-center mt-1">
          <TextWithEllipsis text={data.description || ""} maxLines={2} />
        </div>

        {renderProgressIndicator()}
      </div>
      <div className="mt-2">{renderActionButton()}</div>
    </CommonCard>
  );
};
