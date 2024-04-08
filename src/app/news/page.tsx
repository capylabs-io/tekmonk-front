"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { EventCard } from "@/components/event/EventCard";
import WithAuth from "@/components/hoc/WithAuth";

const New: React.FC = () => {
  return (
    <div className="mt-3">
      <div className="text-primary-900 flex gap-x-2 px-6 items-center">
        <ArrowLeft size={18} className="text-gray-600" />
        <span>Tin tức</span>
      </div>
      <div className="w-full flex justify-center bg-[url('/image/event/event-banner.png')] bg-no-repeat bg-center bg-cover h-[256px] relative mt-4"></div>
      <div className="m-6 flex flex-wrap gap-6">
        <EventCard
          imageUrl="/image/event/event-pic-5.png"
          title="Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming"
          createdAt="19/11/2023"
        />
        <EventCard
          imageUrl="/image/event/event-pic-5.png"
          title="Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming"
          createdAt="19/11/2023"
        />
        <EventCard
          imageUrl="/image/event/event-pic-5.png"
          title="Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming"
          createdAt="19/11/2023"
        />
        <EventCard
          imageUrl="/image/event/event-pic-5.png"
          title="Viewing party CKTG 2023 Đồng hành bởi Youtube Gaming"
          createdAt="19/11/2023"
        />
      </div>
    </div>
  );
};

export default WithAuth(New);
