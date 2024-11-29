"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Kanit, Dela_Gothic_One } from "next/font/google";
import { useRouter } from "next/navigation";
import { FunnelCard } from "@/components/funnel/FunnelCard";

const kanit = Kanit({ weight: "400", subsets: ["latin"] });
const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});



export default function Landing() {
  const router = useRouter();
  // phụ huynh
  const handleCardClick = () => {
    window.open("https://tekmonk.edu.vn/");
  };
  //học viên
  const handleCard1Click = () => {
    router.push("/landing");
  };
  //giảng viên
  const handleCard2Click = () => {
    router.push("/landing");
  };
  //menu tuyển dụng
  const handleMenuClick = () => {
    router.push("/recruitment");
  };
  return (
    <>
      <div className="h-screen relative">
        <nav className="w-full flex justify-between p-4">
          <Image
            src="/image/app-logo.png"
            alt="app logo"
            width={159}
            height={32}
          />
          <ul className="flex items-center gap-4">
            <li className="cursor-pointer hover:text-primary-600">
              <a href="https://tekmonk.edu.vn/category/san-pham-hoc-vien/">
                Sản Phẩm
              </a>
            </li>
            <li
              className="cursor-pointer hover:text-primary-600"
              onClick={handleMenuClick}
            >
              Tuyển dụng
            </li>
            <li className="cursor-pointer hover:text-primary-600">
              <a href="https://tekmonk.edu.vn/gioi-thieu/">Về chúng tôi</a>
            </li>
          </ul>
        </nav>
        <div className="w-full relative flex justify-center max-h-[360px] z-20">
          <Image
            src="/image/home/left-banner-2.png"
            alt="left banner"
            className="absolute left-0 mt-16"
            width={350}
            height={350}
          />
          <Image
            src="/image/landing/right-banner-pic.png"
            alt="right banner"
            className="absolute right-0 mt-16"
            width={320}
            height={320}
          />
        </div>
        <div className="z-50 flex flex-col items-center text-center justify-center w-full mt-16">
          <div
            className={`mt-3 text-[64px] text-primary-950 font-[600px] ${kanit.className} w-2/5 leading-[72px]`}
          >
            Vui chơi, sáng tạo và kết nối cộng đồng
          </div>
          <div className="text-2xl font-bold text-gray-500 w-1/4 mt-6 leading-[32px]">
            Được tin dùng bởi hàng nghìn học sinh và phụ huynh của Tekmonk
          </div>
        </div>
        <div className="bg-cover w-full h-[400px] 2xl:h-[500px] bg-gradient-to-t from-[#E079D4]/80 to-[#EE94E5]/10 fixed -bottom-8 2xl:bottom-0 flex justify-center items-center gap-x-8 rounded-t-[50%] z-0 scale-105"></div>
        <Image
          src="/image/landing/left-stars.png"
          alt="coin"
          width={60}
          height={77}
          className="fixed top-24 left-[20%] scale-110"
        />
        <Image
          src="/image/landing/middle-stars.png"
          alt="coin"
          width={60}
          height={53}
          className="fixed top-16 left-[50%] scale-110"
        />
        <Image
          src="/image/landing/right-stars.png"
          alt="coin"
          width={120}
          height={114}
          className="fixed top-24 right-[18%] scale-110"
        />
        <Image
          src="/image/landing/coins-x15.png"
          alt="coin"
          width={160}
          height={160}
          className="fixed bottom-20 left-20 scale-110"
        />
        <Image
          src="/image/landing/fire-x15.png"
          alt="coin"
          width={160}
          height={160}
          className="fixed -bottom-16 right-20 rotate-[-10deg] scale-125"
        />
        <div className="w-full text-SubheadXl text-center mt-24 2xl:mt-60 text-primary-950">
          Bắt đầu với vai trò...
        </div>
        <div className="w-full flex justify-center items-center gap-x-8 z-20 mt-5">
          <FunnelCard
            title="Phụ huynh"
            imageUrl="/image/home/parent-icon.png"
            onClick={handleCardClick}
          />
          <FunnelCard
            title="Học viên"
            imageUrl="/image/home/student-icon.png"
            onClick={handleCard1Click}
          />
          <FunnelCard
            title="Giáo viên"
            imageUrl="/image/home/teacher-icon.png"
            onClick={handleCard2Click}
          />
        </div>
      </div>
    </>
  );
}

