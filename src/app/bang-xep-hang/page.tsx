"use client";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { LeadeboardContent } from "@/components/leaderboard/LeadeboardContent";
import { UserRankingType } from "@/types/users";
import { useLoadingStore } from "@/store/LoadingStore";
import { AnimationLoading } from "@/components/lottie/AnimationLoading";

const Leaderboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showLoading, hideLoading] = useLoadingStore((state) => [state.show, state.hide])
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, []);
  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 text-6xl">
        <div className="flex flex-col items-center">
          <AnimationLoading className="w-[400px] h-[400px]" />
        </div>
      </div>
    )
  }
  return (
    <div className="w-full">
      <div className="text-SubheadLg text-gray-95 px-4">Bảng xếp hạng</div>
      <Tabs defaultValue="student" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="student">Top Học Bá</TabsTrigger>
          <TabsTrigger value="pointCollector">Top Tài Phú</TabsTrigger>
          <TabsTrigger value="creator">Đại sứ thân thiện</TabsTrigger>
          <TabsTrigger value="friendly">Thiên tài sáng tạo</TabsTrigger>
        </TabsList>
        <TabsContent value="student" className="overflow-y-auto mt-0">
          <LeadeboardContent type={UserRankingType.POINT} countText="ĐIỂM SỐ" />
        </TabsContent>
        <TabsContent value="pointCollector" className="overflow-y-auto mt-0">
          <LeadeboardContent
            type={UserRankingType.TOTAL_PRICE}
            countText="ĐIỂM THƯỞNG"
          />
        </TabsContent>
        <TabsContent value="creator" className="overflow-y-auto mt-0">
          <LeadeboardContent type={UserRankingType.POST} countText="BÀI VIẾT" />
        </TabsContent>
        <TabsContent value="friendly" className="overflow-y-auto mt-0">
          <LeadeboardContent type={UserRankingType.PROJECT} countText="DỰ ÁN" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// export default WithAuth(Leaderboard);
export default Leaderboard;
