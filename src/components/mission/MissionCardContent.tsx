"use client";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "../common/button/Button";
import { cn } from "@/lib/utils";
import { Achievement, Mission } from "@/types/common-types";
import { CardState } from "./types";
import TextWithEllipsis from "./TextWithEllipsis";
import { CommonButton } from "../common/button/CommonButton";

type MissionCardContentProps = {
  data: Mission | Achievement;
  cardState: CardState;
  handleMissionOnClick: () => void;
  isShowButtonClaim?: boolean;
};

export const MissionCardContent = ({
  data,
  cardState,
  handleMissionOnClick,
  isShowButtonClaim = true,
}: MissionCardContentProps) => {
  // Render the appropriate button based on the state
  const renderActionButton = () => {
    if (!isShowButtonClaim) {
      return null;
    }
    switch (cardState) {
      case CardState.IN_PROGRESS:
        return (
          <CommonButton
            className="flex flex-row items-center justify-center gap-1 h-7"
            onClick={handleMissionOnClick}
            disabled={true}
          >
            <span className="text-SubheadXs font-medium text-white">
              Nhận thưởng
            </span>
          </CommonButton>
        );
      case CardState.COMPLETED:
        return (
          <CommonButton
            className="flex flex-row items-center justify-center gap-1 h-7"
            onClick={handleMissionOnClick}
          >
            <span className="text-SubheadXs font-medium text-white">
              Nhận thưởng
            </span>
          </CommonButton>
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
      return data.type === "Manual"
        ? "0/1"
        : `${data.currentProgress}/${data.requiredQuantity}`;
    }
    return undefined;
  };

  return (
    <>
      {/* Add a subtle highlight overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/0 to-primary-50/0 hover:from-primary-50/10 hover:to-primary-50/5 rounded-2xl transition-colors duration-300 pointer-events-none"></div>

      <Image
        src={data.imageUrl || ""}
        alt={data.title || "mission"}
        width={80}
        height={80}
        className={cn(
          "object-contain h-1/2 relative z-10",
          cardState === CardState.IN_PROGRESS && "opacity-50 brightness-50"
        )}
      />

      <div className="flex flex-col items-center p-0 w-full gap-0 flex-none self-stretch relative z-10">
        <h3 className="text-SubheadSm font-medium text-center text-gray-95 w-full h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {data.title}
        </h3>

        <div className="text-BodyXs font-light text-gray-70 w-full h-8 text-center mt-1">
          <TextWithEllipsis
            text={data.description || ""}
            maxLines={2}
            secondText={renderProgressIndicator()}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <Image
              src="/image/home/coin.png"
              alt="Point"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="text-SubheadXs text-gray-95">{data.reward}</span>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/image/PointIcon.png"
              alt="Point"
              width={16}
              height={16}
              className="object-contain"
            />
            <span className="text-SubheadXs text-gray-95">{data.points}</span>
          </div>
        </div>
      </div>
      <div className="mt-2 relative z-10">{renderActionButton()}</div>
    </>
  );
};

export default MissionCardContent;
