"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
type Props = {
  image: string;
  name: string;
  price: number;
  quantity?: number;
  onClick: () => void;
  className?: string;
};

export const CardItem = ({
  image,
  name,
  price,
  quantity,
  onClick,
  className,
}: Props) => {
  console.log("quantity", quantity);
  return (
    <div
      className={`flex flex-col items-start p-0 gap-2 w-[156px] h-[204px] ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      {/* Image Container */}
      <div className="box-border w-[156px] h-[166px] border border-[#DDD0DD] rounded-lg relative overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover absolute" />
      </div>

      {/* Name and Price Box */}
      <div className="flex flex-col items-start p-0 w-[156px] h-[40px] gap-1">
        {/* Item Name */}
        <h3 className="w-full uppercase h-[20px] text-SubheadMd text-gray-95 truncate">
          {name}
        </h3>

        {/* Price with Coin Icon */}
        <div className="flex flex-row items-center justify-between w-full p-0 gap-1 h-[16px]">
          <div className="flex flex-row items-center p-0 gap-1 h-[16px]">
            <Image
              src="/image/home/coin.png"
              alt="coin pic"
              width={24}
              height={24}
            />
            <span className="text-BodyXs text-gray-95">{price}</span>
          </div>

          {quantity !== undefined && quantity <= 0 && (
            <div className="text-BodyXs text-[#B52224]">Hết hàng</div>
          )}
        </div>
      </div>
    </div>
  );
};
