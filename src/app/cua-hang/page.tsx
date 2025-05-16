"use client";
import { ShopContent } from "@/components/shop/shop-content";
import { InventoryContent } from "@/components/shop/inventory-content";
import { TabNavigation, TabItem } from "@/components/common/TabNavigation";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
import {
  useShopInventoryStore,
  TabOptions,
} from "@/store/switch-shop-inventory";
import { AuthGuard } from "@/components/hoc/auth-guard";

// Tab data
const TABS: TabItem[] = [
  { id: TabOptions.SHOP, label: "Cửa hàng" },
  { id: TabOptions.INVENTORY, label: "Kho đồ của tôi" },
];

export default function Shop() {
  // Use the shop inventory store instead of local state
  const { activeTab, setActiveTab } = useShopInventoryStore();

  /** UseStore */
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  // Tab switching handler
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabOptions);
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto overflow-hidden">
        <div className="flex items-center justify-between px-4">
          <div className="text-SubheadLg text-gray-95">
            <span>Cửa hàng</span>
          </div>
        </div>

        {/* Tab Navigation */}
        {
          userInfo?.id &&
          <TabNavigation
            tabs={TABS}
            activeTabId={activeTab}
            onTabChange={handleTabChange}
          />
        }
        {/* Tab Content */}
        {activeTab === TabOptions.SHOP ? <ShopContent /> : <InventoryContent />}
      </div>
    </div>
  );
}
