"use client";

import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useCustomRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnected] = useUserStore((state) => [state.isConnected]);
  useEffect(() => {
    if (isConnected()) {
      setIsAuthenticated(true);
      return;
    }
    router.push(ROUTE.LOGIN);
  }, [isConnected, router]);
  return isAuthenticated ? children : null;
};
