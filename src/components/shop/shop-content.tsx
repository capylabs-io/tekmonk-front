"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/requests/category";
import { CategoryBar } from "./category-bar";
import { BannerCard } from "../new/BannerCard";

export const ShopContent = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => GetCategories(),
  });

  return (
    <div className="w-full">
      <BannerCard className="w-full rounded-3xl h-[250px]" type="shop">
        <div className="flex flex-col items-center gap-6 z-10 max-w-[300px] text-center">
          <div className="text-HeadingMd text-gray-10">
            Làm nhiệm vụ
            Thu thập điểm
          </div>
          <div className="text-center text-SubheadSm text-gray-10">
            Tuỳ chỉnh hồ sơ cá nhân cùng với các vật phẩm trong cửa hàng
          </div>
        </div>
      </BannerCard>
      {/* <div className="w-full px-4">
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
        
      </div> */}

      {categories?.data?.map((category) => (
        <CategoryBar
          key={category.id}
          categoryId={Number(category.id)}
          categoryName={category.name}
        />
      ))}
    </div>
  );
};
