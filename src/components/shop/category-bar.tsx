"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShopItemCarousel } from "./shop-item-carousel";
import { ReqGetShopItems } from "@/requests/shopItem";
import qs from "qs";
import { ItemModal } from "./ItemModal";
import { useEffect, useState } from "react";
import { ShopItem, ShopItemEnum } from "@/types/shop";
import { HandleReturnMessgaeErrorLogin } from "@/requests/return-message-error";
import { ReqBuyShopItem } from "@/requests/shop-item-user";
import { useUserStore } from "@/store/UserStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { useCustomRouter } from "../common/router/CustomRouter";
import { cn } from "@/lib/utils";
import { ClaimedItem } from "@/types/claimed-item";

export const CategoryBar = ({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}) => {
  const router = useCustomRouter();
  const [userInfo, getMe] = useUserStore((state) => [
    state.userInfo,
    state.getMe,
  ]);
  const [success, error] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const queryClient = useQueryClient();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [claimedItem, setClaimedItem] = useState<ClaimedItem | undefined>(
    undefined
  );
  const { data } = useQuery({
    queryKey: ["shop-item", categoryId],
    queryFn: async () => {
      const queryString = qs.stringify({
        filters: {
          category: {
            id: {
              $eq: categoryId,
            },
          },
        },
        sort: "createdAt:desc",
        pagination: {
          pageSize: 10,
          page: 1,
        },
        populate: "*",
      });
      const response = await ReqGetShopItems(queryString);
      return response;
    },
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  const handleBuyItem = async (quantity: number) => {
    try {
      show();
      if (!userInfo || !itemData) return null;

      const shopItemUser = {
        shop_item: itemData?.id,
        user: userInfo.id,
        quantity: quantity,
      };

      const res = await ReqBuyShopItem(shopItemUser);

      success("Xong", "Mua vật phẩm thành công!");
      setClaimedItem(res);
      queryClient.invalidateQueries({ queryKey: ["shop-item", categoryId] });
      setShowSuccessDialog(true);
    } catch (err) {
      const message = HandleReturnMessgaeErrorLogin(err);
      error("Lỗi", message);
      return null;
    } finally {
      getMe();
      hide();
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState<ShopItem | null>(null);
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    if (data?.data?.length === 0) {
      setIsShow(false);
    }

    // Handle if all data in this category have type is ShopItemEnum.VIRTUAL
    if (data?.data?.every((item) => item.type === ShopItemEnum.VIRTUAL)) {
      setIsShow(false);
    }
  }, [data]);
  return (
    <div className={cn("p-4", !isShow && "hidden")}>
      <ShopItemCarousel
        items={data?.data || []}
        title={categoryName}
        onItemClick={(item) => {
          setItemData(item);
          setOpenModal(true);
        }}
        onClickDetail={() => router.push(`/cua-hang/${categoryId}`)}
      />

      {itemData && (
        <ItemModal
          itemData={itemData}
          isShowing={openModal}
          close={() => setOpenModal(false)}
          onBuy={handleBuyItem}
          showSuccessDialog={showSuccessDialog}
          setShowSuccessDialog={setShowSuccessDialog}
          claimedItem={claimedItem}
        />
      )}
    </div>
  );
};
