"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/common/Progress";
import { ReqGetMissionInfo } from "@/requests/mission";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { Skeleton } from "@/components/ui/skeleton";
import { MissionDialog } from "../mission/MissionDialog";
import { useMissionHistory } from "@/hooks/use-mission-history";
import { useUserStore } from "@/store/UserStore";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { CommonEmptyState } from "../common/CommonEmptyState";
import { Mission } from "@/types/common-types";
const PAGE = 1;
const ITEM_PER_PAGE = 9;
export const MissionProgress = ({ id }: { id: number }) => {
  const router = useCustomRouter();
  const [showMissionDialog, setShowMissionDialog] = useState(false);
  const [page, setPage] = useState(PAGE);
  const [itemsPerPage, setItemsPerPage] = useState(ITEM_PER_PAGE);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const userId = userInfo?.id;
  const { data: missions, isLoading } = useQuery({
    queryKey: ["missions-history"],
    queryFn: async () => {
      const queryString = qs.stringify({
        page: 1,
        pageSize: 2,
        id: id,
        status: "all",
      });
      const res = await ReqGetMissionInfo(queryString);
      return res;
    },
    enabled: !!id,
  });

  const { data: missionHistory } = useMissionHistory({
    page,
    pageSize: itemsPerPage,
    id,
  });

  const handleShowMissionDialog = () => {
    if (userId === id) {
      router.push(ROUTE.MISSION);
      return;
    }
    setShowMissionDialog(true);
  };
  const progressPercentage = useCallback(
    (mission: Mission) => {
      if (mission) {
        if (mission.currentProgress !== undefined) {
          return (mission.currentProgress / mission.requiredQuantity) * 100;
        } else {
          return 100;
        }
      }
    },
    [missions]
  );

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center items-center gap-4 px-6 mx-4 border border-gray-100">
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
    <div className="px-6 mt-3">
      <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
        <div className="text-gray-95 text-SubheadLg">Nhiệm vụ</div>
        <div className="cursor-pointer" onClick={handleShowMissionDialog}>
          Xem thêm
        </div>
      </div>
      <div className="flex flex-col mt-4">
        {missions &&
          missions.data.length > 0 &&
          missions?.data.slice(0, 3).map((mission) => {
            return (
              <div
                key={mission.id}
                className="flex flex-row justify-center items-center gap-4 w-full h-[112px]"
              >
                <Image
                  src={
                    mission?.imageUrl == "" || mission?.imageUrl == null
                      ? "/image/app-logox2.png"
                      : mission?.imageUrl
                  }
                  alt="Mission"
                  width={100}
                  height={100}
                  className="object-contain flex-none border border-gray-200 rounded-md"
                />

                <div className="flex flex-col items-start gap-4 w-[576px] h-[76px] flex-grow">
                  <div className="flex flex-row justify-between items-end w-full h-12">
                    <div className="flex flex-col items-start">
                      <h3 className="w-[239px] h-6 text-SubheadMd text-gray-95">
                        {mission?.title || ""}
                      </h3>
                      <p className="w-[46px] h-6 font-[Kanit] font-light text-base leading-6 text-[#475467]">
                        #{mission?.id || ""}
                      </p>
                    </div>

                    <div className="flex flex-row items-start gap-[7px]">
                      <span className="text-SubheadSm text-gray-95">
                        Tiến trình
                      </span>
                      <span className="text-BodySm text-gray-60">
                        {mission?.currentProgress
                          ? `${mission?.currentProgress}/${mission?.requiredQuantity}`
                          : `${mission?.requiredQuantity}/${mission?.requiredQuantity}`}
                      </span>
                    </div>
                  </div>

                  <Progress value={progressPercentage(mission) || 0} />
                </div>
              </div>
            );
          })}
        {missions && missions.data.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <CommonEmptyState />
          </div>
        )}
      </div>
      <MissionDialog
        open={showMissionDialog}
        onOpenChange={setShowMissionDialog}
        data={missionHistory?.data || []}
        totalItems={missionHistory?.meta.pagination.total || 0}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setPage(page)}
        onItemsPerPageChange={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
      />
    </div>
  );
};

export default MissionProgress;
