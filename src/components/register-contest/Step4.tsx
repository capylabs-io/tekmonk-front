"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";
const CustomCheckbox = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <div className="flex items-center">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
          checked ? 'bg-pink-500 border-pink-500' : 'border-pink-500'
        }`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer" onClick={() => onChange(!checked)}>
        Tôi đã đọc, nắm bắt thông tin về giải đấu
      </label>
    </div>
  )

export default function Step4() {
    const router = useRouter()
    const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
    // setFormData({ ...formData, termsAccepted: checked })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
      <CustomCheckbox checked={isChecked} onChange={handleCheckboxChange} />
        <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Quý phụ huynh và thí sinh xác nhận đã đọc kỹ thông tin về giải đấu <span className="text-red-500">*</span>
        </Label>
      </div>
      <div className="text-sm text-blue-600">
        <div className="underline" onClick={() => router.push("/contest")}>Thông tin chi tiết xem tại đây</div>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm mb-4">
            Mọi thắc mắc hoặc cần tư vấn vui lòng liên hệ với Ban Tổ Chức Việt Nam theo một trong các cách sau:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Địa chỉ:</strong> Học viện Công Nghệ Tekmonk</p>
            <p><strong>Email:</strong> tekmonk@gmail.com</p>
            <p><strong>Hotline hỗ trợ:</strong> 085 851 4499 (từ 8h30 đến 17h30 hàng ngày)</p>
            <p><strong>Facebook:</strong> @tekmonkvn</p>
            <p><strong>Website:</strong> tekmonk.vn</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

}