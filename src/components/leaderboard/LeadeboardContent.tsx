import React from "react";
import Image from "next/image";
import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import LeaderboardMock from "@/mock/leaderboard-mock.json";
import { LeaderboardData } from "@/types/common-types";

export const LeadeboardContent = () => {
  return (
    <div>
      <div className="w-full flex justify-center items-end bg-[url('/image/leaderboard/leaderboard-banner.png')] bg-no-repeat bg-cover h-[320px] gap-x-12 pb-7">
        <LeaderboardTopUserCard
          rank="second"
          name="Vương Linh Chi"
          specialName="BÁ VƯƠNG HỌC ĐƯỜNG"
          score="9900"
          imageUrl=" bg-[url('/image/leaderboard/user1.png')]"
        />
        <LeaderboardTopUserCard
          rank="first"
          name="Nguyễn Thành Nam"
          specialName="ĐẠI VƯƠNG"
          score="10000"
          imageUrl=" bg-[url('/image/leaderboard/user3.png')]"
        />
        <LeaderboardTopUserCard
          rank="third"
          name="Nguyễn Thái Hoà"
          specialName="BÁ VƯƠNG HỌC ĐƯỜNG"
          score="9800"
          imageUrl=" bg-[url('/image/leaderboard/user2.png')]"
        />
      </div>

      {/* @TODO: check why as unknown  */}
      <LeaderboardTable
        data={LeaderboardMock as unknown as LeaderboardData[]}
      />
    </div>
  );
};
