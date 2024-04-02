import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { useUserStore } from "@/store/UserStore";
import { LogOut } from "lucide-react";

type UserProfileLinkProps = {
  userName: string;
  userRank: string;
};

const UserProfileLink: React.FC<UserProfileLinkProps> = ({
  userName,
  userRank,
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuShow] = useState(false);
  const toggleMenu = () => {
    setIsMenuShow(!isMenuOpen);
  };
  const handleLogout = () => {
    router.push("/login");
    useUserStore.getState().clear();
  };

  return (
    <div className="flex items-center mt-8 w-full justify-between relative">
      <div
        className="flex items-center gap-x-2 cursor-pointer"
        onClick={() => router.push("/home/profile")}
      >
        <div className="h-10 w-10 rounded-full flex flex-col bg-[url('/image/home/profile-pic.png')] bg-yellow-100 items-center justify-center" />
        <div>
          <p className="text-sm truncate">{userName}</p>
          <p className="text-sm text-gray-500">{userRank}</p>
        </div>
      </div>
      <button type="button" onClick={toggleMenu}>
        <MoreHorizontal size={20} />
      </button>
      {isMenuOpen && (
        <div className="absolute -translate-x-1/2 -top-[70px] left-1/2 rounded-lg pl-4 bg-white shadow-md flex gap-2 items-center z-10">
          <LogOut size={18} className="text-red-600" />
          <button
            className="w-max text-gray-600 font-normal p-4 pl-2"
            onClick={handleLogout}
          >
            Đăng xuất tài khoản
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileLink;
