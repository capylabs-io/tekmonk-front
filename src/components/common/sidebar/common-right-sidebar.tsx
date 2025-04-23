"use client";

import { PointCard } from "@/components/home/PointCard";
import { AuthorCard } from "@/components/project/AuthorCard";
import { AuthorProjectsCard } from "@/components/project/AuthorProjectsCard";
import { useProjects } from "@/lib/hooks/useProject";
import { useUserStore } from "@/store/UserStore";
import { usePathname } from "next/navigation";
import Image from "next/image";
export const CommonRightSidebar = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const projects = useProjects().slice(1, 5);
  return (
    <div>
      <div className="h-full flex flex-col gap-y-4 px-4 col-span-3">
        {!usePathname().includes("/project") ? (
          <>
            <PointCard point={userInfo?.point.toString() || "0"} />
            {/* <EventList listEvent={events} /> */}
            <Image
              src="/image/home/banner-layout.png"
              alt="Banner"
              width={300}
              height={600}
              className="w-full rounded-xl h-full object-cover"
            />
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
};
