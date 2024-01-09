"use client";
import React from "react";
import { MenuCard } from "./MenuCard";
import classNames from "classnames";
import {
  Bell,
  Goal,
  Home,
  Newspaper,
  ShoppingCart,
  User,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  customClassName?: string;
};
const BASE_CLASS = "grow";
export const MenuLayout = ({ customClassName }: Props) => {
  return (
    <div className={classNames(BASE_CLASS, customClassName)}>
      <MenuCard
        title="Trang chủ"
        active={usePathname() === "/home"}
        iconElement={<Home size={20} />}
        url="/home"
      />
      <MenuCard
        active={usePathname() === "/notification"}
        title="Thông báo"
        iconElement={<Bell size={20} />}
        url="/notification"
      />
      <MenuCard
        title="Nhiệm vụ"
        active={usePathname().includes("/mission")}
        iconElement={<Goal size={20} />}
        url="/mission"
      />
      <MenuCard
        title="Cửa hàng"
        active={usePathname().includes("/shop")}
        url="/shop"
        iconElement={<ShoppingCart size={20} />}
      />
      <MenuCard
        title="Bảng xếp hạng"
        active={usePathname().includes("/leaderboard")}
        iconElement={<Zap size={20} />}
        url="/leaderboard"
      />
      <MenuCard
        title="Tin tức"
        active={usePathname().includes("/news")}
        iconElement={<Newspaper size={20} />}
        url="/news"
      />
      <MenuCard
        title="Hồ sơ"
        active={usePathname() === "/home/profile"}
        iconElement={<User size={20} />}
        url="/home/profile"
      />
    </div>
  );
};
