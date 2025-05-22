"use client";
import Image from "next/image";
import { CreatePostModal } from "@/components/home/CreatePostModal";
import { useProfileStore } from "@/store/ProfileStore";
import { MenuLayout } from "@/components/home/MenuLayout";
import UserProfileLink from "@/components/common/UserProfileLink";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import CommonLayout from "@/components/common/CommonLayout";
import { AvatarConfigModal } from "@/components/avatar/AvatarConfigModal";
import { useUserStore } from "@/store/UserStore";
import { CommonRightSidebar } from "@/components/common/sidebar/common-right-sidebar";
import { NavigationInfo } from "@/components/common/sidebar/naivgation-info";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useCustomRouter();
  const [userInfo, isConnected] = useUserStore((state) => [
    state.userInfo,
    state.isConnected,
  ]);
  const [show, hide] = useProfileStore((state) => [state.show, state.hide]);
  const handleOpenModal = () => {
    show();
  };
  const handleRidirectAdminPage = () => {
    router.push(ROUTE.ADMIN + ROUTE.MODERATOR);
  };

  return (
    <>
      <CommonLayout
        leftSidebar={
          <div className="h-full flex flex-col px-4 py-5 col-span-2 overflow-hidden">
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
            <div className="flex flex-col mt-4 grow">
              <MenuLayout customClassName="" />
              <NavigationInfo />
            </div>
          </div>
        }
        mainContent={
          <div className="col-span-6 py-5 overflow-y-auto overflow-x-hidden">
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
