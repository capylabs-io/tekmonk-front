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
import { ShopItem, ShopItemEnum } from "@/types/shop";
import { CardItem } from "./card-item";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
          className="inline-flex items-center cursor-pointer"
          onClick={onClickDetail}
        >
          <span className="text-SubheadMd text-gray-95">{title}</span>
          <ChevronRight className="ml-1 h-4 w-4 text-gray-95" />
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
              className={cn(
                "basis-full sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 gap-[2px] grid place-items-center py-2 hover:cursor-pointer",
                item.type == ShopItemEnum.DEFAULT && "hidden"
              )}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <CardItem
                  image={item.image || ""}
                  name={item.name || ""}
                  price={item.price || 0}
                  category={item.category}
                  quantity={item.quantity || 0}
                  onClick={() => onItemClick?.(item)}
                />
               
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
