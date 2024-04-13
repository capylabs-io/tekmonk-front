"use client";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { EventCard } from "@/components/event/EventCard";
import { useEvents } from "@/lib/hooks/useEvent";
import { Event } from "@/types/common-types";
import { Pagination } from "@/components/common/Pagination";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const itemsPerPage = 6;

export default function Event() {
  const router = useRouter();

  const events: Event[] = useEvents();
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
  const currentEvents = events.slice(startIndex, endIndex);

  return (
    <div className="mt-3">
      <div className="text-primary-900 flex gap-x-2 px-6 items-center">
        <ArrowLeft
          size={18}
          className="text-gray-600 cursor-pointer"
          onClick={() => router.back()}
        />
        <span>Sự kiện</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-cover h-[256px] relative mt-4" />

      <Tabs defaultValue="current" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="current">Sắp diễn ra</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="overflow-y-auto">
          <div className="m-8 flex flex-wrap gap-6">
            {currentEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                imageUrl={event.attributes.backgroundImgUrl}
                title={event.attributes.title}
                createdAt={format(
                  new Date(event.attributes.startTime),
                  "dd/MM/yyyy"
                )}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="history" className="overflow-y-auto"></TabsContent>
      </Tabs>
      <Pagination
        onPageClick={handlePageClick}
        customClassName="flex justify-center pb-5 pt-10"
        currentPage={currentPage}
        totalPages={Math.ceil(events.length / itemsPerPage)}
        onClickNextPage={handleNextPage}
        onClickPrevPage={handlePrevPage}
      />
    </div>
  );
}
