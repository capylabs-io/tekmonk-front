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
          <PointCard point={userInfo?.point.toString() || "0"} />
          <PriceCard price={userInfo?.balance.toString() || "0"} />
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between items-center px-4">
              <div className="text-SubheadMd text-gray-95 uppercase ">
                Tin tức
              </div>
              <div
                className="text-gray-500 cursor-pointer hover:text-primary-90 transition-colors text-sm"
                onClick={() => router.push(ROUTE.NEWS)}
              >
                Xem thêm
              </div>
            </div>
            <ShowSmallCarouselItems />

            <div className="mt-4">
              <EventList />
            </div>
          </div>
          <Image
            src="/image/home/banner-layout.png"
            alt="Banner"
            width={300}
            height={300}
            className="w-full rounded-2xl object-contain"
          />
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
          />
          <AuthorProjectsCard projects={[]} />
        </>
      );
      break;
  }
};
