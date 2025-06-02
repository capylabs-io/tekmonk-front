"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { toast, ToastContainer } from "react-toastify";
import { useCustomRouter } from "../common/router/CustomRouter";

const WithAuth = (WrappedComponent: React.FC) => {
  const Comp: React.FC = () => {
    const router = useCustomRouter();
    const isConnected = useUserStore((state) => state.isConnected);
    useEffect(() => {
      if (!isConnected()) {
        toast.error("You must be login first.");
        router.push("/dang-nhap");
      }
    }, [isConnected, router]);

    return (
      <>
        <WrappedComponent />
        {/* <ToastContainer /> */}
      </>
    );
  };

  return Comp;
};

export default WithAuth;
