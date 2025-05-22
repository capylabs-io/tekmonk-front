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
  Trophy,
  User,
  Zap,
  Award,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/UserStore";

type Props = {
  customClassName?: string;
};
const BASE_CLASS = "grow";
export const MenuLayout = ({ customClassName }: Props) => {
  const [isConnected] = useUserStore((state) => [state.isConnected]);
  return (
    <div className={classNames(BASE_CLASS, customClassName)}>
      <MenuCard
        title="Bảng tin"
        active={usePathname() === "/bang-tin"}
        iconElement={<Home size={20} />}
        url="/bang-tin"
      />
      <MenuCard
        active={usePathname() === "/thong-bao"}
        title="Thông báo"
        iconElement={<Bell size={20} />}
        url="/thong-bao"
        hidden={!isConnected()}
      />
      <MenuCard
        title="Nhiệm vụ"
        active={usePathname().includes("/nhiem-vu")}
        iconElement={<Goal size={20} />}
        url="/nhiem-vu"
        hidden={!isConnected()}
      />
      <MenuCard
        title="Chứng chỉ"
        active={usePathname().includes("/chung-chi")}
        iconElement={<Award size={20} />}
        url="/chung-chi"
        hidden={!isConnected()}
      />
      <MenuCard
        title="Thành tựu"
        active={usePathname().includes("/thanh-tuu")}
        iconElement={<Trophy size={20} />}
        url="/thanh-tuu"
        hidden={!isConnected()}
      />
      <MenuCard
        title="Cửa hàng"
        active={usePathname().includes("/cua-hang")}
        url="/cua-hang"
        iconElement={<ShoppingCart size={20} />}
      />
      <MenuCard
        title="Bảng xếp hạng"
        active={usePathname().includes("/bang-xep-hang")}
        iconElement={<Zap size={20} />}
        url="/bang-xep-hang"
      />
      {/* <MenuCard
        title="Tin tức"
        active={usePathname().includes("/tin-tuc")}
        iconElement={<Newspaper size={20} />}
        url="/tin-tuc"
      /> */}
      <MenuCard
        title="Hồ sơ"
        active={usePathname().includes("/ho-so")}
        iconElement={<User size={20} />}
        url="/ho-so"
        hidden={!isConnected()}
      />
    </div>
  );
};
