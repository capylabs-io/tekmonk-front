"use client";

import React from "react";
import { CommonButton } from "../common/button/CommonButton";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GridPattern from "../ui/grid-pattern";
import { LAYERS } from "@/contants/layer";

type Props = {
  className?: string;
  children?: React.ReactNode;
  bgImage?: string;
  isHiring?: boolean;
};

const IconShowBannerHiring = ({ isHiring }: Props) => {
  return (
    <>
      <Image
        alt="character"
        src="/image/landing/human1.png"
        width={323}
        height={220}
        className="object-contain absolute -bottom-[120px] -right-10 z-10 lg:block hidden"
      />
      <Image
        alt="icon-left"
        src="/image/landing/left-top-stars.png"
        width={89}
        height={87}
        className="object-contain absolute left-20 top-20 z-0 lg:block hidden"
      />

      <Image
        alt="icon-middle"
        src={isHiring ? "/image/landing/background-hiring-text.png" : "/image/landing/background-event-text.png"}
        width={1000}
        height={300}
        className="object-contain absolute -bottom-10 left-1/2 -translate-x-1/2 lg:block hidden"
      />
      <Image
        alt="icon-right"
        src="/image/landing/top-right-stars.png"
        width={120}
        height={120}
        className="object-contain absolute right-10 top-10 z-0 lg:block hidden"
      />
      <Image
        alt="icon-right"
        src="/image/landing/bottom-left-stars.png"
        width={54}
        height={38}
        className="object-contain absolute left-[300px] bottom-[120px] z-0 lg:block hidden"
      />
    </>
  );
};

export const BannerCard = ({ children, className, bgImage, isHiring }: Props) => {
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
      <IconShowBannerHiring isHiring={isHiring} />
    </div>
  );
};
