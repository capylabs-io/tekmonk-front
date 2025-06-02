"use client";

import { cn } from "@/lib/utils";

export const CommonTag = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        className,
        "rounded-[4px] bg-gray-20 text-gray-95 text-BodyXs flex items-center h-6 px-2",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
