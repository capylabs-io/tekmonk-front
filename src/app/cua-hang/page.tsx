"use client";
import { useState } from "react";
import { ShopContent } from "@/components/shop/shop-content";
import { InventoryContent } from "@/components/shop/inventory-content";
import { TabNavigation, TabItem } from "@/components/common/TabNavigation";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
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
  const [activeTab, setActiveTab] = useState<string>(TabOptions.SHOP);

  /** UseStore */
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  // Tab switching handler
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="w-full mx-auto max-w-7xl overflow-hidden">
        <div className="flex items-center justify-between px-2">
          <div className="text-primary-900 text-SubheadLg font-medium">
            <span>Cửa hàng</span>
          </div>
          <div className="flex items-center">
            <div className="text-yellow-500 font-semibold">
              {userInfo?.balance}
            </div>
            <Image
              src="/image/home/coin.png"
              alt="coin pic"
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        {activeTab === TabOptions.SHOP ? <ShopContent /> : <InventoryContent />}
      </div>
    </>
  );
}
