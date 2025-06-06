import React, { useState } from "react";
import { MoreHorizontal, User } from "lucide-react";
import { useUserStore } from "@/store/UserStore";
import { LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useCustomRouter } from "./router/CustomRouter";
import { FaHistory } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { ROUTE } from "@/contants/router";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import Image from "next/image";
import { cn } from "@/lib/utils";

type UserProfileLinkProps = {
  userName: string;
  userRank?: string;
};

const UserProfileLink: React.FC<UserProfileLinkProps> = ({
  userName,
  userRank,
}) => {
  const router = useCustomRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    useUserStore.getState().clear();
    router.push("/dang-nhap");
  };

  const handleRedirectToHistory = () => {
    router.push(ROUTE.HISTORY);
  };

  const handleRedirectToProfile = () => {
    router.push(`${ROUTE.PROFILE}/${userInfo?.id}`);
  };
  const { data: dataAvatarConfig, refetch: refetchAvatarConfig } = useQuery({
    queryKey: ["avatar-config", userInfo?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: [
          "frontHair",
          "backHair",
          "cloth",
          "mouth",
          "eye",
          "theme",
          "special",
        ],
        filters: {
          user: {
            id: {
              $eq: Number(userInfo?.id),
            },
          },
        },
      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex items-center mt-8 w-full xl:justify-between justify-center relative">
      <div className="flex items-center gap-x-2 cursor-pointer hover:text-primary-600">
        {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
          <div
            className="border-[5px] border-white p-3 bg-white rounded-full  xl:h-10 xl:w-10 h-8 w-8 relative overflow-hidden"
            onClick={toggleMenu}
          >
            <>
              {dataAvatarConfig[0]?.frontHair && (
                <Image
                  src={dataAvatarConfig[0]?.frontHair?.image || ""}
                  alt={dataAvatarConfig[0]?.frontHair?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[4]")}
                />
              )}
              {dataAvatarConfig[0]?.backHair && (
                <Image
                  src={dataAvatarConfig[0]?.backHair?.image || ""}
                  alt={dataAvatarConfig[0]?.backHair?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[2]")}
                />
              )}
              {dataAvatarConfig[0]?.cloth && (
                <Image
                  src={dataAvatarConfig[0]?.cloth?.image || ""}
                  alt={dataAvatarConfig[0]?.cloth?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[3]")}
                />
              )}
              {dataAvatarConfig[0]?.mouth && (
                <Image
                  src={dataAvatarConfig[0]?.mouth?.image || ""}
                  alt={dataAvatarConfig[0]?.mouth?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[4]")}
                />
              )}
              {dataAvatarConfig[0]?.eye && (
                <Image
                  src={dataAvatarConfig[0]?.eye?.image || ""}
                  alt={dataAvatarConfig[0]?.eye?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[3]")}
                />
              )}
              {dataAvatarConfig[0]?.theme && (
                <Image
                  src={dataAvatarConfig[0]?.theme?.image || ""}
                  alt={dataAvatarConfig[0]?.theme?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[1]")}
                />
              )}
              {dataAvatarConfig[0]?.special && (
                <Image
                  src={dataAvatarConfig[0]?.special?.image || ""}
                  alt={dataAvatarConfig[0]?.special?.name || ""}
                  fill
                  className={cn("object-cover absolute z-[5]")}
                />
              )}
            </>
          </div>
        ) : (
          <div
            className="xl:h-10 xl:w-10 h-8 w-8 rounded-full flex flex-col bg-[url('/image/home/profile-pic.png')] bg-yellow-100 items-center justify-center bg-cover"
            onClick={toggleMenu}
          />
        )}
        <div className="xl:block hidden">
          <p
            className="text-sm truncate"
            onClick={() => router.push(`/ho-so/${userInfo?.id}`)}
          >
            {userName}
          </p>
          {userRank && <p className="text-sm text-gray-500">{userRank}</p>}
        </div>
      </div>

      <Dialog open={isMenuOpen} onOpenChange={toggleMenu}>
        <DialogTrigger
          onClick={toggleMenu}
          className="hover:text-primary-600 xl:block hidden "
        >
          <MoreHorizontal size={20} />
        </DialogTrigger>
        <DialogContent className=" z-[999] absolute -translate-x-1/2 bottom-[50px] left-1/2 rounded-lg pl-4 bg-white shadow-md flex gap-2 items-center">
          <div>
            <div
              className="flex items-center gap-x-2 text-gray-600 hover:text-primary-600"
              onClick={handleRedirectToProfile}
            >
              <User size={18} className="" />
              <button className="w-max  font-normal p-4 pl-2">
                Thay đổi thông tin cá nhân
              </button>
            </div>
            <div
              className="flex items-center gap-x-2 text-gray-600 hover:text-primary-600"
              onClick={handleRedirectToHistory}
            >
              <FaHistory size={18} className="" />
              <button className="w-max  font-normal p-4 pl-2">
                Lịch sử đăng bài
              </button>
            </div>
            <div className="flex items-center gap-x-2 text-gray-600 hover:text-primary-600">
              <RiLockPasswordFill size={18} className="" />
              <button className="w-max  font-normal p-4 pl-2">
                Đổi mật khẩu
              </button>
            </div>
            <div className="flex items-center gap-x-2 text-gray-600 hover:text-red-600">
              <LogOut size={18} className="" />
              <button
                className="w-max font-normal p-4 pl-2"
                onClick={handleLogout}
              >
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileLink;
