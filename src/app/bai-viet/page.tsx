"use client";

import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useEffect } from "react";

export default function Page() {
  const router = useCustomRouter();

  useEffect(() => {
    router.push(ROUTE.NEWS_FEED);
  }, [router]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Chúng tôi đang phát triển trang này . . .</h1>
    </div>
  );
}
