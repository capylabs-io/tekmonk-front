"use client";
import { ClaimedItem } from "@/types/claimed-item";
import { ShopItemUser } from "@/types/common-types";
import { DialogContent, DialogHeader, DialogTitle } from "../common/Dialog";
import { Dialog } from "../common/Dialog";
import Image from "next/image";
import { CommonButton } from "../common/button/CommonButton";
import { DialogFooter } from "../common/Dialog";
import { useEffect, useState } from "react";
// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface BillCardProps {
  item: ClaimedItem;
}

export const BillCard = ({ item }: BillCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClaimedItem | null>(null);
  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      const timeout = setTimeout(() => {
        setSelectedItem(null);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isDialogOpen]);
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow relative border border-gray-200"
        onClick={() => {
          setSelectedItem(item);
          setIsDialogOpen(true);
        }}
      >
        {/* Status badge in top right */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
            item.status === "claimed"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.status === "claimed" ? "Đã đổi" : "Chờ đổi"}
        </div>

        {/* Item image */}
        <div className="relative w-full h-32 mb-3 max-w-[100px] max-h-[100px]">
          <Image
            src={item.shopItem.image || "/placeholder-image.jpg"}
            alt={item.shopItem.name || "Item image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-gray-900">
            {item.shopItem.name}
          </div>
          <div className="text-sm text-gray-700 flex justify-between">
            <span>Mã:</span>
            <span className="font-medium">{item.code || "N/A"}</span>
          </div>
          <div className="text-sm text-gray-700 flex justify-between">
            <span>Ngày mua:</span>
            <span className="font-medium">{formatDate(item.createdAt)}</span>
          </div>
          <div className="text-sm text-gray-700 flex justify-between">
            <span>Số lượng:</span>
            <span className="font-medium">{item.quantity || 1}</span>
          </div>
          <div className="text-sm text-gray-700 flex justify-between items-center mt-1">
            <span>Tổng giá:</span>
            <span className="font-medium flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
              {(item.shopItem.price || 0) * (item.quantity || 1)}
            </span>
          </div>
        </div>

        {/* Item Detail Dialog */}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="w-[440px] rounded-3xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-HeadingSm text-gray-95">
              Chi tiết vật phẩm
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <>
              <div className="flex flex-col items-center">
                <div className="relative w-[200px] h-[200px] mb-4">
                  <Image
                    src={
                      selectedItem.shopItem.image || "/placeholder-image.jpg"
                    }
                    alt={selectedItem.shopItem.name || "Item image"}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 mt-2">
                <div className="text-SubheadMd flex items-center gap-x-2">
                  <div className="text-gray-60 min-w-[120px]">
                    Tên vật phẩm:
                  </div>
                  <div className="text-gray-95 font-medium">
                    {selectedItem.shopItem.name}
                  </div>
                </div>
                {selectedItem.shopItem.category && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">Loại:</div>
                    <div className="text-gray-95">
                      {selectedItem.shopItem.category.name}
                    </div>
                  </div>
                )}
                <div className="text-SubheadMd flex items-center gap-x-2">
                  <div className="text-gray-60 min-w-[120px]">Giá:</div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                    <span className="text-gray-95">
                      {selectedItem.shopItem.price}
                    </span>
                  </div>
                </div>
                <div className="text-SubheadMd flex items-center gap-x-2">
                  <div className="text-gray-60 min-w-[120px]">Ngày mua:</div>
                  <div className="text-gray-95">
                    {formatDate(selectedItem.createdAt)}
                  </div>
                </div>
                {selectedItem.shopItem.description && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">Mô tả:</div>
                    <div className="text-gray-95 text-sm mt-1">
                      {selectedItem.shopItem.description}
                    </div>
                  </div>
                )}

                {selectedItem?.code && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">
                      Mã sản phẩm:
                    </div>
                    <div className="text-gray-95 text-sm mt-1">
                      {selectedItem.code}
                    </div>
                  </div>
                )}

                {selectedItem?.quantity && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">Số lượng:</div>
                    <div className="text-gray-95 text-sm mt-1">
                      {selectedItem.quantity}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <DialogFooter className="mt-6">
            <CommonButton onClick={() => setIsDialogOpen(false)}>
              Đóng
            </CommonButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
