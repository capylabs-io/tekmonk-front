"use client";
import React from "react";
import { StatCard } from "./StatCard";
import { useUserAnalyticQuery } from "@/hooks/user-query";

export const UserStat = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useUserAnalyticQuery(id);

  if (isLoading) {
    return (
      <div className="py-4 flex flex-wrap justify-center gap-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="w-40 h-24 bg-white rounded-lg shadow flex flex-col items-center justify-center p-4 animate-pulse border border-gray-100"
          >
            <div className="h-6 w-16 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-8 text-red-500">
        <span>Đã xảy ra lỗi khi tải dữ liệu.</span>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-wrap justify-center gap-4">
      <StatCard
        value={data?.missions?.toString() || "0"}
        title="Nhiệm vụ đã hoàn thành"
      />
      <StatCard
        value={data?.isVerifiedPost?.toString() || "0"}
        title="Sản phẩm tải lên"
      />
      <StatCard value={data?.points?.toString() || "0"} title="Điểm sở hữu" />
      <StatCard
        value={data?.certificates?.toString() || "0"}
        title="Số chứng chỉ"
      />
      <StatCard
        value={data?.achievements?.toString() || "0"}
        title="Số thành tích"
      />
      <StatCard
        value={data?.items?.toString() || "0"}
        title="Trang bị đã mua"
      />
    </div>
  );
};
