import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { get } from "lodash";
import { useTopThreeRanking, useBulkUserRanking } from "@/hooks/user-query";
import { useUserStore } from "@/store/UserStore";
import { useState, useMemo, useCallback } from "react";
import { UserRankingProps, UserRankingType } from "@/types/users";
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
  const [searchValue, setSearchValue] = useState("");

  // Fetch all 100 users at once
  const { data: bulkUserRankingData, isLoading } = useBulkUserRanking({
    type: type,
  });

  // Fetch top 3 users separately
  const { data: topThreeRankingData, isLoading: isTopThreeRankingLoading } =
    useTopThreeRanking({
      type: type,
    });

  // Filter and paginate data client-side
  const filteredAndPaginatedData = useMemo(() => {
    if (!bulkUserRankingData?.data) return { data: [], total: 0 };

    // Add original rank to each item before filtering
    const dataWithRanks = bulkUserRankingData.data.map((item, index) => ({
      ...item,
      originalRank: index + 1, // Store the original rank (1-based)
    }));

    // Filter by search term if provided
    const filtered = searchValue
      ? dataWithRanks.filter(
        (item) =>
          item.user.username
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.user.email?.toLowerCase().includes(searchValue.toLowerCase())
      )
      : dataWithRanks;

    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Return paginated slice
    return {
      data: filtered.slice(startIndex, endIndex),
      total: filtered.length,
    };
  }, [bulkUserRankingData?.data, searchValue, page, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil((filteredAndPaginatedData.total || 0) / pageSize);
  }, [filteredAndPaginatedData.total, pageSize]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  const handleSearch = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    setPage(1); // Reset to first page when searching
  }, []);

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
            name={topThreeRankingData?.data[1]?.user?.username ?? ""}
            specialName={
              topThreeRankingData?.data[1]?.user?.specialName ?? "không có"
            }
            score={topThreeRankingData?.data[1]?.count.toString() ?? "0"}
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
            name={topThreeRankingData?.data[0]?.user?.username ?? ""}
            specialName={
              topThreeRankingData?.data[0]?.user?.specialName ?? "không có"
            }
            score={topThreeRankingData?.data[0]?.count.toString() ?? "0"}
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
            name={topThreeRankingData?.data[2]?.user?.username ?? ""}
            specialName={
              topThreeRankingData?.data[2]?.user?.specialName ?? "không có"
            }
            score={topThreeRankingData?.data[2]?.count.toString() ?? "0"}
            imageUrl={
              // dataMockData[2]?.user?.imageURL ??
              "bg-[url('/image/leaderboard/user2.png')]"
            }
          />
        </motion.div>
      </div>

      <LeaderboardTable
        data={filteredAndPaginatedData.data || []}
        totalDocs={filteredAndPaginatedData.total || 0}
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        countText={countText}
        onSearch={handleSearch}
      />
    </div>
  );
};
