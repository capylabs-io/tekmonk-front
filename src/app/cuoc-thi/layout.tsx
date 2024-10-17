"use client";

import ContestHeader from "@/components/contest/ContestHeader";
import ContestLayout from "@/components/layout/ContestLayout";
import { LAYERS } from "@/contants/layer";
import Image from "next/image";
import { useEffect, useState } from "react";
// export const metadata1: Metadata = {
//   title: "COntest",
//   description: "Generated by create next app",
// };


export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    
        
        <div className="w-full flex flex-col justify-center items-center relative overflow-hidden">
          <div className={`absolute w-[160%] h-[100%] top-[1300px] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[${LAYERS.BACKGROUND}] 
      bg-gradient-to-b from-[rgb(248,239,249)] to-[rgb(159,42,143)]
       rounded-tl-[50%] rounded-tr-[50%] overflow-hidden 
       max-mobile:w-[310%] max-mobile:top-[1250px]
       max-md:w-[260%] max-md:top-[1200px]
       `}></div>
       
       <div>
       </div>
            <ContestLayout>{children}</ContestLayout>
            
        </div>
    
    
  );
}