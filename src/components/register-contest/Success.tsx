"use client";

import { Check } from "lucide-react";

export default function SuccessComponent () {
    return (
        <div className="text-center space-y-6">
        <div className="flex justify-center">
            <div className="w-[84px] h-[84px] bg-pink-500 rounded-full flex items-center justify-center">
                <Check className="w-[84px] h-[84px] text-white" />
            </div>
        </div>
        <p className="text-bodyLg mx-auto">
            Cảm ơn bạn đã đăng ký tham gia "VIETNAM CODING OLYMPIAD 2024"! Chúng tôi sẽ sớm
            gửi thông tin chi tiết về sự kiện qua email. Hãy chuẩn bị cho những thử thách thú vị phía
            trước!
        </p>
    </div>
    )
    
}