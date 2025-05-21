import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { get } from "lodash";
import { useUserRanking } from "@/hooks/user-query";
import { useUserStore } from "@/store/UserStore";
import { useState } from "react";
import { UserRankingType } from "@/types/users";
import { motion } from "framer-motion";

export const LeadeboardContent = ({
  type,
  countText,
}: {
  type: UserRankingType;
  countText: string;
}) => {
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LeaderboardTopUserCard
            customClassNames="mt-4"
            rank="second"
            name={userRankingData?.data[1]?.user?.username ?? ""}
            specialName={get(userRankingData?.data[1]?.user, "username", "không có")}
            score={userRankingData?.data[1]?.count.toString() ?? "0"}
            imageUrl={
              // dataMockData[1]?.user?.imageURL ??
              "bg-[url('/image/leaderboard/user1.png')]"
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <LeaderboardTopUserCard
            customClassNames="mb-4"
            rank="first"
            name={userRankingData?.data[0]?.user?.username ?? ""}
            specialName={userRankingData?.data[0]?.user?.username ?? "không có"}
            score={userRankingData?.data[0]?.count.toString() ?? "0"}
            imageUrl={
              // dataMockData[0]?.user?.imageURL ??
              "bg-[url('/image/leaderboard/user3.png')]"
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LeaderboardTopUserCard
            customClassNames="mt-4"
            rank="third"
            name={userRankingData?.data[2]?.user?.username ?? ""}
            specialName={userRankingData?.data[2]?.user?.username ?? "không có"}
            score={userRankingData?.data[2]?.count.toString() ?? "0"}
            imageUrl={
              // dataMockData[2]?.user?.imageURL ??
              "bg-[url('/image/leaderboard/user2.png')]"
            }
          />
        </motion.div>
      </div>

      <LeaderboardTable
        data={userRankingData?.data ?? []}
        totalDocs={userRankingData?.meta?.pagination?.total ?? 0}
        totalPages={userRankingData?.meta?.pagination?.pageCount ?? 1}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        countText={countText}
      />
    </div>
  );
};
