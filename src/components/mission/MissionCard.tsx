"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { CommonCard } from "../common/CommonCard";
import { cn } from "@/lib/utils";
import { Achievement, Mission } from "@/types/common-types";
import { handleConfettiClick } from "@/contants/confetti";
import { CardState } from "./types";
import { getCardState, extractTextFromHtml } from "./utils";
import MissionTooltip from "./MissionTooltip";
import MissionCardContent from "./MissionCardContent";
import { TooltipProvider } from "@radix-ui/react-tooltip";

// Mission/Achievement states:
// 1. In Progress: When data has currentProgress field
// 2. Done but not claimed: When data has isClaim=false
// 3. Done and claimed: When data has isClaim=true

type Props = {
  data: Mission | Achievement;
  onClick: (id: number) => void;
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
      className={cn(
        "overflow-hidden text-ellipsis whitespace-pre-line",
        maxLines ? `line-clamp-${maxLines}` : ""
      )}
    >
      {text}
    </div>
  );
};

export const MissionCard = ({ data, onClick }: Props) => {
  // State for tooltip visibility and position
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: "210px",
    direction: "right" as "right" | "left",
  });
  const [plainTextDescription, setPlainTextDescription] = useState("");
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get the card state
  const cardState = getCardState(data);

  // Extract plain text from HTML description
  useEffect(() => {
    if (data.description && /<\/?[a-z][\s\S]*>/i.test(data.description)) {
      setPlainTextDescription(extractTextFromHtml(data.description));
    } else {
      setPlainTextDescription(data.description || "");
    }
  }, [data.description]);

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

  // Handle tooltip visibility
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Function to handle tooltip mouse enter to prevent hiding
  const handleTooltipMouseEnter = () => {
    setShowTooltip(true);
  };

  // Function to handle tooltip mouse leave
  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  // Handle clicking outside the tooltip to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef, cardRef]);

  // Update tooltip position when it becomes visible
  useLayoutEffect(() => {
    if (showTooltip && cardRef.current) {
      const updatePosition = () => {
        if (!cardRef.current) return;

        const cardRect = cardRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // Check if there's enough space on the right side
        const spaceOnRight = viewportWidth - cardRect.right;
        const tooltipWidth = 320; // Approximate width including margins

        // Get absolute position for the fixed positioned tooltip
        const absoluteTop = cardRect.top + window.scrollY;

        if (spaceOnRight >= tooltipWidth) {
          // Position tooltip to the right
          setTooltipPosition({
            top: absoluteTop,
            left: `${cardRect.right + 15}px`, // Add 15px gap
            direction: "right",
          });
        } else {
          // Position tooltip to the left
          setTooltipPosition({
            top: absoluteTop,
            left: `${cardRect.left - tooltipWidth - 15}px`, // Subtract tooltip width and 15px gap
            direction: "left",
          });
        }
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [showTooltip]);

  // State to track if we're in the browser environment for portals
  const [isBrowser, setIsBrowser] = useState(false);

  // Set isBrowser to true when component mounts
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <TooltipProvider>
      <div ref={containerRef} className="relative group isolate">
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="transition-transform duration-300 hover:scale-[1.02]"
        >
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
              cardState === CardState.COMPLETED
                ? handleMissionOnClick
                : undefined
            }
          >
            <MissionCardContent
              data={data}
              cardState={cardState}
              handleMissionOnClick={handleMissionOnClick}
            />
          </CommonCard>
        </div>

        {/* Custom Tooltip */}
        {showTooltip &&
          isBrowser &&
          createPortal(
            <MissionTooltip
              data={data}
              cardState={cardState}
              plainTextDescription={plainTextDescription}
              tooltipPosition={tooltipPosition}
              tooltipRef={tooltipRef}
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
            />,
            document.body
          )}
      </div>
    </TooltipProvider>
  );
};

export default MissionCard;
