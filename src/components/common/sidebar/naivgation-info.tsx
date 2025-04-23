"use client";

import { useUserStore } from "@/store/UserStore";
import { CommonButton } from "../button/CommonButton";
import UserProfileLink from "../UserProfileLink";
import { useCustomRouter } from "../router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useProfileStore } from "@/store/ProfileStore";
import { CreateProfileModal } from "@/components/home/CreateProfileModal";

export const NavigationInfo = () => {
  const router = useCustomRouter();
  const [userInfo, isConnected] = useUserStore((state) => [
    state.userInfo,
    state.isConnected,
  ]);
  const [show] = useProfileStore((state) => [state.show]);
  const handleOpenModal = () => {
    show();
  };
  const handleRidirectAdminPage = () => {
    router.push(ROUTE.HOME);
  };

  return (
    <>
      {isConnected() ? (
        <div className="grow-0 px-3 w-full md:block hidden">
          <div className="flex flex-col gap-y-4 mt-4">
            <CommonButton
              className="w-full !rounded-3xl h-12"
              variant="secondary"
              onClick={handleRidirectAdminPage}
            >
              Quản lý
            </CommonButton>
            <CommonButton
              className="w-full !rounded-3xl h-12"
              onClick={handleOpenModal}
            >
              Đăng tải
            </CommonButton>
          </div>
          <UserProfileLink userName={userInfo?.username || ""} />
        </div>
      ) : (
        <CommonButton
          className="w-full !rounded-3xl h-12"
          variant="primary"
          onClick={() => router.push(ROUTE.LOGIN)}
        >
          Đăng nhập
        </CommonButton>
      )}
    </>
  );
};
