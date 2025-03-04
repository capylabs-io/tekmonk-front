"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeactivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeactivateUserDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: DeactivateUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-[368px]">
        <DialogHeader className="p-0">
          <DialogTitle className="text-HeadingSm text-gray-95 p-0">
            Vô hiệu hoá tài khoản
          </DialogTitle>
        </DialogHeader>
        <div className="text-BodyMd text-gray-95 mt-4">
          Tài khoản bị vô hiệu hoá sẽ không còn khả năng truy cập và sử dụng các
          chức năng của hệ thống. Bạn có muốn vô hiệu hoá tài khoản này không?
        </div>
        <DialogFooter className=" items-center gap-2 mt-2">
          <div className="flex justify-between w-full">
            <CommonButton
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="w-[91px] h-12"
            >
              Thoát
            </CommonButton>
            <CommonButton
              variant="secondary"
              onClick={onConfirm}
              className="w-[149px] h-12"
            >
              Vô hiệu hóa
            </CommonButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
