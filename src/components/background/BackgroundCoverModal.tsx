import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/UserStore";
import { Button } from "@/components/common/button/Button";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Image from "next/image";
import { ReqGetUserShopItems } from "@/requests/shop-item-user";
import qs from "qs";
import { ShopItemUser } from "@/types/common-types";

import { ReqUpdateUser } from "@/requests/user";
interface BackgroundCoverModalProps {
  visible: boolean;
  hide: () => void;
  onSubmit?: () => void;
}

const BackgroundCoverModal = ({
  visible,
  hide,
  onSubmit,
}: BackgroundCoverModalProps) => {
  const [userInfo, getMe] = useUserStore((state) => [
    state.userInfo,
    state.getMe,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCover, setSelectedCover] = useState<number | null>(null);
  const itemsPerPage = 12;
  const [showSuccess, showError] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);

  // Query để lấy danh sách background cover từ shop
  const { data: dataShopItemUser } = useQuery({
    queryKey: ["my-background-cover"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          populate: ["shop_item", "shop_item.category", "user"],
          filters: {
            $and: [
              {
                user: {
                  id: userInfo?.id,
                },
              },
              {
                shop_item: {
                  category: {
                    code: "COVER",
                  },
                },
              },
            ],
          },
        });
        return await ReqGetUserShopItems(queryString);
      } catch (error) {
        console.log("Error: ", error);
        return { data: [] };
      }
    },
  });

  const { mutate: updateBackgroundCover } = useMutation({
    mutationKey: ["update-background-cover", selectedCover],
    mutationFn: async () => {
      if (!selectedCover) return;
      const data = {
        backgroundCover: selectedCover,
      };
      const res = await ReqUpdateUser(userInfo?.id?.toString() || "", data);
      return res;
    },
    onSuccess: () => {
      getMe();
      hide();
      onSubmit && onSubmit();
      showSuccess(
        "Cập nhật ảnh bìa thành công",
        "Vui lòng xem lại ảnh bìa của bạn"
      );
    },
    onError: (error) => {
      console.log("Error: ", error);
      showError("Cập nhật ảnh bìa thất bại", "Vui lòng thử lại sau");
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectCover = (coverId: number) => {
    setSelectedCover(coverId);
  };

  return visible ? (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <div className="relative mx-auto w-[70%] flex flex-col h-[80%] rounded-3xl bg-white overflow-y-auto p-6">
        <div className="text-HeadingSm">Tuỳ chỉnh ảnh bìa</div>

        <div className="w-full h-full p-4 bg-gray-10 rounded-2xl border-2 border-gray-30 overflow-y-auto mt-4">
          <div className="grid grid-cols-3 gap-4 h-max">
            {dataShopItemUser?.data
              .filter(
                (item: ShopItemUser) => item.shop_item.category.code === "COVER"
              )
              ?.map((item: ShopItemUser) => (
                <div
                  key={item.id}
                  className={`cursor-pointer border-2 rounded-lg p-1 ${
                    selectedCover === item.shop_item.id
                      ? "border-primary-70"
                      : "border-gray-30"
                  }`}
                  onClick={() => handleSelectCover(item.shop_item.id || 0)}
                >
                  <Image
                    src={item.shop_item.image || ""}
                    alt={item.shop_item.name || ""}
                    width={100}
                    height={32}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              ))}
          </div>
        </div>

        <hr className="border-t border-gray-30 mt-4" />
        <div className="flex justify-between w-full p-4">
          <Button
            className="!bg-gray-00 border border-gray-20 !text-primary-95 w-[100px]"
            onClick={hide}
            style={{
              boxShadow: "0px 4px 0px #ebe4ec",
            }}
          >
            <div className="!text-sm !font-normal">Thoát</div>
          </Button>
          <Button
            className="w-[150px] !font-medium border border-primary-70"
            onClick={() => updateBackgroundCover()}
            style={{
              boxShadow: "0px 4px 0px #9a1595",
            }}
          >
            <div className="!text-sm !font-normal">Xác nhận</div>
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default BackgroundCoverModal;
