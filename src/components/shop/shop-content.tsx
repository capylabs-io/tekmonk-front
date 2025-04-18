import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetCategories } from "@/requests/category";
import { CategoryBar } from "./category-bar";

export const ShopContent = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => GetCategories(),
  });
  return (
    <div className="w-full">
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
