"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { CommonButton } from "@/components/common/button/CommonButton";
import { ShopItem } from "@/types/shop";
import { CardItem } from "./card-item";

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
    <div className="text-primary-900 mt-4">
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
        <CarouselContent className="">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 gap-[2px] p-2 grid place-items-center"
            >
              <CardItem
                image={item.image || ""}
                name={item.name || ""}
                price={item.price || 0}
                description={item.description || ""}
                onClick={() => onItemClick?.(item)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
