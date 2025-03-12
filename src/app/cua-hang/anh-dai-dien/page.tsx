"use client";
import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { BackgroundCard } from "@/components/shop/BackgroundCard";
import { useRouter } from "next/navigation";
import { useBackgroundShops } from "@/lib/hooks/useBackgroundShop";

export default function AvatarShop() {
  const router = useRouter();
  const backgroundShops = useBackgroundShops();

  return (
    <div>
      <div
        className="text-primary-900 px-6 cursor-pointer"
        onClick={() => router.back()}
      >
        <span className="flex gap-x-3">
          <ArrowLeft className="text-gray-600" size={24} /> HÌNH NỀN
        </span>
      </div>
      <div className="w-full flex items-center justify-center gap-x-4 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-center h-[256px] mt-5 max-sm:px-12 sm:px-12 max-lg:px-0">
        <div className="text-white">
          <div className=" text-[28px] leading-[44px]">
            LÀM NHIỆM VỤ THU THẬP ĐIỂM
          </div>
          <div className="text-bodyMd mt-5">
            Tuỳ chỉnh profile cá nhân cùng với các vật phẩm trong cửa hàng
          </div>
        </div>
        <Image
          src="/image/recruitment/recruitment-pic.png"
          alt="left banner"
          className=""
          width={222}
          height={200}
        />
      </div>
      <div className="mt-5 flex flex-wrap gap-4 overflow-hidden px-4">
        {backgroundShops.map((background, index) => {
          return (
            <BackgroundCard
              imageUrl={background.image}
              title={background.title}
              price={background.price}
              key={background.title}
            />
          );
        })}
      </div>
    </div>
  );
}
