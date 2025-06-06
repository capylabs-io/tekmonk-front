"use client";
import Image from "next/image";
import { ShopItemUser } from "@/types/common-types";
import { ReqGetUserShopItems } from "@/requests/shop-item-user";
import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { useUserStore } from "@/store/UserStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CommonButton } from "@/components/common/button/CommonButton";
import { ReqGetClaimedItems } from "@/requests/claimed-item";
import { CardItem } from "@/components/shop/card-item";
import { ClaimedItem } from "@/types/claimed-item";
import { BillCard } from "@/components/shop/BillCard";
import { AuthGuard } from "../hoc/auth-guard";
import { CommonEmptyState } from "../common/CommonEmptyState";
import { BannerCard } from "../new/BannerCard";
import { motion } from "framer-motion";
import CommonPagination from "../admin/common-pagination";
import { useShopItem } from "@/hooks/use-shop-item";
import { get } from "lodash";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Tab types
type TabType = "items" | "claimed";

export const InventoryContent = () => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [selectedItem, setSelectedItem] = useState<ShopItemUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemClaimed, setItemClaimed] = useState<ClaimedItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("items");

  const { myItems, page, pageSize, setPage, setPageSize } = useShopItem();

  const { data: claimedItems } = useQuery({
    queryKey: ["claimed-items"],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: "*",
        filters: {
          user: { id: userInfo?.id },
        },
      });
      return await ReqGetClaimedItems(queryString);
    },
  });

  const handleItemClick = (item: ShopItemUser) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedItem(null);
      setItemClaimed(null);
    }
    setIsDialogOpen(open);
  };

  return (
    <div className="w-full">
      <div className="w-full p-4">
        <BannerCard className="w-full rounded-3xl h-[250px]" type="shop">
          <div className="flex flex-col items-center gap-6 z-10 max-w-[300px] text-center">
            <div className="text-HeadingMd text-gray-10">
              Làm nhiệm vụ Thu thập điểm
            </div>
            <div className="text-center text-SubheadSm text-gray-10">
              Tuỳ chỉnh hồ sơ cá nhân cùng với các vật phẩm trong cửa hàng
            </div>
          </div>
        </BannerCard>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-20 mb-6 px-4">
        <button
          className={`py-3 px-6 font-medium text-base ${
            activeTab === "items"
              ? "border-b-4 border-primary-40 text-primary-95"
              : "text-gray-50"
          }`}
          onClick={() => setActiveTab("items")}
        >
          Vật phẩm đã sở hữu
        </button>
        <button
          className={`py-3 px-6 font-medium text-base ${
            activeTab === "claimed"
              ? "border-b-4 border-primary-40 text-primary-95"
              : "text-gray-50"
          }`}
          onClick={() => setActiveTab("claimed")}
        >
          Mã quy đổi vật phẩm
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-2">
        {/* Items Section */}
        {activeTab === "items" && (
          <div className="mt-2">
            {myItems && myItems.data.length > 0 ? (
              <div className="px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {myItems.data.map((item, index) => (
                  <motion.div
                    key={index}
                    className="hover:cursor-pointer py-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <CardItem
                      image={item.shop_item.image || "/placeholder-image.jpg"}
                      name={item.shop_item.name || ""}
                      price={item.shop_item.price || 0}
                      category={item.shop_item.category}
                      onClick={() => handleItemClick(item)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <CommonEmptyState />
              // <div className="text-center py-10 rounded-lg">
              //   <p className="text-gray-500">Bạn chưa có vật phẩm nào</p>
              // </div>
            )}

            {myItems && myItems.data.length > 0 && (
              <div className="flex w-full mx-auto">
                <CommonPagination
                  currentPage={page}
                  itemsPerPage={pageSize}
                  totalItems={get(myItems, "meta?.pagination?.total") || 0}
                  showDetails={false}
                  onPageChange={(page) => setPage(page)}
                  onItemsPerPageChange={(pageSize) => setPageSize(pageSize)}
                />
              </div>
            )}
          </div>
        )}

        {/* Claimed Items Section */}
        {activeTab === "claimed" && (
          <div className="mt-2">
            {claimedItems &&
            claimedItems.data &&
            claimedItems.data.length > 0 ? (
              <div className="px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {claimedItems.data.map((item, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="hover:cursor-pointer py-2"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <BillCard item={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <CommonEmptyState />
              // <div className="text-center py-10 rounded-lg">
              //   <p className="text-gray-500">Bạn chưa có mã quy đổi nào</p>
              // </div>
            )}
            {myItems && myItems.data.length > 0 && (
              <div className="flex w-full mx-auto">
                <CommonPagination
                  currentPage={page}
                  itemsPerPage={pageSize}
                  totalItems={get(myItems, "meta?.pagination?.total") || 0}
                  showDetails={false}
                  onPageChange={(page) => setPage(page)}
                  onItemsPerPageChange={(pageSize) => setPageSize(pageSize)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Item Detail Dialog for regular items (not claimed) */}
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
                      selectedItem.shop_item.image || "/placeholder-image.jpg"
                    }
                    alt={selectedItem.shop_item.name || "Item image"}
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
                    {selectedItem.shop_item.name}
                  </div>
                </div>
                {selectedItem.shop_item.category && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">Loại:</div>
                    <div className="text-gray-95">
                      {selectedItem.shop_item.category.name}
                    </div>
                  </div>
                )}
                <div className="text-SubheadMd flex items-center gap-x-2">
                  <div className="text-gray-60 min-w-[120px]">Giá:</div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                    <span className="text-gray-95">
                      {selectedItem.shop_item.price}
                    </span>
                  </div>
                </div>
                <div className="text-SubheadMd flex items-center gap-x-2">
                  <div className="text-gray-60 min-w-[120px]">Ngày mua:</div>
                  <div className="text-gray-95">
                    {formatDate(selectedItem.createdAt)}
                  </div>
                </div>
                {selectedItem.shop_item.description && (
                  <div className="text-SubheadMd flex items-center gap-x-2">
                    <div className="text-gray-60 min-w-[120px]">Mô tả:</div>
                    <div className="text-gray-95 text-sm mt-1">
                      {selectedItem.shop_item.description}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <DialogFooter className="mt-6">
            <CommonButton onClick={closeDialog}>Đóng</CommonButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
