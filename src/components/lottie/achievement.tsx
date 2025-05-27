"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
type AchievementLottieProps = {
  className?: string;
};
const url = "/lotties/achievement.lottie";
export const AchievementLottie = ({ className }: AchievementLottieProps) => {
  return <DotLottieReact src={url} loop autoplay className={className} />;
};
