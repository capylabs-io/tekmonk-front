"use client";

import ContestHeader from "@/components/contest/header";
import { LAYERS } from "@/contants/layer";
import AllContestEntries from "./page";
import AllContestEntriesHeader from "@/components/all-contest-entries/AllContestEntriesHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
        
        <div className="w-full flex flex-col justify-center items-center relative">
          
            <AllContestEntriesHeader/>
            {children}
        </div>
    
    
  );
}