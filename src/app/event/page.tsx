"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { EventCard } from "@/components/event/EventCard";
import { useEvents } from "@/lib/hooks/useEvent";
import { Event } from "@/types/common-types";

export default function Event() {
  const events: Event[] = useEvents();

  return (
    <div className="mt-3">
      <div className="text-primary-900 flex gap-x-2 px-6 items-center">
        <ArrowLeft size={18} className="text-gray-600" />
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
            {events.map((event, index) => (
              <EventCard
                key={index}
                imageUrl={event.imageUrl}
                title={event.title}
                createdAt={event.createdAt}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="history" className="overflow-y-auto"></TabsContent>
      </Tabs>
    </div>
  );
}
