"use client";
import { Dela_Gothic_One } from "next/font/google";
import React from "react";
import localFont from "next/font/local";
import { CommonCard } from "../common/CommonCard";

const delaGothicOne = localFont({
  src: "../.././assets/fonts/DelaGothicOne-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-dela",
});
type Props = {
  value: string;
  title: string;
};
export const StatCard = ({ value, title }: Props) => {
  return (
    <CommonCard className="py-4 w-[200px] text-center ">
      <p className={` text-HeadingMd text-gray-95`}>{value}</p>
      <p className="text-BodySm text-gray-600">{title}</p>
    </CommonCard>
  );
};
