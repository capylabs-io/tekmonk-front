import Image from "next/image";
import { CommonButton } from "../common/button/CommonButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ShopItem, ShopItemEnum } from "@/types/shop";
import { get } from "lodash";

type Props = {
  itemData: ShopItem;
  isShowing: boolean;
  close: () => void;
  onBuy: (quantity: number) => void;
};

const QuantityInput = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) => {
  return (
    <div className="text-SubheadMd flex items-center gap-x-2">
      <div className="text-gray-60">Số lượng:</div>
      <div className="flex items-center gap-x-2">
        <button
          className="w-8 h-8 rounded-full bg-gray-20 flex items-center justify-center text-gray-95"
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          -
        </button>
        <div className="text-gray-95 w-8 text-center">{quantity}</div>
        <button
          className="w-8 h-8 rounded-full bg-gray-20 flex items-center justify-center text-gray-95"
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export const ItemModal = ({ isShowing, close, itemData, onBuy }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Dialog open={isShowing} onOpenChange={close}>
      <DialogContent className="w-[440px] rounded-3xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-HeadingSm text-gray-95">
            Thông tin vật phẩm
          </DialogTitle>
        </DialogHeader>

        <Image
          src={
            get(itemData, "image", "") !== null
              ? get(itemData, "image", "")
              : ""
          }
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
        {itemData.type === ShopItemEnum.STATIONERY ? (
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
        ) : (
          <></>
        )}
        <DialogFooter className="flex justify-between items-center w-full mt-4">
          <CommonButton variant="secondary" onClick={close}>
            Thoát
          </CommonButton>
          <CommonButton onClick={() => onBuy(quantity)}>
            Mua vật phẩm
          </CommonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
