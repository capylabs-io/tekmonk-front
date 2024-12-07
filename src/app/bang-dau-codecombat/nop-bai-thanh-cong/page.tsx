"use client";

import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function NopBaiThanhCong () {
    const router = useRouter();
    return (<>
    <div className="min-h-screen w-full max-md:p-2">
      <div className="md:w-[720px]  h-[376px] mt-10 bg-white border border-gray-300 rounded-2xl mx-auto flex flex-col justify-between">
        <div className="w-full border-b border-b-gray-300 h-16 text-SubheadLg text-primary-900 px-8 pt-5">
          Nộp bài thành công
        </div>
        <div className="text-center flex flex-col items-center">
        <div className="w-[84px] h-[84px] bg-pink-500 rounded-full flex items-center justify-center">
          <Image
            alt=""
            src={"/image/icon/done-progress.png"}
            width={84}
            height={84}
          />
        </div>
          <div className="text-xl text-[rgb(42,43,43)] mt-8">
            Chúc mừng bạn đã hoàn thành bài thi. <br/>Kết quả sẽ được công bố sau khi kỳ thi kết thúc.
          </div>
        </div>
        <div className="w-full h-16 border-t border-gray-300 flex justify-between items-center px-14 max-tabletHeader:px-8 max-mobile:px-1">
          <Button
            outlined={true}
            className="border border-gray-300 h-10 !rounded-[3rem] max-tabletHeader:p-1"
            onClick={() => router.push("/")}
          >
            Quay lại trang chủ
          </Button>
          <Button
            className="border border-gray-300 h-10 !rounded-[3rem] max-tabletHeader:p-1"
            onClick={() => router.push("/")}
          >
            Thể lệ cuộc thi
          </Button>
        </div>
      </div>
    </div>
    </>)
}