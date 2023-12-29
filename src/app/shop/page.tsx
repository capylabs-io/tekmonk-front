import React from 'react'
import Image from "next/image";
import { Dela_Gothic_One } from "next/font/google";

const delaGothicOne = Dela_Gothic_One({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-delo",
});
export default function Shop() {
    return (
        <div>
            <div className="text-primary-900 px-6 ">
                <span>Cửa hàng</span>
            </div>
            <div className="w-full flex items-center justify-center gap-x-4 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-center h-[256px] mt-4">
                <div className="text-white">
                    <div className={`${delaGothicOne.className} text-[28px] leading-[44px]`}>
                        LÀM NHIỆM VỤ
                        THU THẬP ĐIỂM
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
        </div>
    )
}
