"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManagerRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ManagerFormData) => void;
}

interface ManagerFormData {
  username: string;
  email: string;
  managerName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export function ManagerRegistrationDialog({
  open,
  onOpenChange,
  onSubmit,
}: ManagerRegistrationDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: ManagerFormData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      managerName: formData.get("managerName") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            Tạo tài khoản quản lý lớp
          </DialogTitle>
          <div className="text-gray-600 text-center mb-4">
            Vui lòng điền đầy đủ thông tin
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Họ và tên quản lý</Label>
              <Input
                id="managerName"
                name="managerName"
                placeholder="Nhập họ và tên quản lý"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => {
                const form = document.querySelector("form") as HTMLFormElement;
                if (form) form.reset();
                onOpenChange(false);
              }}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}