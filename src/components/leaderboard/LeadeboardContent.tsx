import { LeaderboardTopUserCard } from "./LeaderboardTopUserCard";
import { LeaderboardTable } from "./LeaderboardTable";
import { get } from "lodash";
import { useTopThreeRanking, useBulkUserRanking } from "@/hooks/user-query";
import { useUserStore } from "@/store/UserStore";
import { useState, useMemo, useCallback, useEffect } from "react";
import { UserRankingProps, UserRankingType } from "@/types/users";
import { motion } from "framer-motion";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";

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
  const [mappedData, setMappedData] = useState<any[]>([]);

  // Fetch all 100 users at once
  const { data: bulkUserRankingData, isLoading } = useBulkUserRanking({
    type: type,
  });
  const fetchAvatarConfig = async (id: number) => {
    try {
      const queryString = qs.stringify({
        populate: ["frontHair", "backHair", "cloth", "mouth", "eye", "theme", "special"],
        filters: {
          user: {
            id: {
              $eq: id
            }
          }
        }
      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    } catch (error) {
      console.log("error: ", error);
    }
  }
  // Fetch top 3 users separately
  const { data: topThreeRankingData, isLoading: isTopThreeRankingLoading } =
    useTopThreeRanking({
      type: type,
    });

  useEffect(() => {
    const fetchData = async () => {
      if (!topThreeRankingData?.data) return;
      const promises = topThreeRankingData.data.map(async (item, index) => ({
        ...item,
        order: index + 1,
        avatarConfig: await fetchAvatarConfig(item.user.id)
      }));
      const results = await Promise.all(promises);
      setMappedData(results);
    };
    fetchData();
  }, [topThreeRankingData]);

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
        {
          !isTopThreeRankingLoading &&
          <>
            {mappedData.length > 0 && [
              mappedData[1],
              mappedData[0],
              mappedData[2]
            ].map((item, index) => (
              <motion.div
                key={item?.user?.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index === 0 ? 0.2 : index === 1 ? 0.4 : 0.6 }}
              >
                <LeaderboardTopUserCard
                  user={item.user}
                  customClassNames={item.order === 1 ? "mb-4" : item.order === 1 ? "mt-4" : "mt-4"}
                  rank={item.order}
                  name={item.user?.username ?? "Không có"}
                  specialName={item.user?.specialName ?? "Thường dân"}
                  score={item.count && item.count?.toString() || "0"}
                  imageUrl={
                    `bg-[url('/image/leaderboard/user${index + 1}.png')]`
                  }
                  avatarConfig={item.avatarConfig?.[0]}
                  rankingType={type}
                />
              </motion.div>
            ))}
          </>
        }
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
        rankingType={type}
      />
    </div>
  );
};
