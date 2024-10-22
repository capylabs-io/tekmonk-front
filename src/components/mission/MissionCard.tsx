"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../common/Button";
import { Check } from "lucide-react";

type Props = {
  missionName: string;
  missionDescription: string;
  imageUrl: string;
  score: string;
  status: string;
  onClick?: () => void;
};
export const MissionCard = ({
  missionName,
  missionDescription,
  imageUrl,
  score,
  status,
  onClick,
}: Props) => {
  const [missionStatus, setMissionStatus] = useState("inprogress");
  const handleMissionOnClick = () => {
    setMissionStatus((prev) =>
      prev === "inprogress"
        ? "complete"
        : prev === "complete"
        ? "claimded"
        : "inprogress"
    );
  };
  return (
    <div className="flex flex-col items-center justify-center w-[200px] text-center">
      <Image
        src={imageUrl || ""}
        alt="mission"
        width={120}
        height={120}
        className="mt-5"
      />

      <span className="text-xs mt-2 text-gray-800">{missionName}</span>
      <span className="text-xs mt-2 text-gray-600">{missionDescription}</span>

      {missionStatus === "inprogress" ? (
        <Button
          onClick={handleMissionOnClick}
          size="small"
          urlIcon="/image/home/coin.png"
          outlined
          className="mt-2 text-sm"
        >
          {score}
        </Button>
      ) : missionStatus === "complete" ? (
        <Button onClick={handleMissionOnClick} className="mt-2 text-xs">
          Nhận thưởng
        </Button>
      ) : (
        <Button
          onClick={handleMissionOnClick}
          className="!bg-green-50 !text-green-400 mt-2 text-xs"
        >
          <Check size={14} className="mr-2" /> Đã nhận
        </Button>
      )}
    </div>
  );
};
