"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "../types";

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onConfirm: () => void;
}

export const DeleteUserDialog = ({
  open,
  onOpenChange,
  user,
  onConfirm,
}: DeleteUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary-900 text-center">
            Xóa tài khoản
          </DialogTitle>
        </DialogHeader>
        <div className="text-center py-4">
          <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
          <p className="font-medium mt-2">{user?.name}</p>
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