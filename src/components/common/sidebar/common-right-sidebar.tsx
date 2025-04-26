"use client";

import { PointCard } from "@/components/home/PointCard";
import { AuthorCard } from "@/components/project/AuthorCard";
import { AuthorProjectsCard } from "@/components/project/AuthorProjectsCard";
import { useProjects } from "@/lib/hooks/useProject";
import { useUserStore } from "@/store/UserStore";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ROUTE } from "@/contants/router";
import { ShowSmallCarouselItems } from "@/components/new/carousel-small";
import { EventList } from "@/components/new/event-list";
export const CommonRightSidebar = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const projects = useProjects().slice(1, 5);

  switch (true) {
    case true:
      return (
        <div className="flex flex-col gap-y-4 px-4 pb-8 col-span-3 overflow-auto max-h-screen hide-scrollbar">
          <PointCard point={userInfo?.point && userInfo?.point.toString() || "0"} />
          <div className="flex flex-col gap-y-1">
            <div className="text-SubheadMd text-gray-95 uppercase px-4">
              Tin tức
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
          <AuthorProjectsCard projects={projects} />
        </>
      );
      break;
  }
};
