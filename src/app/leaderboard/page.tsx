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
import WithAuth from "@/components/hoc/WithAuth";

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});

const Leaderboard: React.FC = () => {
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Bảng xếp hạng</div>
      <Tabs defaultValue="pointCollector" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="pointCollector">Tài Phú</TabsTrigger>
          <TabsTrigger value="richMan">Đại Gia</TabsTrigger>
          <TabsTrigger value="student">Học Bá</TabsTrigger>
          <TabsTrigger value="creator">Thiên tài sáng tạo</TabsTrigger>
        </TabsList>
        <TabsContent value="pointCollector" className="overflow-y-auto mt-0">
          <LeadeboardContent />
        </TabsContent>
        <TabsContent
          value="richMan"
          className="overflow-y-auto mt-0"
        ></TabsContent>
        <TabsContent
          value="student"
          className="overflow-y-auto mt-0"
        ></TabsContent>
        <TabsContent
          value="creator"
          className="overflow-y-auto mt-0"
        ></TabsContent>
      </Tabs>
    </>
  );
};

export default WithAuth(Leaderboard);
