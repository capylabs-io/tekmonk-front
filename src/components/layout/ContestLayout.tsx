"use client";

import { Nunito_Sans } from "next/font/google";
import { useEffect, useState } from "react";

import { useSnackbarStore } from "@/store/SnackbarStore";
const nunitoSans = Nunito_Sans({
  // weight: "600",
  subsets: ["latin"],
  variable: "--font-nunito",
});

type ContestLayoutProps = {
  children: React.ReactNode;
};

const ContestLayout = ({ children }: ContestLayoutProps) => {
  //use state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div
        className={`${nunitoSans.variable} font-sans relative w-full h-full flex flex-col overflow-hidden`}
      >
        <main className="flex-grow relative z-0 container w-full mx-auto text-gray-800 bg-opacity-80 min-h-screen ">
          {children}
        </main>
      </div>
    )
  );
};

export default ContestLayout;
