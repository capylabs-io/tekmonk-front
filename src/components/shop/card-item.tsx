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
  return (
    <div
      className={`flex flex-col items-start p-0 gap-2 w-[156px] ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      {/* Image Container */}
      <div className="w-[156px] h-[166px] border-2 border-gray-30 rounded-lg relative overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover absolute" />
      </div>

      {/* Name and Price Box */}
      <div className="flex flex-col items-start p-0 gap-2 w-full">
        {/* Item Name */}
        <div className="w-full text-BodySm h-[20px]  text-gray-95 line-clamp-1">
          {name}
        </div>

        {/* Price with Coin Icon */}
        <div className="flex flex-row items-center justify-between w-full h-[16px]">
          <div className="flex flex-row items-center h-[16px] gap-1">
            <Image
              src="/image/home/coin.png"
              alt="coin pic"
              width={24}
              height={24}
            />
            <span className="text-SubheadXs text-grey-70">{price}</span>
          </div>
          {
            quantity && quantity <= 0 ? (
              <div className="text-SubheadXs text-[#B52224]">Hết hàng</div>
            ) : quantity && quantity > 0 ? (
              <div className="text-SubheadXs text-gray-60">
                SL: {quantity}
              </div>
            ) :
              <>
              </>
          }
        </div>
      </div>
    </div>
  );
};
