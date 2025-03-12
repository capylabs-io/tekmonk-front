"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { CommonButton } from "@/components/common/button/CommonButton";
import { ShopItem } from "@/types/common-types";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

interface ShopItemCarouselProps {
  items: ShopItem[];
  title: string;
  onItemClick?: (item: ShopItem) => void;
  onClickDetail?: () => void;
}

export const ShopItemCarousel = ({
  items,
  title,
  onItemClick,
  onClickDetail,
}: ShopItemCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="text-primary-900 px-4 mt-8">
      <div className="w-full flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={onClickDetail}
        >
          <span className="text-SubheadMd font-semibold">{title}</span>
          <ChevronRight className="ml-1 h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          <CommonButton
            variant="secondary"
            wrapperClassName="!p-[6px]"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft size={16} />
          </CommonButton>
          <CommonButton
            variant="secondary"
            wrapperClassName="!p-[6px]"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight size={16} />
          </CommonButton>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mt-5"
        setApi={setApi}
      >
        <CarouselContent className="-ml-4">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <div
                className="bg-white rounded-lg overflow-hidden cursor-pointer"
                onClick={() => onItemClick && onItemClick(item)}
              >
                <div className="aspect-square relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.image}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                    <span className="text-sm">{item.price}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
