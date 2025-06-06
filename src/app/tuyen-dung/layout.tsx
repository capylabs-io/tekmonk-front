"use client";
import { Navbar } from "@/components/common/Navbar";
import { LandingFooter } from "@/components/new/NewsFooter";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full h-full px-[80px]">{children}</div>
      <LandingFooter />
    </div>
  );
}
