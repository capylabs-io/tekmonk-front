"use client";

import ContestHeader from "@/components/layout/header";
import Image from "next/image";

export default function ContestLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative z-10">
      <Image
        src="/image/contest/layer_bg.png"
        alt="Background"
        fill
        priority
        quality={40}
        className="z-0"
      />
      <ContestHeader />
      <div className="max-w-[1440px] mx-auto border border-t-0 border-gray-300 text-gray-800 relative z-10">
        {children}
      </div>
    </div>
  );
}
