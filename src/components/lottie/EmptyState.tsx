"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
type EmptyStateProps = {
  className?: string;
};
const url = "/lotties/empty-state.lottie";
export const EmptyState = ({ className }: EmptyStateProps) => {
  return <DotLottieReact src={url} loop autoplay className={className} />;
};
