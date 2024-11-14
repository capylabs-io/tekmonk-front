"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CONTEST_RULES_DETAILS } from "@/contants/contest/tekmonk";

export const Step4 = ({ updateStatus }: { updateStatus: any }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(false);
    setIsChecked(!isChecked);
    updateStatus();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-950">
        Quý phụ huynh và thí sinh xác nhận đã đọc kỹ thông tin về giải đấu
        <span className="text-red-500 ml-0.5">*</span>
      </h2>
      <p className="text-base text-gray-700">
        Thông tin chi tiết xem{" "}
        <Link
          href={CONTEST_RULES_DETAILS}
          target="_blank"
          className="text-primary-700 underline hover:text-primary-800 transition-colors"
        >
          tại đây
        </Link>
      </p>
    </div>

    <RadioGroup className="pt-2">
      <div
        className="flex items-center space-x-3 hover:cursor-pointer group"
        onClick={handleCheckboxChange}
      >
        <RadioGroupItem 
          value="1" 
          id="category-A" 
          checked={isChecked}
          className="group-hover:border-primary-600" 
        />
        <div className="text-base font-medium text-gray-900 cursor-pointer">
          Tôi đã đọc, nắm bắt thông tin về giải đấu
        </div>
      </div>
    </RadioGroup>

    <div className="space-y-6 pt-4">
      <p className="text-base leading-relaxed text-gray-800">
      Mọi thắc mắc hoặc cần tư vấn vui lòng liên hệ với Ban tổ chức Giải Vô địch Tekmonk Coding Olympiad theo một trong các cách sau:
      </p>
      
      <div className="space-y-4 pl-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 min-w-[80px]">Kênh liên hệ ưu tiên:</span>
          <span className="text-gray-900">Qua email: hello.tekmonk@gmail.com</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 min-w-[80px]">Kênh liên hệ trong trường hợp khẩn cấp:</span>
          <span className="text-gray-900">Qua các số điện thoại: 0858514499 / 0378247797</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 min-w-[80px]">Facebook:</span>
          <Link 
            href="https://m.facebook.com/HocvienTekmonk" 
            className="text-primary-700 hover:text-primary-800 font-medium underline transition-colors"
            target="_blank"
          >
            Tekmonk Coding Olympiad - Giải vô địch lập trình
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 min-w-[80px]">Website:</span>
          <Link 
            href="https://olympiad.tekmonk.edu.vn" 
            className="text-primary-700 hover:text-primary-800 font-medium underline transition-colors"
            target="_blank"
          >
            olympiad.tekmonk.edu.vn
          </Link>
        </div>
      </div>
    </div>
  </div> 
  );
};
