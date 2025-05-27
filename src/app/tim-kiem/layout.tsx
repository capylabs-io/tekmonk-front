"use client";
import Image from "next/image";
import { CreatePostModal } from "@/components/home/CreatePostModal";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import CommonLayout from "@/components/common/CommonLayout";
import { AvatarConfigModal } from "@/components/avatar/AvatarConfigModal";
import { CommonRightSidebar } from "@/components/common/sidebar/common-right-sidebar";
import { NavigationInfo } from "@/components/common/sidebar/naivgation-info";
import { MenuLayout } from "@/components/home/MenuLayout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useCustomRouter();

  return (
    <>
      <CommonLayout
        leftSidebar={
          <div className="h-full max-h-screen flex flex-col px-4 py-5 col-span-2 overflow-hidden">
            <div
              className="cursor-pointer"
              onClick={() => router.push(ROUTE.NEWS_FEED)}
            >
              <Image
                src="/image/app-logo.png"
                alt="app logo"
                width={159}
                height={32}
                className="ml-1.5 xl:block hidden"
              />
              <Image
                src="/Logo.png"
                alt="app logo"
                width={34}
                height={32}
                className="ml-1.5 xl:hidden block"
              />
            </div>
            <div className="flex flex-col justify-between mt-4 grow">
              {/* Left sidebar with filters */}
              <MenuLayout customClassName="" />
              <NavigationInfo />
            </div>
          </div>
        }
        mainContent={
          <div className="col-span-6 py-4 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        }
        rightSidebar={
          <>
            <CommonRightSidebar />
          </>
        }
      />
      <CreatePostModal />
      <AvatarConfigModal />
    </>
  );
}
