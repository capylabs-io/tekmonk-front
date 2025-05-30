"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/requests/category";
import { CategoryBar } from "./category-bar";
import { BannerCard } from "../new/BannerCard";
import { CommonEmptyState } from "../common/CommonEmptyState";

export const ShopContent = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => GetCategories(),
  });

  return (
    <div className="w-full">
      <div className="w-full p-4">
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
      </div>
      {categories?.data?.map((category) => (
        <CategoryBar
          key={category.id}
          categoryId={Number(category.id)}
          categoryName={category.name}
        />
      ))}
      {
        categories?.data?.length === 0 && (
          <CommonEmptyState />
        )
      }
    </div>
  );
};
