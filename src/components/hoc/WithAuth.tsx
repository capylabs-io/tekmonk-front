"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { toast, ToastContainer } from "react-toastify";
import { ROUTES } from "@/contants/role";

const WithAuth = (WrappedComponent: React.FC) => {
  const Comp: React.FC = () => {
    const router = useRouter();
    const isConnected = useUserStore((state) => state.isConnected);
    useEffect(() => {
      if (!isConnected()) {
        toast.error("You must be login first.");
        router.push(ROUTES.LOGIN);
      }
    }, [isConnected, router]);

    return (
      <>
        <WrappedComponent />
        <ToastContainer />
      </>
    );
  };

  return Comp;
};

export default WithAuth;
