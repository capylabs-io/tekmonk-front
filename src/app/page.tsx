"use client";

import { Navbar } from "@/components/common/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] mt-16 container mx-auto">
        <div className="h-[150vh]"></div>
      </div>
    </>
  );
}
