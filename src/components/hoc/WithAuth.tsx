"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { toast, ToastContainer } from "react-toastify";

const WithAuth = (WrappedComponent: React.FC) => {
  return () => {
    const router = useRouter();
    const [jwt] = useUserStore((state) => [state.jwt]);

    if (!jwt) {
      toast.error("You must be login first.");
      router.push("/login");
      return;
    }

    return (
      <>
        <WrappedComponent />
        <ToastContainer />
      </>
    );
  };
};

export default WithAuth;
