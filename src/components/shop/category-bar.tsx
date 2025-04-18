"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShopItemCarousel } from "./shop-item-carousel";
import { ReqGetShopItems } from "@/requests/shopItem";
import qs from "qs";
import { ItemModal } from "./ItemModal";
import { useState } from "react";
import { ShopItem } from "@/types/shop";
import { HandleReturnMessgaeErrorLogin } from "@/requests/return-message-error";
import { ReqBuyShopItem } from "@/requests/shop-item-user";
import { error } from "console";
import { useUserStore } from "@/store/UserStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { useCustomRouter } from "../common/router/CustomRouter";

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

  const { data } = useQuery({
    queryKey: ["post-item", categoryId],
    queryFn: async () => {
      const queryString = qs.stringify({
        filters: {
          category: {
            id: {
              $eq: categoryId,
            },
          },
        },
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

  const buyItemMutation = useMutation({
    mutationFn: async (quantity: number) => {
      show();
      if (!userInfo || !itemData) return null;
      const shopItemUser = {
        shop_item: itemData?.id,
        user: userInfo.id,
        quantity: quantity,
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
      const message = HandleReturnMessgaeErrorLogin(err);
      // Show error message
      error("Lỗi", message);
    },
    onSettled: () => {
      setOpenModal(false);
      getMe();
      hide();
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState<ShopItem | null>(null);
  return (
    <div className=" p-2">
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
          onBuy={buyItemMutation.mutate}
        />
      )}
    </div>
  );
};
