"use client";

import { useQuery } from "@tanstack/react-query";
import { CommonCard } from "../common/CommonCard";
import { ReqGetAchievementHistory } from "@/requests/achievement";
import qs from "qs";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/store/UserStore";

export const AchievementProfile = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["achievement", "user"],
        filters: {
          user: {
            id: userInfo?.id,
          },
        },
        pagination: {
          page: 1,
          pageSize: 4,
        },
      });
      return await ReqGetAchievementHistory(queryString);
    },
    enabled: !!userInfo?.id,
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
  );
};
