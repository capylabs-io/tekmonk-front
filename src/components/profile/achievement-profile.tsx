"use client";

import { useQuery } from "@tanstack/react-query";
import { CommonCard } from "../common/CommonCard";
import { ReqGetAchievementHistory } from "@/requests/achievement";
import qs from "qs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useAchievementHistory } from "@/hooks/use-achievement-history";
import { MissionDialog } from "../mission/MissionDialog";
import { AchievementHistoryDialog } from "../mission/achievement-history-dialog";
import { useState } from "react";

const TOTAL_ACHIEVEMENTS = 9;

export const AchievementProfile = ({ id }: { id: number }) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(TOTAL_ACHIEVEMENTS);
  const [openAchievementHistoryDialog, setOpenAchievementHistoryDialog] =
    useState(false);
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements", id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["achievement", "user"],
        filters: {
          user: {
            id: id,
          },
        },
        pagination: {
          page: 1,
          pageSize: 2,
        },
      });
      return await ReqGetAchievementHistory(queryString);
    },
    enabled: !!id,
  });

  const { data: AchievementHistory } = useAchievementHistory({
    page: page,
    pageSize: itemsPerPage,
    id,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex flex-col items-center">
            <Skeleton className="w-[100px] h-[100px] rounded-full border border-gray-200" />
            <Skeleton className="w-[80px] h-5 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (!achievements?.data || achievements.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          Chưa có thành tích nào
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Hoàn thành nhiệm vụ và tiếp tục học các khóa học để nhận thành tích
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 mt-3 mb-8">
      <div className="flex w-full justify-between items-center text-SubheadSm text-primary-950">
        <div className="text-gray-95 text-SubheadLg">Thành tựu</div>
        <div
          className="cursor-pointer"
          onClick={() => setOpenAchievementHistoryDialog(true)}
        >
          Xem thêm
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {achievements.data.map((achievement) => (
            <CommonCard
              key={achievement.id}
              className="flex flex-col items-center p-4 w-[160px] h-[140px]"
            >
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src={achievement.achievement?.imageUrl || ""}
                  alt={achievement.achievement?.title || "Achievement"}
                  width={80}
                  height={80}
                  className="object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = "/image/placeholder.png";
                  }}
                />
              </div>
              <h3 className="text-center mt-2 text-gray-95 text-SubheadXs truncate w-full overflow-hidden whitespace-nowrap">
                {achievement.achievement?.title || "Chứng chỉ"}
              </h3>
            </CommonCard>
          ))}
        </div>
      </div>
      <AchievementHistoryDialog
        open={openAchievementHistoryDialog}
        onOpenChange={setOpenAchievementHistoryDialog}
        data={AchievementHistory?.data || []}
        totalItems={AchievementHistory?.meta.pagination.total || 0}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setPage(page)}
        onItemsPerPageChange={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
      />
    </div>
  );
};
