"use client";
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { NotiCard } from "@/components/notification/NotiCard";
import { Notification as NotificationType } from "@/types/common-types";

export default function Notification() {
  const notifications: NotificationType[] = [];

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
