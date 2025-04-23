"use client";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  active: boolean;
  iconElement: ReactNode;
  url?: string;
  hidden?: boolean;
};
const BASE_CLASS =
  "flex gap-x-3  px-3 py-4 rounded-xl items-center font-medium hover:bg-primary-25 hover:text-primary-600 cursor-pointer";
export const MenuCard = ({
  title,
  active,
  url,
  iconElement,
  hidden,
}: Props) => {
  const router = useRouter();
  const handleOnClick = () => {
    url && router.push(url);
  };
  if (hidden) return null;
  return (
    <div
      className={classNames(
        BASE_CLASS,
        active && "bg-primary-25 text-primary-600"
      )}
      onClick={handleOnClick}
    >
      {iconElement}
      {title && <span className="xl:block hidden">{title}</span>}
    </div>
  );
};
