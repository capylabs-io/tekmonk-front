"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
      <DialogContent className="bg-white max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary-900 text-center">
            Vô hiệu hoá tài khoản
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p>Tài khoản sẽ không thể đăng nhập sau khi bị vô hiệu hoá.</p>
          <p>Bạn có chắc chắn muốn vô hiệu hoá tài khoản này không?</p>
        </div>
        <DialogFooter className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-[156px] border-gray-300"
          >
            Quay lại
          </Button>
          <Button
            onClick={onConfirm}
            className="w-[156px] bg-red-600 text-white hover:bg-red-700"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};