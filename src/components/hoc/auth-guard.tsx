"use client";

import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { CommonLoading } from "../common/CommonLoading";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useCustomRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnected, getMe] = useUserStore((state) => [state.isConnected, state.getMe]);
  const warn = useSnackbarStore((state) => state.warn);
  useEffect(() => {
    // getMe();
    if (isConnected()) {
      setIsAuthenticated(true);
      return;
    }
    warn("Chú ý", "Vui lòng đăng nhập để tiếp tục");
    router.push(ROUTE.LOGIN);
  }, []);

  return isAuthenticated ? children : <CommonLoading />;
};
