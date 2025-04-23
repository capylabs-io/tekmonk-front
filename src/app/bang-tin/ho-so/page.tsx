"use client";

import { AuthGuard } from "@/components/hoc/auth-guard";
import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";

export default function ProfilePage() {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  useEffect(() => {}, []);
  return <>123123</>;
}
