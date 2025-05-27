import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum TabOptions {
  SHOP = "shop",
  INVENTORY = "inventory",
}

interface ShopInventoryState {
  activeTab: TabOptions;
  setActiveTab: (tab: TabOptions) => void;
}

export const useShopInventoryStore = create<ShopInventoryState>()(
  persist(
    (set) => ({
      activeTab: TabOptions.SHOP,
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "shop-inventory-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
