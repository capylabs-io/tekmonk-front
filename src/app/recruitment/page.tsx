"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Dela_Gothic_One } from "next/font/google";

import { RecruitmentCard } from "@/components/recruitment/RecruitmentCard";
import { Pagination } from "@/components/common/Pagination";
import { useHirings } from "@/lib/hooks/useNew";
import { useRouter } from "next/navigation";

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});

const itemsPerPage = 6;

function RecruitmentPage() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  const hirings = useHirings();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHirings = hirings.slice(startIndex, endIndex);
  // const recruitments = news.filter((item) => item.attributes.type === "hiring");

  return (
    <div className="h-screen relative">
      <nav className="w-full flex justify-between p-4 cursor-pointer">
        <Image
          src="/image/app-logo.png"
          alt="app logo"
          width={159}
          height={32}
          onClick={handleClick}
        />
      </nav>

      <div className="w-full flex items-center justify-center gap-x-48 relative bg-[url('/image/recruitment/recruitment-banner.png')] bg-no-repeat bg-cover h-[300px]">
        <div className="text-white">
          <div
            className={`${delaGothicOne.className} text-5xl !leading-[64px]`}
          >
            TUYỂN DỤNG TEKMONK
          </div>
          <div className="text-bodyLg mt-5">
            Tham gia trở thành giáo viên của Tekmonk ngay hôm nay.
          </div>
          <div className="flex gap-x-2 mt-5">
            <Button className="text-sm !rounded-3xl px-6">
              Tải mô tả công việc
            </Button>
            <Button className="text-sm !bg-transparent !border !border-white !rounded-3xl !px-16">
              Liên hệ
            </Button>
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
      <div className="w-full flex flex-wrap gap-x-4 gap-y-6 justify-around mt-5 px-5">
        {currentHirings.map((recruitment) => (
          <RecruitmentCard
            key={recruitment.id}
            id={recruitment.id}
            imageUrl={recruitment.attributes.backgroundImgUrl}
            title={recruitment.attributes.title}
            metadata={recruitment.attributes.metadata}
          />
        ))}
      </div>

      <Pagination
        onPageClick={handlePageClick}
        customClassName="flex justify-center pb-5 pt-10"
        currentPage={currentPage}
        totalPages={Math.ceil(hirings.length / itemsPerPage)}
        onClickNextPage={handleNextPage}
        onClickPrevPage={handlePrevPage}
      />
    </div>
  );
}

export default RecruitmentPage;
