"use client";
import { CommonCard } from "../common/CommonCard";
import { cn } from "@/lib/utils";
import { Achievement, Mission } from "@/types/common-types";
import { handleConfettiClick } from "@/contants/confetti";
import { CardState } from "./types";
import { getCardState } from "./utils";
import MissionCardContent from "./MissionCardContent";

type Props = {
  data: Mission | Achievement;
  onClick: (id: number) => void;
};

export const MissionCard = ({ data, onClick }: Props) => {
  // Get the card state
  const cardState = getCardState(data);
  const handleMissionOnClick = () => {
    handleConfettiClick();
    // Only allow clicking if the mission is completed but not claimed
    if (cardState === CardState.COMPLETED && onClick) {
      if (!data.historyId) {
        return;
      }
      onClick(data.historyId);
    }
  };

  return (
    <div className="relative group isolate">
      <div className="transition-transform duration-300 hover:scale-[1.02]">
        <CommonCard
          isActive={
            cardState === CardState.IN_PROGRESS ||
            cardState === CardState.CLAIMED
          }
          className={cn(
            "flex flex-col items-center justify-center w-[200px] h-[250px] p-4 gap-2 !bg-white border-2 border-gray-20",
            "!cursor-default rounded-2xl transition-all duration-200",
            cardState === CardState.COMPLETED &&
              "hover:border-primary-60 cursor-pointer hover:shadow-md"
          )}
          onClick={
            cardState === CardState.COMPLETED ? handleMissionOnClick : undefined
          }
        >
          <MissionCardContent
            data={data}
            cardState={cardState}
            handleMissionOnClick={handleMissionOnClick}
          />
        </CommonCard>
      </div>
    </div>
  );
};

export default MissionCard;
