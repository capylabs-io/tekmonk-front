"use client";
import { ROUTE } from "@/contants/router";
import Image from "next/image";
import Link from "next/link";

export const LandingFooter = () => {
  return (
    <div className="bg-[#320130] text-white p-[80px] w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="space-y-4 mb-6 md:mb-0">
          {/* Logo */}
          <Image alt="" src="/image/app-logo-white.png" width={159} height={32} />

          {/* Contact Information */}
          <div className="space-y-2 text-sm">
            <p className="max-w-md">
              <span className="font-semibold">Địa chỉ:</span> <span className="text-sm font-normal">Tầng 3, Tháp B,
                Tòa Việt Đức Complex, Ngõ 187 Nguyễn Tuân, P. Nhân Chính, Q.
                Thanh Xuân,Tp. Hà Nội</span>
            </p>
            <p>
              <span className="font-semibold">Hotline:</span> <span className="text-sm font-normal">0378 247 797</span>
            </p>
            <p>
              <span className="font-semibold">Email:</span> <span className="text-sm font-normal">tekmonk.academy@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Certification Badge */}
        <div className="flex flex-col gap-8 items-end">
          <nav className="hidden md:flex items-center space-x-4 text-SubheadMd ">
            <Link
              href="https://courses.tekmonk.edu.vn/"
              className="text-sm font-medium text-white hover:text-gray-20"
            >
              Khóa học
            </Link>
            {/* <Link
                href="/olympiad"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Olympiad
              </Link> */}
            <Link
              href={ROUTE.NEWS}
              className="text-sm font-medium text-white hover:text-gray-20"
            >
              Tin tức
            </Link>
            <Link
              href={ROUTE.HIRING}
              className="text-sm font-medium text-white hover:text-gray-20"
            >
              Tuyển Dụng
            </Link>
            <Link
              href="/su-kien"
              className="text-sm font-medium text-white hover:text-gray-20"
            >
              Sự kiện
            </Link>
          </nav>
          <div className="w-40 h-auto">
            <img
              src="/image/landing/footer.png"
              alt="Đã đăng ký Bộ Công Thương"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 text-center text-BodySm">
        <p>© 2021 TekMonk Academy. All right reserved.</p>
      </div>
    </div>
  );
};