import React from "react";
import Image from "next/image";
import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { LeaderboardData } from "@/types/common-types";
import { useLeaderboardDatas } from "@/lib/hooks/useLeaderboardData";
import { get } from "lodash";

export const LeadeboardContent = () => {
  const leaderboardDatas = useLeaderboardDatas();

  return (
    <div>
      <div className="w-full flex justify-center items-end bg-[url('/image/leaderboard/leaderboard-banner.png')] bg-no-repeat bg-cover h-[320px] gap-x-12 pb-7">
        <LeaderboardTopUserCard
          rank="second"
          name={leaderboardDatas[1]?.user?.username ?? ""}
          specialName={get(leaderboardDatas[1]?.user, "specialName", "")}
          score={leaderboardDatas[1]?.score ?? 0}
          imageUrl={
            leaderboardDatas[1]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user1.png')]"
          }
        />
        <LeaderboardTopUserCard
          rank="first"
          name={
            leaderboardDatas[0]?.user?.username &&
            leaderboardDatas[0]?.user?.username
          }
          specialName={leaderboardDatas[0]?.user?.specialName}
          score={leaderboardDatas[0]?.score}
          imageUrl={
            leaderboardDatas[0]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user3.png')]"
          }
        />
        <LeaderboardTopUserCard
          rank="third"
          name={leaderboardDatas[2]?.user?.username}
          specialName={leaderboardDatas[1]?.user?.specialName}
          score={leaderboardDatas[2]?.score}
          imageUrl={
            leaderboardDatas[2]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user2.png')]"
          }
        />
      </div>

      <LeaderboardTable data={leaderboardDatas} />
    </div>
  );
};
