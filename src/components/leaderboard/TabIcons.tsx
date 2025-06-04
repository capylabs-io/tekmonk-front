"use client";
import React from "react";
import { UserRankingType } from "@/types/users";
import Image from "next/image";

type TabIconProps = {
  type: UserRankingType;
  className?: string;
};

export const TabIcon = ({ type, className = "" }: TabIconProps) => {
  const getIconForTab = (type: UserRankingType) => {
    switch (type) {
      case UserRankingType.POINT:
        return {
          icon: (
            <Image
              src="/image/PointIcon.png"
              alt="point icon"
              width={24}
              height={24}
              className="inline-block"
            />
          ),
          title: "Học Bá - Điểm số",
        };
      case UserRankingType.TOTAL_PRICE:
        return {
          icon: (
            <Image
              src="/image/home/coin.png"
              alt="coin pic"
              width={24}
              height={24}
            />
          ),
          title: "Tài Phú - Tiền thưởng",
        };
      case UserRankingType.POST:
        return { icon: "🤝", title: "Đại sứ thân thiện - Bài viết" };
      case UserRankingType.PROJECT:
        return { icon: "💡", title: "Thiên tài sáng tạo - Dự án" };
      default:
        return { icon: "🏆", title: "Leaderboard" };
    }
  };

  const { icon, title } = getIconForTab(type);

  return (
    <span className={`inline-flex items-center ${className}`} title={title}>
      <span className="text-2xl">{icon}</span>
    </span>
  );
};

// Export individual icons for easy import
export const StudentIcon = () => <TabIcon type={UserRankingType.POINT} />;
export const PointCollectorIcon = () => (
  <TabIcon type={UserRankingType.TOTAL_PRICE} />
);
export const CreatorIcon = () => <TabIcon type={UserRankingType.POST} />;
export const FriendlyIcon = () => <TabIcon type={UserRankingType.PROJECT} />;
