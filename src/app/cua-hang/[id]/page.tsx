"use client";
import { ReqGetShopItems } from "@/requests/shopItem";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import qs from "qs";
import { ShopItem } from "@/types/shop";
import { useState } from "react";
import { ItemModal } from "@/components/shop/ItemModal";
import { Pagination } from "@/components/common/Pagination";
import { useUserStore } from "@/store/UserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReqBuyShopItem } from "@/requests/shop-item-user";
import { HandleReturnMessgaeErrorLogin } from "@/requests/return-message-error";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { ArrowLeft } from "lucide-react";
import { CardItem } from "@/components/shop/card-item";
import Image from "next/image";
import { ClaimedItem } from "@/types/claimed-item";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { CommonEmptyState } from "@/components/common/CommonEmptyState";
export default function ShopItemDetail() {
  const router = useCustomRouter();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [openModal, setOpenModal] = useState(false);
  const [itemData, setItemData] = useState<ShopItem | null>(null);
  const [claimedItem, setClaimedItem] = useState<ClaimedItem | undefined>(
    undefined
  );

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
    queryKey: ["shop-item", id, currentPage, pageSize],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: "*",
        filters: {
          category: {
            id: Number(id),
          },
        },
        sort: {
          quantity: "desc",
        },
        pagination: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      return await ReqGetShopItems(queryString);
    },
    enabled: !!id,
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
    onSuccess: (data) => {
      success("Xong", "Mua vật phẩm thành công!");
      setShowSuccessDialog(true);
      setClaimedItem(data);
      queryClient.invalidateQueries({ queryKey: ["shop-item", id] });
    },
    onError: (err) => {
      const message = HandleReturnMessgaeErrorLogin(err);
      error("Lỗi", message);
    },
    onSettled: () => {
      getMe();
      hide();
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.meta && currentPage < data.meta.pagination.pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = data?.meta?.pagination?.pageCount || 1;
  const categoryName =
    data?.data && data.data.length > 0 ? data.data[0]?.category?.name : "";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-6 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-SubheadLg text-gray-95">{categoryName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/image/home/coin.png" alt="coin" width={24} height={24} />
          <span className="font-medium text-gray-800">{userInfo?.balance}</span>
        </div>
      </div>

      <div className="container mx-auto p-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {data?.data.map((item, index) => (
            <CardItem
              key={index}
              image={item.image || ""}
              name={item.name || ""}
              price={item.price || 0}
              quantity={item.quantity || 0}
              onClick={() => {
                setItemData(item);
                setOpenModal(true);
              }}
            />
          ))}
        </div>
        {data?.data.length === 0 && <CommonEmptyState />}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onClickPrevPage={handlePrevPage}
              onClickNextPage={handleNextPage}
              onPageClick={handlePageChange}
            />
          </div>
        )}

        {itemData && (
          <ItemModal
            userInfo={userInfo}
            itemData={itemData}
            claimedItem={claimedItem}
            isShowing={openModal}
            close={() => setOpenModal(false)}
            onBuy={buyItemMutation.mutate}
            showSuccessDialog={showSuccessDialog}
            setShowSuccessDialog={setShowSuccessDialog}
          />
        )}
      </div>
    </div>
  );
}
