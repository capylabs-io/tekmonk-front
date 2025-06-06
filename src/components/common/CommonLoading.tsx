import React from "react";
import { AnimationLoading } from "../lottie/AnimationLoading";

export const CommonLoading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70 text-6xl">
      <div className="flex flex-col items-center relative">
        <AnimationLoading className="w-[500px] h-[500px]" />
        <div className="text-white/80 text-lg font-medium absolute top-[80%] left-1/2 -translate-x-1/2 text-center">
          Đang tải...
        </div>
      </div>
    </div>
  );
};
