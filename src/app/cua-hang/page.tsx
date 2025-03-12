"use client";
import React, { useState } from "react";
import { ItemModal } from "@/components/shop/ItemModal";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReqGetShopItems } from "@/requests/shopItem";
import { ReqBuyShopItem, ReqGetUserShopItems } from "@/requests/shop-item-user";
import qs from "qs";
import { CategoryCode, ShopItem, ShopItemUser } from "@/types/common-types";
import { ShopContent } from "@/components/shop/shop-content";
import { InventoryContent } from "@/components/shop/inventory-content";
import { TabNavigation, TabItem } from "@/components/common/TabNavigation";
import { useUserStore } from "@/store/UserStore";
import { toast } from "react-toastify";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";

// Tab options
enum TabOptions {
  SHOP = "shop",
  INVENTORY = "inventory",
}

// Tab data
const TABS: TabItem[] = [
  { id: TabOptions.SHOP, label: "Cửa hàng" },
  { id: TabOptions.INVENTORY, label: "Kho đồ của tôi" },
];

export default function Shop() {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(TabOptions.SHOP);
  const [itemData, setItemData] = useState<ShopItem>({
    id: "",
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  /** UseStore */
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [success, error] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const queryClient = useQueryClient();

  /** UseQuery */
  const { data: avatarItems } = useQuery({
    queryKey: ["avatar-items"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
          filters: {
            category: {
              code: CategoryCode.AVATAR,
            },
          },
          pagination: {
            page: 1,
            pageSize: 10,
          },
        });
        return await ReqGetShopItems(queryString);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  const { data: backgroundItems } = useQuery({
    queryKey: ["background-items"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
          filters: {
            category: {
              code: CategoryCode.BACKGROUND,
            },
          },
          pagination: {
            page: 1,
            pageSize: 10,
          },
        });
        return await ReqGetShopItems(queryString);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
  });

  // Query for user's inventory items
  const { data: myItems } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: "*",
          // Add appropriate filters for user's items
          pagination: {
            page: 1,
            pageSize: 20,
          },
        });
        return await ReqGetUserShopItems();
      } catch (error) {
        console.log("Error: ", error);
        return { data: [] };
      }
    },
  });

  /** Handle Buy item here */
  const buyItemMutation = useMutation({
    mutationFn: async () => {
      show();
      if (!userInfo) return null;
      console.log("itemData", itemData);
      const shopItemUser = {
        // Add any other required fields for your ShopItemUser type
        shop_item: itemData.id,
        user: userInfo.id,
      };
      return await ReqBuyShopItem(shopItemUser);
    },
    onSuccess: () => {
      // Close the modal
      setOpenModal(false);
      success("Xong", "Mua vật phẩm thành công!");

      // Invalidate relevant queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["my-items"] });
      queryClient.invalidateQueries({ queryKey: ["user-points"] }); // If you have a query for user points
    },
    onError: (err) => {
      // Show error message
      error("Lỗi", "Có lỗi xảy ra vui lòng thử lại sau");
    },
    onSettled: () => {
      setOpenModal(false);
      hide();
    },
  });

  const handleBackgroundClick = (item: ShopItem) => {
    setOpenModal(true);
    setItemData(item);
  };

  const handleAvatarClick = (item: ShopItem) => {
    setOpenModal(true);
    setItemData(item);
  };

  // Tab switching handler
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="w-full mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between px-2">
          <div className="text-primary-900 text-SubheadLg font-medium">
            <span>Cửa hàng</span>
          </div>
          <div className="flex items-center">
            <div className="text-yellow-500 font-semibold">
              {userInfo?.balance}
            </div>
            <div className="w-6 h-6 rounded-full bg-yellow-500 ml-2"></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        {activeTab === TabOptions.SHOP ? (
          <ShopContent
            backgroundItems={backgroundItems}
            avatarItems={avatarItems}
            handleBackgroundClick={handleBackgroundClick}
            handleAvatarClick={handleAvatarClick}
          />
        ) : (
          <InventoryContent items={myItems?.data || []} />
        )}
      </div>

      <ItemModal
        itemData={itemData}
        isShowing={openModal}
        close={() => setOpenModal(false)}
        onBuy={buyItemMutation.mutate}
      />
    </>
  );
}
