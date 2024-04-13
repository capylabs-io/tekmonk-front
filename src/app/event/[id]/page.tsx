"use client";
import React from "react";
import { ArrowLeft, Clock4, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEventDetail } from "@/lib/hooks/useEventDetail";
import { format } from "date-fns";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { eventDetail } = useEventDetail(params.id);

  const date = new Date();
  const currentDay = date.getDay();
  const dayNames = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const dayName = dayNames[currentDay];

  const title = !eventDetail ? "" : eventDetail.attributes.title;
  const startTime = !eventDetail
    ? ""
    : format(new Date(eventDetail.attributes.startTime), "HH:mm");
  const endTime = !eventDetail
    ? ""
    : format(new Date(eventDetail.attributes.endTime), "HH:mm");
  const dateFormat = !eventDetail
    ? ""
    : format(new Date(eventDetail.attributes.endTime), "dd/MM/yyyy");
  const day = dateFormat.slice(0, 2);
  const month = dateFormat.slice(3, 5);

  const location = !eventDetail ? "" : eventDetail.attributes.location;
  const content = !eventDetail ? "" : eventDetail.attributes.content;
  const locationName = !eventDetail ? "" : eventDetail.attributes.locationName;

  const handleBackRoute = () => {
    router.back();
  };

  return (
    <div className="mt-3">
      <div
        className="text-primary-900 flex gap-x-2 px-6 items-center cursor-pointer"
        onClick={handleBackRoute}
      >
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Sự kiện {params?.id}</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-cover h-[256px] relative mt-4" />
      <div className="w-2/3 mx-auto border-r border-l border-b border-gray-200 h-max">
        <div className="px-4 pt-8 flex justify-between">
          <div>
            <div className="text-2xl font-bold">{title}</div>
            <div className="mt-4 text-base flex gap-x-2 items-center text-primary-950">
              <Clock4 size={16} />
              <span>
                {dayName}, {dateFormat} ({startTime} - {endTime})
              </span>
            </div>
            <div className="mt-2 text-base flex gap-x-2 items-start text-primary-950">
              <MapPin size={16} className="mt-1" />
              <div>
                <div>{locationName}</div>
                <div className="text-sm text-gray-500">{location}</div>
              </div>
            </div>
          </div>
          <div className="!rounded-[4px] border w-20 border-gray-200 shadow-[0_3px_0_0_#E4E7EC] text-center h-max">
            <div className="bg-primary-600 text-white py-1 text-[10px] font-medium !rounded-t-[4px]">
              THÁNG {month}
            </div>
            <div className="px-2 py-1 !rounded-b-[4px]">
              <div className="text-2xl text-primary-900 font-bold">{day}</div>
              <div className="text-gray-600 text-[10px]">{dayName}</div>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-4" />
        <div className="p-4">
          <div className="text-primary-900 font-medium">THÔNG TIN</div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
