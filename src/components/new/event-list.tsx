"use client";

import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ArrowRight } from "lucide-react";
import { CalendarCard } from "../event/CalendarCard";
import { ReqGetAllNews } from "@/requests/news";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";

export const EventList = () => {
  const router = useCustomRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: 1,
            pageSize: 3,
          },
          filters: {
            type: "event",
            status: "public",
          },
          sort: ["startTime:asc"],
          populate: "*",
        });
        return await ReqGetAllNews(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const handleRedirect = (id: number) => {
    router.push(`${ROUTE.EVENTS}/${id}`);
  };

  // Function to format date from ISO string
  const getDateInfo = (dateString: string) => {
    if (!dateString) return { month: "", day: "", week: "" };

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const weekdays = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const week = weekdays[date.getDay()];

    return { month, day, week };
  };

  // Format time to display
  const formatTime = (timeString: string) => {
    if (!timeString) return "";

    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Check if it's a full day event (no specific start/end time or spans entire day)
  const isFullDayEvent = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return true;

    const start = new Date(startTime);
    const end = new Date(endTime);

    // If duration is close to 24 hours or more
    const duration = end.getTime() - start.getTime();
    const hoursInMillis = 24 * 60 * 60 * 1000;

    return duration >= hoursInMillis * 0.95; // Allow 5% tolerance
  };

  return data && data.data.length > 0 && (
    <div className="w-full rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-SubheadMd text-gray-95">SỰ KIỆN</h3>
        <div
          className="text-gray-500 cursor-pointer hover:text-primary-90 transition-colors text-sm"
          onClick={() => router.push(ROUTE.EVENTS)}
        >
          Xem thêm
        </div>
      </div>
      <div className="flex flex-col divide-y">
        {data?.data.map((event) => {
          const { month, day, week } = getDateInfo(event.startTime);
          const fullDay = isFullDayEvent(event.startTime, event.endTime);

          return (
            <div
              key={event.id}
              className="flex p-4 cursor-pointer hover:bg-gray-20 transition-colors gap-x-4"
              onClick={() => handleRedirect(event.id)}
            >
              <CalendarCard day={day} month={month} week={week} />
              <div className="flex flex-col justify-center">
                {!fullDay && (
                  <div className="text-sm text-gray-600">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </div>
                )}
                {fullDay && (
                  <div className="text-sm text-gray-600">CẢ NGÀY</div>
                )}
                <div className="text-SubheadMd text-gray-95 line-clamp-1">
                  {event.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
