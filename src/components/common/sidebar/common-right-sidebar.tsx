"use client";

import { PointCard } from "@/components/home/PointCard";
import { AuthorCard } from "@/components/project/AuthorCard";
import { AuthorProjectsCard } from "@/components/project/AuthorProjectsCard";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
import { ROUTE } from "@/contants/router";
import { ShowSmallCarouselItems } from "@/components/new/carousel-small";
import { EventList } from "@/components/new/event-list";
import { PriceCard } from "@/components/home/price-card";
import { useCustomRouter } from "../router/CustomRouter";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchFilter } from "@/components/search/search-filter";
export const CommonRightSidebar = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const router = useCustomRouter();
  switch (true) {
    case true:
      return (
        <div className="flex flex-col gap-y-4 px-4 pb-8 col-span-3 overflow-auto max-h-screen hide-scrollbar">
          <SearchFilter />
          {userInfo?.id && (
            <div className="rounded-xl border border-gray-200 ">
              <div className="p-4 flex justify-between text-primary-900 items-center">
                <span className="text-SubheadMd text-gray-95">ĐIỂM</span>
                <div className="flex gap-x-1">
                  <span className="font-bold text-base">
                    {(userInfo?.point && userInfo?.point.toString()) || "0"}
                  </span>
                  <Image
                    src="/image/PointIcon.png"
                    alt="coin pic"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className="p-4 flex justify-between text-primary-900 items-center  border-t border-gray-200 ">
                <span className="text-SubheadMd text-gray-95 uppercase">
                  TIỀN
                </span>
                <div className="flex gap-x-1">
                  <span className="font-bold text-base">
                    {(userInfo?.balance && userInfo?.balance.toString()) || "0"}
                  </span>
                  <Image
                    src="/image/home/coin.png"
                    alt="coin pic"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-y-1">
            <ShowSmallCarouselItems />
            <div className="mt-4">
              <EventList />
            </div>
          </div>
          {/* <Image
            src="/image/home/banner-layout.png"
            alt="Banner"
            width={300}
            height={300}
            className="w-full rounded-2xl object-contain"
          /> */}
        </div>
      );
    default:
      return (
        <>
          <AuthorCard
            imageUrl="bg-[url('/image/user/profile-pic-2.png')]"
            userName={userInfo?.username || ""}
            specialName="Học Bá Thanh Xuân"
            userRank={
              <span
                className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
              >
                IV
              </span>
            }
            likedCount="134"
            projectCount="5"
            userId={userInfo?.id || 0}
          />
          <AuthorProjectsCard projects={[]} />
        </>
      );
      break;
  }
};
