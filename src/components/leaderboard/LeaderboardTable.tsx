"use client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { CommonTable } from "../common/CommonTable";
import { UserRankingProps, UserRankingType } from "@/types/users";
import { useCustomRouter } from "../common/router/CustomRouter";
import { Input } from "../common/Input";
import { useState, useEffect, useCallback } from "react";
import { get } from "lodash";
import { TabIcon } from "./TabIcons";

type Props = {
  data: UserRankingProps[];
  totalDocs?: number;
  totalPages?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearch?: (searchValue: string) => void;
  isLoading?: boolean;
  countText: string;
  rankingType: UserRankingType;
};

// Medal component for top 3 ranks
const RankMedal = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <span className="text-xl" title="Hạng nhất">
        🥇
      </span>
    ); // Gold
  } else if (rank === 2) {
    return (
      <span className="text-xl" title="Hạng nhì">
        🥈
      </span>
    ); // Silver
  } else if (rank === 3) {
    return (
      <span className="text-xl" title="Hạng ba">
        🥉
      </span>
    ); // Bronze
  }
};

export const LeaderboardTable = ({
  data,
  totalDocs = 0,
  totalPages = 1,
  page = 1,
  onPageChange,
  onPageSizeChange,
  onSearch,
  isLoading,
  countText = "ĐIỂM SỐ",
  rankingType,
}: Props) => {
  const router = useCustomRouter();
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10; // Assuming a fixed page size of 10

  // Debounce the search to avoid excessive filtering operations
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      }
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchValue, onSearch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const columns = [
    {
      id: "rank",
      header: "THỨ HẠNG",
      cell: ({ row }: any) => {
        // Use the original rank if available, otherwise fall back to calculated rank
        const originalRank = row.original?.originalRank;
        const rank = originalRank || (page - 1) * pageSize + row.index + 1;

        return (
          <div className="flex items-center gap-2">
            <span className={rank <= 3 ? "font-bold" : ""}>{rank}</span>
          </div>
        );
      },
      size: 200,
    },
    {
      id: "account",
      header: "TÀI KHOẢN",
      cell: ({ row }: any) => {
        // Get the rank to determine which icon to show
        const originalRank = row.original?.originalRank;
        const rank = originalRank || (page - 1) * pageSize + row.index + 1;

        return (
          <div
            className="flex gap-x-2 items-center cursor-pointer"
            onClick={() => {
              router.push(`/ho-so/${row.original?.user.id}`);
            }}
          >
            <div className="flex-shrink-0 w-6 flex justify-center">
              <RankMedal rank={rank} />
            </div>
            {/* <Image
              src="/image/leaderboard/user1.png"
              alt="avatar pic"
              width={26}
              height={26}
              className="rounded-full"
            /> */}
            <div
              className={`text-SubheadSm !font-medium ${rank <= 3 ? "font-bold" : ""
                }`}
            >
              {row.original?.user.username}
              {rank === 1 && <span className="ml-2 text-yellow-500">👑</span>}
            </div>
          </div>
        );
      },
      size: 400,
    },
    {
      id: "specialName",
      header: "Biệt hiệu",
      cell: ({ row }: any) => {
        const specialName = get(row, "original.user.specialName");
        return specialName === null || specialName === undefined
          ? "Thường dân"
          : specialName;
      },
    },
    {
      id: "score",
      header: countText,
      cell: ({ row }: any) => {
        const originalRank = row.original?.originalRank;
        const rank = originalRank || (page - 1) * pageSize + row.index + 1;
        return (
          <div className="flex items-center gap-2">
            <TabIcon type={rankingType} />
            <span className={rank <= 3 ? "font-bold" : ""}>
              {row.original?.count.toString()}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4 w-full">
      <Input
        type="text"
        placeholder="Tìm kiếm người dùng theo tên hoặc email"
        isSearch={true}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <CommonTable
        data={data}
        columns={columns}
        page={page}
        totalPage={totalPages}
        totalDocs={totalDocs}
        docsPerPage={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
        customTableClassname="mt-6"
      />
    </div>
  );
};
