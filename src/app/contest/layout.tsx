"use client";

import ContestHeader from "@/components/contest/header";
import { LAYERS } from "@/contants/layer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
        
        <div className="w-full flex flex-col justify-center items-center relative overflow-hidden">
          <div className={`absolute w-[160%] h-[100%] top-[1640px] left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[${LAYERS.BACKGROUND}] 
      bg-gradient-to-b from-[rgb(248,239,249)] to-[rgb(159,42,143)]
       rounded-tl-[50%] rounded-tr-[50%] overflow-hidden 
       max-mobile:w-[310%]
       max-md:w-[260%]
       `}></div>
            <ContestHeader/>
            {children}
        </div>
    
    
  );
}
