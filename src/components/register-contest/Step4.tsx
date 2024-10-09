"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const CustomCheckbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center">
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
        checked ? "bg-pink-500 border-pink-500" : "border-pink-500"
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
    <label
      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      Tôi đã đọc, nắm bắt thông tin về giải đấu
    </label>
  </div>
);

export default function Step4() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    // setFormData({ ...formData, termsAccepted: checked })
  };

  return (
    <div className="space-y-2">
      <div className="text-SubheadSm text-gray-950">
        Quý phụ huynh và thí sinh xác nhận đã đọc kỹ thông tin về giải đấu
        <span className="text-red-500">*</span>
      </div>
      <div className="text-bodyMd text-gray-950">
        Thông tin chi tiết xem{" "}
        <span className="text-primary-700 underline">tại đây</span>
      </div>
      <div className="flex items-center space-x-2">
        {/* <CustomCheckbox checked={isChecked} onChange={handleCheckboxChange} /> */}

        <RadioGroup className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="category-A" />
            <div className="text-bodyLg text-black ">
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
}
