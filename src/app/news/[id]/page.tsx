"use client";
import React from "react";
import { ArrowLeft, Clock4, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNewDetail } from "@/lib/hooks/useNewDetail";
import { format } from "date-fns";
import { ROUTES } from "@/contants/role";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { newDetail } = useNewDetail(params.id);

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

  const title = !newDetail ? "" : newDetail.attributes.title;
  const startTime = !newDetail
    ? ""
    : format(new Date(newDetail.attributes.startTime), "HH:mm");
  const endTime = !newDetail
    ? ""
    : format(new Date(newDetail.attributes.endTime), "HH:mm");
  const dateFormat = !newDetail
    ? ""
    : format(new Date(newDetail.attributes.endTime), "dd/MM/yyyy");

  const location = !newDetail ? "" : newDetail.attributes.location;
  const content = !newDetail ? "" : newDetail.attributes.content;
  const locationName = !newDetail ? "" : newDetail.attributes.locationName;

  const handleBackRoute = () => {
    router.push(ROUTES.NEWS);
  };

  return (
    <div className="mt-3">
      <div
        className="text-primary-900 flex gap-x-2 px-6 items-center cursor-pointer"
        onClick={handleBackRoute}
      >
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Chi tiết Tin tức</span>
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
