"use client";

import React, { useMemo } from "react";
import { CommonButton } from "../common/button/CommonButton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GridPattern from "../ui/grid-pattern";
import { LAYERS } from "@/contants/layer";

type Props = {
  className?: string;
  children?: React.ReactNode;
  bgImage?: string;
  type?: string;
};


const IconShowBannerHiring = ({ type }: Props) => {
  const backgroundText = useMemo(() => {
    switch (type) {
      case "hiring":
        return "/image/landing/background-hiring-text.png"
      case "event":
        return "/image/landing/background-event-text.png"
      case "shop":
        return "/image/landing/background-store-text.png"
      default:
        return ""
    }
  }, [type])
  return (
    <>
      <Image
        alt="character"
        src="/image/landing/human1.png"
        width={type === "shop" ? 180 : 323}
        height={type === "shop" ? 220 : 220}
        className={`object-contain absolute ${type === "shop" ? "bottom-[5px] right-4" : "-bottom-[120px] -right-10"} z-10 lg:block`}
      />
      <Image
        alt="icon-left"
        src="/image/landing/left-top-stars.png"
        width={type === "shop" ? 60 : 89}
        height={type === "shop" ? 76 : 87}
        className={`object-contain absolute ${type === "shop" ? "left-10 top-10" : "left-20 top-20"} z-0 lg:block`}
      />

      <Image
        alt="icon-middle"
        src={backgroundText}
        width={type === "shop" ? 800 : 1000}
        height={300}
        className="object-contain absolute -bottom-5 left-1/2 -translate-x-1/2 lg:block z-0"
      />
      <Image
        alt="icon-right"
        src="/image/landing/top-right-stars.png"
        width={120}
        height={120}
        className={`object-contain absolute ${type === "shop" ? "lg:hidden" : "lg:block"} z-0`}
      />
      <Image
        alt="icon-right"
        src="/image/landing/bottom-left-stars.png"
        width={type === "shop" ? 30 : 54}
        height={type === "shop" ? 20 : 38}
        className={`object-contain absolute ${type === "shop" ? "left-24 bottom-10" : "left-[300px] bottom-[120px]"} z-0 lg:block`}
      />
    </>
  );
};

export const BannerCard = ({ children, className, bgImage, type }: Props) => {
  return (
    <div className={cn("overflow-hidden w-full h-[600px] relative", className)}>
      <div
        className="h-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center gap-9 overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage || "/image/landing/background-cover.png"
            })`,
        }}
      >
        {children}
      </div>
      {/* Show icon, character here */}
      <IconShowBannerHiring type={type} />
    </div>
  );
};
