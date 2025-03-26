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
            className="mt-2 text-SubheadXs !py-[6px] !px-[12px] !font-normal !border !border-gray-30 !bg-white !text-primary-900 cursor-default"
          >
            {data.reward}
          </Button>
        );
      case CardState.COMPLETED:
        return (
          <Button
            urlIcon="/image/home/coin.png"
            style={{
              boxShadow: "0px 2px 0px #9a1595",
            }}
            onClick={handleMissionOnClick}
            className="mt-2 text-SubheadXs border-2 border-primary-70 !py-[6px] !px-[12px] !font-normal"
          >
            {data.reward}
          </Button>
        );
      case CardState.CLAIMED:
        return (
          <Button className="!bg-green-50 !text-green-400 mt-2 !text-SubheadXs !font-normal !py-[6px] !px-[12px] cursor-default">
            <Check size={18} className="mr-2" fontWeight={800} /> Đã nhận
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

  return (
    <CommonCard
      isActive={cardState !== CardState.CLAIMED}
      className={cn(
        "flex flex-col items-center justify-center w-[200px] text-center p-4 !bg-white border-2",
        cardState === CardState.CLAIMED
          ? "border-green-100"
          : cardState === CardState.COMPLETED
          ? "border-primary-200"
          : "border-gray-30",
        "place-self-stretch !cursor-default"
      )}
    >
      <Image
        src={data.imageUrl || ""}
        alt={data.title || "mission"}
        width={120}
        height={120}
      />

      <span className="text-SubheadSm mt-2 text-gray-95">{data.title}</span>
      <span className="text-BodyXs text-gray-70">
        {data.description}
        {renderProgressIndicator()}
      </span>

      {renderActionButton()}
    </CommonCard>
  );
};
