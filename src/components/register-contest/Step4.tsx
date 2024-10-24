"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Step4 = ({ updateStatus }: { updateStatus: any }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(false);
    setIsChecked(!isChecked);
    updateStatus();
  };

  return (
    <div className="space-y-2">
      <div className="text-SubheadSm text-gray-950">
        Quý phụ huynh và thí sinh xác nhận đã đọc kỹ thông tin về giải đấu
        <span className="text-red-500">*</span>
      </div>
      <div className="text-bodyMd text-gray-950">
        Thông tin chi tiết xem{" "}
        <Link
          href={"/"}
          target="_blank"
          className="text-primary-700 underline hover:cursor-pointer "
        >
          tại đây
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup className="flex flex-col space-y-2 mt-2">
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={handleCheckboxChange}
          >
            <RadioGroupItem value="1" id="category-A" checked={isChecked} />
            <div className="text-bodyLg text-black">
              Tôi đã đọc, nắm bắt thông tin về giải đấu
            </div>
          </div>
        </RadioGroup>
      </div>
      <div className="text-bodyLg text-gray-950">
        Mọi thắc mắc hoặc cần tư vấn vui lòng liên hệ với Ban Tổ chức Việt Nam
        theo một trong các cách sau:
      </div>
      <div className="text-bodyLg text-gray-950">
        Địa chỉ: Học viện Công Nghệ Tekmonk
      </div>
      <div className="text-bodyLg text-gray-950">Email: tekmonk@gmail.com</div>
      <div className="text-bodyLg text-gray-950">
        Hotline hỗ trợ: 085 851 449 (từ 8h30 đến 17h30 hằng ngày)
      </div>
      <div className="text-bodyLg text-gray-950">Facebook: @tekmonkvn</div>
      <div className="text-bodyLg text-gray-950">Website: tekmonk.vn</div>
    </div>
  );
};
