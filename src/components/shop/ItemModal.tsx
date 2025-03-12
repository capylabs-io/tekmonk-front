import { useProfileStore } from "@/store/ProfileStore";
import { X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Button } from "../common/button/Button";
import { InputFileUpdload } from "../common/InputFileUpload";
import { InputTags } from "../contest/InputTags";
import { ShopItem } from "@/types/common-types";
import { CommonButton } from "../common/button/CommonButton";
type Props = {
  itemData: ShopItem;
  isShowing: boolean;
  close: () => void;
  onBuy: () => void;
};
export const ItemModal = ({ isShowing, close, itemData, onBuy }: Props) => {
  return (
    isShowing && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
        <div className="relative mx-auto flex w-[440px] flex-col justify-center gap-y-4 rounded-3xl bg-white p-6">
          <div className="text-HeadingSm text-gray-95">Thông tin vật phẩm</div>
          <Image
            src={itemData.image}
            height={200}
            width={200}
            alt="test"
            className="rounded-xl mx-auto"
          />
          <div className="flex flex-col gap-y-2">
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Tên:</div>
              <div className="text-gray-95">{itemData.name}</div>
            </div>
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Loại:</div>
              <div className="text-gray-95">{itemData.category?.name}</div>
            </div>
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Giá:</div>
              <div className="text-gray-95">{itemData.price}</div>
            </div>
          </div>

          <div className="flex justify-between w-ful">
            <CommonButton variant="secondary" onClick={close}>
              <div className="!text-sm !font-normal"> Thoát</div>
            </CommonButton>
            <CommonButton onClick={onBuy}>
              <div className="!text-sm !font-normal"> Mua vật phẩm</div>
            </CommonButton>
          </div>
        </div>
      </div>
    )
  );
};
