"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/UserStore";
import { useCustomRouter } from "./router/CustomRouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CommonButton } from "./button/CommonButton";

type ActionGuardProps = {
  children: React.ReactNode;
  onAction?: () => void;
  actionName?: string;
  className?: string;
};

export const ActionGuard = ({
  children,
  onAction,
  actionName = "thao tác này",
  className = "",
}: ActionGuardProps) => {
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const router = useCustomRouter();

  const handleAction = () => {
    if (!userInfo?.id) {
      setShowLoginDialog(true);
      return;
    }
    onAction?.();
  };

  return (
    <>
      <div className={className} onClick={handleAction}>
        {children}
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">Đăng nhập</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            <p className="mb-4">Bạn cần đăng nhập để thực hiện {actionName}</p>
            <div className="flex justify-center gap-4">
              <CommonButton
                variant="secondary"
                onClick={() => setShowLoginDialog(false)}
              >
                Hủy
              </CommonButton>
              <CommonButton
                onClick={() => {
                  setShowLoginDialog(false);
                  router.push('/dang-nhap');
                }}
              >
                Đăng nhập
              </CommonButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 