"use client";
import React from "react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { Dela_Gothic_One } from "next/font/google";
import notifications from "@/mock/notification-mock.json";
import { NotiCard } from "@/components/notification/NotiCard";

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});

export default function Notification() {
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Thông báo</div>
      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-y-auto mt-0">
          {notifications.map((noti, index) => {
            return (
              <>
                <NotiCard
                  isUnread={true}
                  key={index}
                  createdAt={noti.createdAt}
                  title={noti.title}
                />
                {index + 1 !== notifications.length && (
                  <hr className="border-t border-gray-200" />
                )}
              </>
            );
          })}
        </TabsContent>
        <TabsContent
          value="unread"
          className="overflow-y-auto mt-0"
        ></TabsContent>
      </Tabs>
    </>
  );
}
