"use client";
import { Button } from "@/components/common/button/Button";
import { EventList } from "@/components/home/EventList";
import { PointCard } from "@/components/home/PointCard";
import Image from "next/image";
import { useEvents } from "@/lib/hooks/useEvent";
import { useState } from "react";
import { CreateProfileModal } from "@/components/home/CreateProfileModal";
import { useProfileStore } from "@/store/ProfileStore";
import { MenuLayout } from "@/components/home/MenuLayout";
import { usePathname } from "next/navigation";
import { AuthorCard } from "@/components/project/AuthorCard";
import { AuthorProjectsCard } from "@/components/project/AuthorProjectsCard";
import UserProfileLink from "@/components/common/UserProfileLink";
import { useProjects } from "@/lib/hooks/useProject";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useCustomRouter();
  const [userName, setUserName] = useState("HENRY NGUYEN");
  const [userRank, setUserRank] = useState("BẠC IV");
  const [show, hide] = useProfileStore((state) => [state.show, state.hide]);
  const handleOpenModal = () => {
    show();
  };
  const handleRidirectHomePage = () => {
    router.push(ROUTE.HOME);
  };
  const events = useEvents().slice(1, 4);
  const projects = useProjects().slice(1, 5);

  return (
    <section className="w-full flex min-h-screen container mx-auto">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="h-full md:flex flex-col p-2  xl:w-[248px] w-[64px] hidden">
        <div className="grow-0">
          <Image
            src="/image/app-logo.png"
            alt="app logo"
            width={159}
            height={32}
            className="ml-1.5 xl:block hidden"
          />
        </div>
        <div className="flex flex-col mt-4">
          <MenuLayout />
          <div className="grow-0 px-3 w-full">
            <CommonButton
              className="w-full !rounded-3xl h-12 xl:block hidden"
              variant="secondary"
              onClick={handleRidirectHomePage}
            >
              Bảng tin Tekmonk
            </CommonButton>

            <UserProfileLink userName={userName} userRank={userRank} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto border-gray-200 border">
        {children}
      </div>
    </section>
  );
}
