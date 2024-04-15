"use client";
import { Button } from "@/components/common/Button";
import { EventList } from "@/components/home/EventList";
import { PointCard } from "@/components/home/PointCard";
import Image from "next/image";
import { useEvents } from "@/lib/hooks/useEvent";
import { useState } from "react";
import { CreateProfileModal } from "@/components/home/CreateProfileModal";
import { useProfileStore } from "@/store/ProfileStore";
import { MenuLayout } from "@/components/home/MenuLayout";
import { usePathname, useRouter } from "next/navigation";
import { AuthorCard } from "@/components/project/AuthorCard";
import { AuthorProjectsCard } from "@/components/project/AuthorProjectsCard";
import UserProfileLink from "@/components/common/UserProfileLink";
import { useProjects } from "@/lib/hooks/useProject";
import { ROUTES } from "@/contants/role";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState("HENRY NGUYEN");
  const [userRank, setUserRank] = useState("BẠC IV");
  const [show, hide] = useProfileStore((state) => [state.show, state.hide]);
  const handleOpenModal = () => {
    show();
  };
  const events = useEvents().slice(0, 3);
  const projects = useProjects().slice(1, 5);

  const router = useRouter();
  const handleClick = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <section className="w-full grid grid-cols-11 h-screen">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="h-full flex flex-col px-10 py-5 border-gray-200 border-r col-span-2">
        <div className="grow-0 cursor-pointer">
          <Image
            src="/image/app-logo.png"
            alt="app logo"
            width={159}
            height={32}
            className="ml-1.5 cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <div className="flex flex-col mt-4 grow">
          <MenuLayout />
          <div className="grow-0 px-3 w-full">
            <Button className="w-full !rounded-3xl" onClick={handleOpenModal}>
              Đăng tải
            </Button>
            <UserProfileLink userName={userName} userRank={userRank} />
          </div>
        </div>
      </div>
      <div className="col-span-6 py-5 overflow-y-auto">{children}</div>
      <div className="h-full flex flex-col gap-y-4 px-10 py-5 border-gray-200 border-l col-span-3">
        {!usePathname().includes("/project") ? (
          <>
            <PointCard point="9999" />
            <EventList listEvent={events} />
            <div className="w-full rounded-xl bg-[url('/image//home/banner-layout.png')] bg-no-repeat bg-cover h-full" />
          </>
        ) : (
          <>
            <AuthorCard
              imageUrl="bg-[url('/image/user/profile-pic-2.png')]"
              userName={userName}
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
      <CreateProfileModal />
    </section>
  );
}
