"use client";

import { CommonLoading } from "@/components/common/CommonLoading";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";

export default function ProfilePage() {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const router = useCustomRouter();
  const warn = useSnackbarStore((state) => state.warn);
  useEffect(() => {
    const userId = userInfo?.id;
    if (!userId) {
      warn("", "Vui lòng đăng nhập để truy cập trang hồ sơ");
      router.push(ROUTE.LOGIN);
      return;
    }
    router.push(ROUTE.PROFILE + `/${userId}`);
  }, [router, userInfo, warn]);
  return <CommonLoading />;
}
