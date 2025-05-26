"use client"
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
type AnimationLoadingProps = {
  className?: string;
};
const url = "/lotties/common-loading.lottie";
export const AnimationLoading = ({ className }: AnimationLoadingProps) => {
  return (
    <DotLottieReact
      src={url}
      loop
      autoplay
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
