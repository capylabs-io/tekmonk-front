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
import { ActionGuard } from "../common/ActionGuard";
import { User } from "@/types/common-types";
import { cn } from "@/lib/utils";
type Props = {
  userInfo?: User | null;
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
          {/* <Image
            src={
              get(itemData, "image", "") !== null
                ? get(itemData, "image", "")
                : "/image/home/coin.png"
            }
            height={120}
            width={120}
            alt={get(itemData, "name", "Item")}
            className="rounded-xl mx-auto object-cover"
          /> */}
          <div className="w-[156px] h-[166px] rounded-xl mx-auto relative overflow-hidden border-2 border-gray-30 ">
            <Image
              src={itemData.image || ""}
              alt={itemData.name || ""}
              fill
              className={cn(
                "object-cover absolute ",
                itemData.category && itemData.category.code === "BACK_HAIR"
                  ? "z-[1]"
                  : itemData.category &&
                    (itemData.category.code === "FRONT_HAIR" ||
                      itemData.category.code === "EYE" ||
                      itemData.category.code === "MOUTH")
                  ? "z-[2]"
                  : ""
              )}
            />
            <Image
              src="/image/avatar/cloth/cloth1.svg"
              alt={itemData.name || ""}
              fill
              className={cn(
                "object-cover absolute ",
                itemData.category && itemData.category.code === "BACK_HAIR"
                  ? "z-[2]"
                  : itemData.category &&
                    (itemData.category.code === "FRONT_HAIR" ||
                      itemData.category.code === "EYE" ||
                      itemData.category.code === "MOUTH")
                  ? "z-[1]"
                  : "hidden"
              )}
            />
          </div>
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
  userInfo,
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
    handleOnclose();
    onBuy(quantity);
  };

  const goToInventory = () => {
    setShowSuccessDialog(false);
    setActiveTab(TabOptions.INVENTORY);
    router.push("/cua-hang");
  };

  return (
    <>
      <Dialog open={isShowing} onOpenChange={handleOnclose}>
        <DialogContent className="w-[520px] rounded-3xl bg-white p-6 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-HeadingSm text-gray-95 text-center mb-4">
              Thông tin vật phẩm
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            {/* Image and Basic Info Section */}
            <div className="flex gap-6">
              <div className="w-[156px] h-[166px] flex-shrink-0 border-2 border-gray-30 rounded-xl relative overflow-hidden">
                <Image
                  src={itemData.image || ""}
                  alt={itemData.name || ""}
                  fill
                  className={cn(
                    "object-cover absolute ",
                    itemData.category && itemData.category.code === "BACK_HAIR"
                      ? "z-[1]"
                      : itemData.category &&
                        (itemData.category.code === "FRONT_HAIR" ||
                          itemData.category.code === "EYE" ||
                          itemData.category.code === "MOUTH")
                      ? "z-[2]"
                      : ""
                  )}
                />
                <Image
                  src="/image/avatar/cloth/cloth1.svg"
                  alt={itemData.name || ""}
                  fill
                  className={cn(
                    "object-cover absolute ",
                    itemData.category && itemData.category.code === "BACK_HAIR"
                      ? "z-[2]"
                      : itemData.category &&
                        (itemData.category.code === "FRONT_HAIR" ||
                          itemData.category.code === "EYE" ||
                          itemData.category.code === "MOUTH")
                      ? "z-[1]"
                      : "hidden"
                  )}
                />
              </div>

              <div className="flex-1 flex flex-col gap-3">
                <div className="text-SubheadMd">
                  <div className="text-gray-60 text-sm mb-1">Tên vật phẩm</div>
                  <div className="text-gray-95 font-medium">
                    {itemData.name}
                  </div>
                </div>

                <div className="text-SubheadMd">
                  <div className="text-gray-60 text-sm mb-1">Loại</div>
                  <div className="text-gray-95">{itemData.category?.name}</div>
                </div>

                <div className="text-SubheadMd">
                  <div className="text-gray-60 text-sm mb-1">
                    Số lượng trong kho
                  </div>
                  <div className="text-gray-95">{itemData.quantity}</div>
                </div>
              </div>
            </div>

            {/* Price and Purchase Section */}
            <div className="border-t pt-4">
              <div className="text-SubheadMd mb-4">
                <div className="text-gray-60 text-sm mb-2">Giá</div>
                <div className="text-gray-95 flex items-center gap-2 text-lg font-semibold">
                  {itemData.price}
                  <Image
                    src="/image/home/coin.png"
                    alt="coin"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              {itemData.type === ShopItemEnum.STATIONERY && (
                <div className="space-y-4">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    currentQuantity={itemData.quantity}
                  />

                  <div className="bg-gray-10 rounded-lg p-4">
                    <div className="text-SubheadMd flex items-center justify-between">
                      <span className="text-gray-60">
                        Tiền trong tài khoản:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-95 font-bold text-lg">
                          {Number(userInfo?.balance) - totalPrice > 0
                            ? Number(userInfo?.balance)
                            : 0}
                        </span>
                        <Image
                          src="/image/home/coin.png"
                          alt="coin"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                    <div className="text-SubheadMd flex items-center justify-between">
                      <span className="text-gray-60">Tổng tiền phải trả:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-red-500">
                          {-totalPrice}
                        </span>
                        <Image
                          src="/image/home/coin.png"
                          alt="coin"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                    <div className="text-SubheadMd flex items-center justify-between">
                      <span className="text-gray-60">Số tiền còn lại:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-95 font-bold text-lg">
                          {Number(userInfo?.balance) - totalPrice > 0
                            ? Number(userInfo?.balance) - totalPrice
                            : 0}
                        </span>
                        <Image
                          src="/image/home/coin.png"
                          alt="coin"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-between items-center w-full mt-4">
            <div className="w-full items-center justify-between flex">
              <CommonButton variant="secondary" onClick={handleOnclose}>
                Thoát
              </CommonButton>
              <ActionGuard
                onAction={() => {
                  handleBuy();
                }}
                actionName="Mua vật phẩm"
              >
                <CommonButton>Mua vật phẩm</CommonButton>
              </ActionGuard>
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
