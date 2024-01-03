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

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delo",
});

export default function Misson() {
  return (
    <>
      <div className="text-xl text-primary-900 px-8">Nhiệm vụ</div>
      <Tabs defaultValue="mission" className="w-full mt-5">
        <TabsList className="w-full border-b border-gray-200">
          <TabsTrigger value="mission">Nhiệm vụ</TabsTrigger>
          <TabsTrigger value="achievement">Thành tựu</TabsTrigger>
        </TabsList>
        <TabsContent
          value="mission"
          className="overflow-y-auto mt-0"
        ></TabsContent>
        <TabsContent
          value="achievement"
          className="overflow-y-auto mt-0"
        ></TabsContent>
      </Tabs>
    </>
  );
}
