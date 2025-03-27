"use client";
import React from "react";
import Image from "next/image";
import { CardState } from "./types";
import { Achievement, Mission } from "@/types/common-types";
import MissionStatusBadge from "./MissionStatusBadge";

type MissionTooltipContentProps = {
  data: Mission | Achievement;
  cardState: CardState;
  plainTextDescription: string;
};

export const MissionTooltipContent = ({
  data,
  cardState,
  plainTextDescription,
}: MissionTooltipContentProps) => {
  return (
    <div className="p-4 space-y-4">
      {/* Image */}
      <div className="bg-gray-50 p-3 rounded-md flex justify-center">
        <Image
          src={data.imageUrl || ""}
          alt={data.title || "mission"}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Status Badge */}
      <MissionStatusBadge cardState={cardState} />

      {/* Title */}
      <h3 className="font-medium text-lg text-gray-900">{data.title}</h3>

      {/* Description */}
      <div className="text-sm text-gray-700 max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
        <p>{plainTextDescription}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-2"></div>

      {/* Progress (if available) */}
      {data.currentProgress !== undefined && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress:</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    (data.currentProgress / data.requiredQuantity) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-gray-700 font-medium">
              {data.currentProgress}/{data.requiredQuantity}
            </span>
          </div>
        </div>
      )}

      {/* Reward */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Reward:</span>
        <div className="flex items-center gap-1 text-primary-700 font-medium">
          <Image
            src="/image/home/coin.png"
            alt="reward"
            width={18}
            height={18}
            className="object-contain"
          />
          <span>{data.reward}</span>
        </div>
      </div>

      {/* Call to action for completed missions */}
      {cardState === CardState.COMPLETED && (
        <div className="mt-2 text-center py-2 px-3 bg-primary-50 rounded-md">
          <div className="text-sm text-primary-700 font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-ping"></span>
            Click on the card to claim your reward!
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionTooltipContent;
