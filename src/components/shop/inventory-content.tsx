import Image from "next/image";
import { ShopItemCarousel } from "@/components/shop/shop-item-carousel";
import { ShopItem, ShopItemUser } from "@/types/common-types";

interface InventoryContentProps {
  items: ShopItemUser[];
}

export const InventoryContent = ({ items }: InventoryContentProps) => {
  return (
    <>
      <div className="w-full flex items-center justify-center gap-x-4 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-center h-[256px] mt-4 max-sm:px-12 sm:px-12 max-lg:px-0 rounded-3xl">
        <div className="text-white">
          <div className={`text-[28px] leading-[44px]`}>KHO ĐỒ CỦA TÔI</div>
          <div className="text-bodyMd mt-5">
            Quản lý và sử dụng các vật phẩm bạn đã sở hữu
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

      {/* Items Grid Section */}
      <div className="mt-6">
        {items && items.length > 0 && (
          <h2 className="text-xl font-bold mb-4">VẬT PHẨM CỦA TÔI</h2>
        )}

        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-square relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-lg overflow-hidden">
                  <Image
                    src={item.shop_item.image || "/placeholder-image.jpg"}
                    alt={item.shop_item.name || "Item image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {item.shop_item.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-1"></div>
                    <span className="text-sm">{item.shop_item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 rounded-lg">
            <p className="text-gray-500">Bạn chưa có vật phẩm nào</p>
          </div>
        )}
      </div>
    </>
  );
};
