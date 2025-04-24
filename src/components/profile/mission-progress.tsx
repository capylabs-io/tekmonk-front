"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/common/Progress";
import { ReqGetMissionInfo } from "@/requests/mission";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { Skeleton } from "@/components/ui/skeleton";

export const MissionProgress = ({ id }: { id: number }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { data: missions, isLoading } = useQuery({
    queryKey: ["missions-history"],
    queryFn: async () => {
      const queryString = qs.stringify({
        page: 1,
        pageSize: 1,
        id: id,
      });
      const res = await ReqGetMissionInfo(queryString);
      return res;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (missions?.data && missions.data.length > 0) {
      const missionData = missions.data[0];
      if (missionData.currentProgress !== undefined) {
        setProgressPercentage(
          (missionData.currentProgress / missionData.requiredQuantity) * 100
        );
      } else {
        setProgressPercentage(100);
      }
    }
  }, [missions]);

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center gap-4 w-full h-[112px] rounded-lg">
        <Skeleton className="w-[80px] h-[80px] rounded-md flex-none" />
        <div className="flex flex-col items-start gap-4 w-[576px] h-[76px] flex-grow">
          <div className="flex flex-row justify-between items-end w-full h-12">
            <div className="flex flex-col items-start gap-2">
              <Skeleton className="w-[200px] h-6" />
              <Skeleton className="w-[46px] h-6" />
            </div>
            <div className="flex flex-row items-start gap-[7px]">
              <Skeleton className="w-[80px] h-5" />
            </div>
          </div>
          <Skeleton className="w-full h-3 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center gap-4 w-full h-[112px]">
      <Image
        src={missions?.data[0]?.imageUrl || ""}
        alt="Mission"
        width={80}
        height={80}
        className="object-contain flex-none"
      />

      <div className="flex flex-col items-start gap-4 w-[576px] h-[76px] flex-grow">
        <div className="flex flex-row justify-between items-end w-full h-12">
          <div className="flex flex-col items-start">
            <h3 className="w-[239px] h-6 text-SubheadMd text-gray-95">
              {missions?.data[0]?.title || ""}
            </h3>
            <p className="w-[46px] h-6 font-[Kanit] font-light text-base leading-6 text-[#475467]">
              #{missions?.data[0]?.id || ""}
            </p>
          </div>

          <div className="flex flex-row items-start gap-[7px]">
            <span className="text-SubheadSm text-gray-95">Tiến trình</span>
            <span className="text-BodySm text-gray-60">
              {missions?.data[0]?.currentProgress
                ? `${missions?.data[0]?.currentProgress}/${missions?.data[0]?.requiredQuantity}`
                : `${missions?.data[0]?.requiredQuantity}/${missions?.data[0]?.requiredQuantity}`}
            </span>
          </div>
        </div>

        <Progress value={progressPercentage} />
      </div>
    </div>
  );
};

export default MissionProgress;
