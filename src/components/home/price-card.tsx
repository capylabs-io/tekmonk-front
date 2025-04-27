"use client";
import React from "react";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  price: string;
  customClassName?: string;
};
const BASE_CLASS =
  "rounded-xl border border-gray-200 p-4 flex justify-between text-primary-900 items-center";
export const PriceCard = ({ price, customClassName }: Props) => {
  return (
    <div className={classNames(BASE_CLASS, customClassName)}>
      <span className="text-SubheadMd text-gray-95 uppercase">TIỀN</span>
      <div className="flex gap-x-1">
        <span className="font-bold text-base">{price}</span>
        <Image
          src="/image/home/coin.png"
          alt="coin pic"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};
