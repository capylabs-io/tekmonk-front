"use client";
import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { BackgroundCard } from "@/components/shop/BackgroundCard";
import { useBackgroundShops } from "@/lib/hooks/useBackgroundShop";
import { useCustomRouter } from "@/components/common/router/CustomRouter";

export default function BackgroundShop() {
  const router = useCustomRouter();
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
