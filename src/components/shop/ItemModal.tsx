"use client";
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
import {
  useShopInventoryStore,
  TabOptions,
} from "@/store/switch-shop-inventory";
import { useCustomRouter } from "../common/router/CustomRouter";
import { useQuery } from "@tanstack/react-query";
import { ClaimedItem } from "@/types/claimed-item";
import { Copy, CheckCircle } from "lucide-react";
type Props = {
  itemData: ShopItem;
  isShowing: boolean;
  claimedItem?: ClaimedItem;
  close: () => void;
  onBuy: (quantity: number) => void;
  showSuccessDialog: boolean;
  setShowSuccessDialog: (show: boolean) => void;
};

const QuantityInput = ({
  quantity,
  setQuantity,
  currentQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
  currentQuantity: number;
}) => {
  return (
    <div className="text-SubheadMd flex items-center gap-x-2">
      <div className="text-gray-60">Số lượng mua:</div>
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
            if (quantity < currentQuantity) {
              setQuantity(quantity + 1);
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

const SuccessDialog = ({
  itemData,
  claimedItem,
  isOpen,
  onClose,
  goToInventory,
}: {
  itemData: ShopItem;
  claimedItem: ClaimedItem;
  isOpen: boolean;
  onClose: () => void;
  goToInventory: () => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    const code = get(claimedItem, "code", "");
    if (code) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // Handle get Claimed Item with itemData.id
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[440px] rounded-3xl bg-white p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-HeadingSm text-gray-95 text-center">
            Mua vật phẩm thành công!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-y-4 my-4">
          <Image
            src={
              get(itemData, "image", "") !== null
                ? get(itemData, "image", "")
                : "/image/home/coin.png"
            }
            height={120}
            width={120}
            alt={get(itemData, "name", "Item")}
            className="rounded-xl mx-auto object-cover"
          />

          <div className=" rounded-lg p-4 w-full">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-gray-60">Tên vật phẩm:</div>
              <div className="text-gray-95">{get(itemData, "name", "")}</div>

              <div className="text-gray-60">Loại:</div>
              <div className="text-gray-95">
                {get(itemData, "category.name", "")}
              </div>

              <div className="text-gray-60">Số lượng:</div>
              <div className="text-gray-95">
                {get(claimedItem, "quantity", 1)}
              </div>

              <div className="text-gray-60">Tổng tiền:</div>
              <div className="text-gray-95 flex items-center gap-2">
                {get(claimedItem, "quantity", 1) * get(itemData, "price", 1)}
                <Image
                  src="/image/home/coin.png"
                  alt="coin"
                  width={20}
                  height={20}
                />
              </div>

              <div className="text-gray-60">Mã code:</div>
              <div className="text-gray-95 flex items-center gap-2">
                {get(claimedItem, "code", "")}
                {get(claimedItem, "code", "") && (
                  <button
                    onClick={handleCopyCode}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                    title={isCopied ? "Đã sao chép!" : "Copy code"}
                  >
                    {isCopied ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center w-full mt-4">
          <div className="w-full items-center justify-between flex">
            <CommonButton variant="secondary" onClick={onClose}>
              Tiếp tục mua sắm
            </CommonButton>
            <CommonButton onClick={goToInventory}>Đến kho đồ</CommonButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ItemModal = ({
  isShowing,
  close,
  itemData,
  onBuy,
  showSuccessDialog,
  setShowSuccessDialog,
  claimedItem,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = itemData.price ? itemData.price * quantity : 1 * quantity;
  const { setActiveTab } = useShopInventoryStore();
  const router = useCustomRouter();

  const handleOnclose = () => {
    setQuantity(1);
    close();
  };

  const handleBuy = () => {
    onBuy(quantity);
    handleOnclose();
  };

  const goToInventory = () => {
    setShowSuccessDialog(false);
    setActiveTab(TabOptions.INVENTORY);
    router.push("/cua-hang");
  };

  return (
    <>
      <Dialog open={isShowing} onOpenChange={handleOnclose}>
        <DialogContent className="w-[440px] rounded-3xl bg-white p-6 overflow-hidden">
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
              <div className="text-gray-95 max-w-[400px]">{itemData.name}</div>
            </div>
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Loại:</div>
              <div className="text-gray-95">{itemData.category?.name}</div>
            </div>
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Giá:</div>
              <div className="text-gray-95 flex items-center gap-x-2">
                {itemData.price}{" "}
                <Image
                  src="/image/home/coin.png"
                  alt="coin"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="text-SubheadMd flex items-center gap-x-2">
              <div className="text-gray-60">Số lượng trong kho:</div>
              <div className="text-gray-95">{itemData.quantity}</div>
            </div>
          </div>
          {itemData.type === ShopItemEnum.STATIONERY ? (
            <>
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                currentQuantity={itemData.quantity}
              />
              <div className="text-SubheadMd flex items-center gap-x-2">
                <div className="text-gray-60">Tổng tiền:</div>
                <div className="text-gray-95 font-semibold">{totalPrice}</div>
                <Image
                  src="/image/home/coin.png"
                  alt="coin"
                  width={20}
                  height={20}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <DialogFooter className="flex justify-between items-center w-full mt-4">
            <div className="w-full items-center justify-between flex">
              <CommonButton variant="secondary" onClick={handleOnclose}>
                Thoát
              </CommonButton>
              <CommonButton onClick={handleBuy}>Mua vật phẩm</CommonButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {claimedItem && (
        <SuccessDialog
          isOpen={!!claimedItem && showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          itemData={itemData}
          goToInventory={goToInventory}
          claimedItem={claimedItem}
        />
      )}
    </>
  );
};
