import React from "react";
import { EmptyState } from "../lottie/EmptyState";

export const CommonEmptyState = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-6xl">
      <div className="flex flex-col items-center relative justify-center">
        <EmptyState className="w-[350px] h-[350px]" />
        <div className="text-gray-500 text-lg font-medium text-center">
          Không có dữ liệu
        </div>
      </div>
    </div>
  );
};
