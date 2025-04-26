"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Dela_Gothic_One } from "next/font/google";
import { LeadeboardContent } from "@/components/leaderboard/LeadeboardContent";

const Leaderboard: React.FC = () => {
  return (
    <div className="w-full">
      <div className="text-SubheadLg text-gray-95 px-4">Bảng xếp hạng</div>
      <Tabs defaultValue="student" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="student">Top Học Bá</TabsTrigger>
          <TabsTrigger value="pointCollector">Top Tài Phú</TabsTrigger>
          <TabsTrigger value="creator">Thiên tài sáng tạo</TabsTrigger>
          <TabsTrigger value="friendly">Đại sứ thân thiện</TabsTrigger>
        </TabsList>
        <TabsContent value="student" className="overflow-y-auto mt-0">
          <LeadeboardContent />
        </TabsContent>
        <TabsContent
          value="pointCollector"
          className="overflow-y-auto mt-0"
        ></TabsContent>
        <TabsContent
          value="creator"
          className="overflow-y-auto mt-0"
        ></TabsContent>
        <TabsContent
          value="friendly"
          className="overflow-y-auto mt-0"
        ></TabsContent>
      </Tabs>
    </div>
  );
};

// export default WithAuth(Leaderboard);
export default Leaderboard;
