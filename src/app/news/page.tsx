"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { NewCard } from "@/components/new/NewCard";
import WithAuth from "@/components/hoc/WithAuth";
import { useRouter } from "next/navigation";
import { useNews } from "@/lib/hooks/useNew";
import { New } from "@/types/common-types";
import { format } from "date-fns";
import { Pagination } from "@/components/common/Pagination";

const itemsPerPage = 6;

const New: React.FC = () => {
  const router = useRouter();
  const handleBackRoute = () => {
    router.push("/home");
  };
  const news: New[] = useNews();
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
  const currentNews = news.slice(startIndex, endIndex);

  return (
    <div className="mt-3">
      <div
        className="text-primary-900 flex gap-x-2 px-6 items-center cursor-pointer"
        onClick={handleBackRoute}
      >
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Tin tức</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-center bg-cover h-[256px] relative mt-4"></div>
      <div className="m-8 flex flex-wrap gap-6">
        {currentNews.map((newsItem) => (
          <NewCard
            key={newsItem.id}
            id={newsItem.id}
            imageUrl={newsItem.attributes.backgroundImgUrl}
            title={newsItem.attributes.title}
            createdAt={format(
              new Date(newsItem.attributes.startTime),
              "dd/MM/yyyy"
            )}
          />
        ))}
      </div>
      <Pagination
        onPageClick={handlePageClick}
        customClassName="flex justify-center pb-5 pt-10"
        currentPage={currentPage}
        totalPages={Math.ceil(news.length / itemsPerPage)}
        onClickNextPage={handleNextPage}
        onClickPrevPage={handlePrevPage}
      />
    </div>
  );
};

export default WithAuth(New);
