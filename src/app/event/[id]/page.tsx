"use client";
import React from "react";
import { ArrowLeft, Clock4, MapPin } from "lucide-react";
import { useRouter } from "next/router";
// import { EventDetail } from "@/types/common-types";
import { useEventDetail } from "@/lib/hooks/useEventDetail";

export default function Page({ params }: { params: { id: string } }) {
  const { eventDetail, updateEventDetail } = useEventDetail();

  const router = useRouter();

  const handleBackRoute = () => {
    router.back();
  };

  const content = (
    <div className="p-4">
      <div className="text-primary-900">THÔNG TIN</div>
      <p>
        Sự kiện {eventDetail.title} diễn ra lúc {eventDetail.eventTime} ngày{" "}
        {eventDetail.day}/{eventDetail.month} tại {eventDetail.eventVenue}
      </p>
    </div>
  );

  return (
    <div className="mt-3">
      <div
        className="text-primary-900 flex gap-x-2 px-6 items-center cursor-pointer"
        onClick={handleBackRoute}
      >
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Sự kiện {params.id}</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-cover h-[256px] relative mt-4" />
      <div className="w-2/3 mx-auto border-r border-l border-b border-gray-200 h-max">
        <div className="px-4 pt-8 flex justify-between">
          <div>
            <div className="text-2xl font-bold">{eventDetail.title}</div>
            <div className="mt-4 text-base flex gap-x-2 items-center text-primary-950">
              <Clock4 size={16} />
              <span>{eventDetail.eventTime}</span>
            </div>
            <div className="mt-2 text-base flex gap-x-2 items-start text-primary-950">
              <MapPin size={16} className="mt-1" />
              <div>
                <div>{eventDetail.eventVenue}</div>
                <div className="text-sm text-gray-500">
                  {eventDetail.address}
                </div>
              </div>
            </div>
          </div>
          <div className="!rounded-[4px] border w-20 border-gray-200 shadow-[0_3px_0_0_#E4E7EC] text-center h-max">
            <div className="bg-primary-600 text-white py-1 text-[10px] font-medium !rounded-t-[4px]">
              {eventDetail.month}
            </div>
            <div className="px-2 py-1 !rounded-b-[4px]">
              <div className="text-2xl text-primary-900 font-bold">
                {eventDetail.day}
              </div>
              <div className="text-gray-600 text-[10px]">
                {eventDetail.weekday}
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-4" />
        {content}
      </div>
    </div>
  );
}
