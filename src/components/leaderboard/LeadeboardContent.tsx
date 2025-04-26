import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { useLeaderboardDatas } from "@/lib/hooks/useLeaderboardData";
import { get } from "lodash";
import { useUserRanking } from "@/hooks/user-query";
import { useUserStore } from "@/store/UserStore";
import { UserRankingType } from "@/types/users";
import { useState } from "react";

export const LeadeboardContent = ({ type }: { type: UserRankingType }) => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: userRankingData, isLoading } = useUserRanking({
    page,
    pageSize,
    id: userInfo?.id,
    type: type,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center bg-[url('/image/leaderboard/leaderboard-banner.png')] bg-no-repeat bg-cover h-[400px] gap-x-12 pb-7">
        <LeaderboardTopUserCard
          customClassNames="mt-4"
          rank="second"
          name={userRankingData?.data[1]?.user?.username ?? ""}
          specialName={get(userRankingData?.data[1]?.user, "specialName", "")}
          score={userRankingData?.data[1]?.count.toString() ?? "0"}
          imageUrl={
            // dataMockData[1]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user1.png')]"
          }
        />

        <LeaderboardTopUserCard
          customClassNames="mb-4"
          rank="first"
          name={userRankingData?.data[0]?.user?.username ?? ""}
          specialName={userRankingData?.data[0]?.user?.username ?? ""}
          score={userRankingData?.data[0]?.count.toString() ?? "0"}
          imageUrl={
            // dataMockData[0]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user3.png')]"
          }
        />
        <LeaderboardTopUserCard
          customClassNames="mt-4"
          rank="third"
          name={userRankingData?.data[2]?.user?.username ?? ""}
          specialName={userRankingData?.data[2]?.user?.username ?? ""}
          score={userRankingData?.data[2]?.count.toString() ?? "0"}
          imageUrl={
            // dataMockData[2]?.user?.imageURL ??
            "bg-[url('/image/leaderboard/user2.png')]"
          }
        />
      </div>

      <LeaderboardTable
        data={userRankingData?.data ?? []}
        totalDocs={userRankingData?.meta?.pagination?.total ?? 0}
        totalPages={userRankingData?.meta?.pagination?.pageCount ?? 1}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
      />
    </div>
  );
};
