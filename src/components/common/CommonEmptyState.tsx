import React from "react";
import { EmptyState } from "../lottie/EmptyState";

export const CommonEmptyState = () => {
  return <div className="flex h-full w-full items-center justify-center text-6xl">
    <div className="flex flex-col items-center relative">
      <EmptyState className="w-[400px] h-[400px]" />
      <div className="text-white/80 text-lg font-medium absolute top-[80%] -translate-x-1/2 -translate-y-1/2">
        Không có dữ liệu
      </div>
    </div>
  </div>
};

