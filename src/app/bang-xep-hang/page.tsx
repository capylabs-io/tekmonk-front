"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { LeadeboardContent } from "@/components/leaderboard/LeadeboardContent";
import { UserRankingType } from "@/types/users";

const Leaderboard: React.FC = () => {
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
