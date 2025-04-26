"use client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { CommonTable } from "../common/CommonTable";
import { UserRankingProps } from "@/types/users";
import { useState } from "react";
import { useCustomRouter } from "../common/router/CustomRouter";

type Props = {
  data: UserRankingProps[];
  totalDocs?: number;
  totalPages?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  isLoading?: boolean;
};

export const LeaderboardTable = ({
  data,
  totalDocs = 0,
  totalPages = 1,
  page = 1,
  onPageChange,
  onPageSizeChange,
  isLoading,
}: Props) => {
  const router = useCustomRouter();
  const columns = [
    {
      id: "rank",
      header: "THỨ HẠNG",
      cell: ({ row }: any) => <span>{(page - 1) * 10 + row.index + 1}</span>,
      size: 200,
    },
    {
      id: "account",
      header: "TÀI KHOẢN",
      cell: ({ row }: any) => (
        <div
          className="flex gap-x-2 items-center"
          onClick={() => {
            router.push(`/ho-so/${row.original?.user.id}`);
          }}
        >
          <Image
            src="/image/gem/diamond-gem.png"
            alt="gem pic"
            width={20}
            height={20}
          />
          <Image
            src="/image/leaderboard/user1.png"
            alt="avatar pic"
            width={26}
            height={26}
            className="rounded-full"
          />
          <div className="text-SubheadSm !font-medium">
            {row.original?.user.username}
          </div>
        </div>
      ),
      size: 400,
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }: any) => row.original?.user.email,
    },
    {
      id: "score",
      header: "ĐIỂM SỐ",
      cell: ({ row }: any) => row.original?.count.toString(),
    },
  ];

  return (
    <CommonTable
      data={data}
      columns={columns}
      page={page}
      totalPage={totalPages}
      totalDocs={totalDocs}
      docsPerPage={10}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isLoading}
      customTableClassname="mt-6"
    />
  );
};
