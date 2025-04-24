"use client";
import { useState } from "react";
import { useProfileStore } from "@/store/ProfileStore";
import { Navbar } from "@/components/common/Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("HENRY NGUYEN");
  const [userRank, setUserRank] = useState("BẠC IV");
  const [show, hide] = useProfileStore((state) => [state.show, state.hide]);
  const handleOpenModal = () => {
    show();
  };
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Navbar />
      {children}
    </div>
  );
}
