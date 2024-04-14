"use client";
import classNames from "classnames";
import { ArrowRight } from "lucide-react";
import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/common-types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/contants/role";

type Props = {
  customClassName?: string;
  listEvent?: Event[];
};

const BASE_CLASS = "rounded-xl border border-gray-200 py-4 text-primary-900";

export const EventList = ({ customClassName, listEvent }: Props) => {
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

  const router = useRouter();
  const handleClick = () => router.push(ROUTES.EVENT);

  return (
    <div className={classNames(BASE_CLASS, customClassName)}>
      <div
        className="flex justify-between px-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="text-sm">SỰ KIỆN</div>
        <ArrowRight size={20} />
      </div>
      <hr className="border-t border-gray-200 my-4" />
      {listEvent?.map((event, index) => {
        const startTime = format(new Date(event.attributes.startTime), "HH:mm");
        const endTime = format(new Date(event.attributes.endTime), "HH:mm");
        const dateFormat = format(
          new Date(event.attributes.startTime),
          "dd/MM/yyyy"
        );
        const day = dateFormat.slice(0, 2);
        const month = dateFormat.slice(3, 5);

        return (
          <div key={index}>
            <EventCard
              day={day}
              month={month}
              weekday={dateFormat}
              startTime={startTime}
              endTime={endTime}
              title={event.attributes.title}
              dayName={dayName}
            />
            {index + 1 !== listEvent.length && (
              <hr className="border-t border-gray-200 my-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};
