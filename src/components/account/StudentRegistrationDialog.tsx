"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CommonButton } from "../common/button/CommonButton";
import { Input } from "@/components/common/Input";

interface StudentRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StudentFormData) => void;
}

interface StudentFormData {
  username: string;
  email: string;
  studentName: string;
  dateOfBirth: string;
  parentName: string;
  phoneNumber: string;
}

export function StudentRegistrationDialog({
  open,
  onOpenChange,
  onSubmit,
}: StudentRegistrationDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: StudentFormData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      studentName: formData.get("studentName") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      parentName: formData.get("parentName") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[680px] bg-white">
        <DialogHeader className="px-4">
          <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
            Đăng ký tài khoản học viên
          </DialogTitle>
          <div className="text-BodyMd text-gray-60 mb-4">
            Mật khẩu mặc định là 1 cho đến khi người dùng tự thay đổi
          </div>
        </DialogHeader>

        <div onSubmit={handleSubmit} className="space-y-4 p-4 ">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">Tên tài khoản</div>
              <Input
                type="text"
                name="username"
                placeholder="Nhập thông tin"
                customClassNames="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">Email</div>
              <Input
                name="email"
                type="email"
                placeholder="Nhập thông tin"
                customClassNames="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">Tên học viên</div>
              <Input
                type="text"
                name="studentName"
                placeholder="Nhập thông tin"
                customClassNames="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">
                Ngày tháng năm sinh
              </div>
              <Input
                name="dateOfBirth"
                type="date"
                placeholder="DD/MM/YYYY"
                customClassNames="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">
                Tên phụ huynh đại diện{" "}
                <span className="text-BodyMd text-gray-60">
                  (Không bắt buộc)
                </span>
              </div>
              <Input
                type="text"
                id="parentName"
                name="parentName"
                placeholder="Nhập thông tin"
                customClassNames="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[160px] text-SubheadMd">
                Số điện thoại{" "}
                <span className="text-BodyMd text-gray-60">
                  (Không bắt buộc)
                </span>
              </div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Nhập thông tin"
                customClassNames="flex-1"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <CommonButton
              type="button"
              className="w-[83px] h-11"
              variant="secondary"
              onClick={() => {
                const form = document.querySelector("form") as HTMLFormElement;
                if (form) form.reset();
                onOpenChange(false);
              }}
            >
              Quay lại
            </CommonButton>
            <CommonButton type="submit" className="h-11 w-[139px]">
              Đăng ký
            </CommonButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
