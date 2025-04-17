"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/ProfileStore";
import { usePathname } from "next/navigation";
import UserProfileLink from "@/components/common/UserProfileLink";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { MenuCard } from "@/components/home/MenuCard";
import { Goal } from "lucide-react";
import { useUserStore } from "@/store/UserStore";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useCustomRouter();
  const [userName, setUserName] = useState("HENRY NGUYEN");
  const [userRank, setUserRank] = useState("BẠC IV");
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const handleRidirectHomePage = () => {
    router.push(ROUTE.HOME);
  };
  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username || "");
      setUserRank(userInfo.user_role?.name || "");
    }
  }, [userInfo]);

  return (
    <section className="w-full flex h-screen container mx-auto">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="md:flex flex-col p-2  xl:w-[248px] w-[64px] hidden justify-between h-screen">
        <div className="flex flex-col gap-4">
          <div className="grow-0">
            <Image
              src="/image/app-logo.png"
              alt="app logo"
              width={159}
              height={32}
              className="ml-1.5 xl:block hidden cursor-pointer"
              onClick={handleRidirectHomePage}
            />
          </div>
          <div className="space-y-2">
            <MenuCard
              title="Phê duyệt"
              active={usePathname().includes("/quan-ly/phe-duyet")}
              iconElement={<Goal size={20} />}
              url="/quan-ly/phe-duyet"
            />
            <MenuCard
              title="Thành tích"
              active={usePathname().includes("/quan-ly/thanh-tich")}
              iconElement={<Goal size={20} />}
              url="/quan-ly/thanh-tich"
            />
            <MenuCard
              title="Nhiệm vụ"
              active={usePathname().includes("/quan-ly/nhiem-vu")}
              iconElement={<Goal size={20} />}
              url="/quan-ly/nhiem-vu"
            />
            <MenuCard
              title="Chứng chỉ"
              active={usePathname().includes("/quan-ly/chung-chi")}
              iconElement={<Goal size={20} />}
              url="/quan-ly/chung-chi"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
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
      <div className="flex-1 overflow-hidden border-gray-200 border">
        {children}
      </div>
    </section>
  );
}
