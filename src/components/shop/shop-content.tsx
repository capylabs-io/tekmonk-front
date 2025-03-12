import Image from "next/image";
import { ShopItemCarousel } from "@/components/shop/shop-item-carousel";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

interface ShopContentProps {
  backgroundItems: any;
  avatarItems: any;
  handleBackgroundClick: (item: any) => void;
  handleAvatarClick: (item: any) => void;
}

export const ShopContent = ({
  backgroundItems,
  avatarItems,
  handleBackgroundClick,
  handleAvatarClick,
}: ShopContentProps) => {
  const router = useCustomRouter();
  return (
    <>
      <div className="px-4 w-full flex items-center justify-center gap-x-4 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-center h-[256px] mt-4 max-sm:px-12 sm:px-12 max-lg:px-0 rounded-3xl">
        <div className="text-white">
          <div className={`text-[28px] leading-[44px]`}>
            LÀM NHIỆM VỤ THU THẬP ĐIỂM
          </div>
          <div className="text-bodyMd mt-5">
            Tuỳ chỉnh profile cá nhân cùng với các vật phẩm trong cửa hàng
          </div>
        </div>
        <Image
          src="/image/recruitment/recruitment-pic.png"
          alt="left banner"
          className=""
          width={222}
          height={200}
        />
      </div>

      <hr className="border-t border-gray-200 my-4" />

      {/* HÌNH NỀN Section */}
      {backgroundItems && (
        <ShopItemCarousel
          items={backgroundItems?.data}
          title="HÌNH NỀN"
          onItemClick={handleBackgroundClick}
          onClickDetail={() => router.push(ROUTE.SHOP + ROUTE.BACKGROUND_SHOP)}
        />
      )}

      {/* ẢNH ĐẠI DIỆN Section */}
      {avatarItems && (
        <ShopItemCarousel
          items={avatarItems?.data}
          title="ẢNH ĐẠI DIỆN"
          onItemClick={handleAvatarClick}
          onClickDetail={() => router.push(ROUTE.SHOP + ROUTE.AVATAR_SHOP)}
        />
      )}
    </>
  );
};
