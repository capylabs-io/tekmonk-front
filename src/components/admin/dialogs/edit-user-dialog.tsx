"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/ui/label";
import { EditingUserData } from "../types";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: EditingUserData | null;
  onUserChange: (user: EditingUserData | null) => void;
  onSubmit: () => void;
  onDeactivate: () => void;
}

export const EditUserDialog = ({
  open,
  onOpenChange,
  user,
  onUserChange,
  onSubmit,
  onDeactivate,
}: EditUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-[900px] p-0">
        <div className="w-full border-b border-gray-300 h-16 text-SubheadLg text-primary-900 px-8 pt-5">
          Thay đổi tài khoản học viên
        </div>
        <div className="px-8 py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label htmlFor="username" className="text-SubheadSm text-gray-950">
                Tên tài khoản
              </Label>
              <Input
                id="username"
                value={user?.username || ""}
                onChange={(e) =>
                  onUserChange(
                    user ? { ...user, username: e.target.value } : null
                  )
                }
                type="text"
                className="rounded-xl min-h-[48px]"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start gap-4">
              <Label htmlFor="email" className="text-SubheadSm text-gray-950 pt-2">
                Email
              </Label>
              <div>
                <Input
                  type="email"
                  id="email"
                  value={user?.email || ""}
                  onChange={(e) =>
                    onUserChange(
                      user ? { ...user, email: e.target.value } : null
                    )
                  }
                  className="rounded-xl min-h-[48px]"
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-bodyMd text-gray-500">
                    Mật khẩu mặc định là 1
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary-600 hover:text-primary-700"
                    onClick={() => console.log("Reset password")}
                  >
                    Đặt lại mật khẩu
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label htmlFor="name" className="text-SubheadSm text-gray-950">
                Tên học viên
              </Label>
              <Input
                id="name"
                value={user?.name || ""}
                onChange={(e) =>
                  onUserChange(user ? { ...user, name: e.target.value } : null)
                }
                type="text"
                className="rounded-xl min-h-[48px]"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label htmlFor="dob" className="text-SubheadSm text-gray-950">
                Ngày tháng năm sinh
              </Label>
              <Input
                id="dob"
                type="date"
                value={user?.dob || ""}
                onChange={(e) =>
                  onUserChange(user ? { ...user, dob: e.target.value } : null)
                }
                placeholder="DD/MM/YYYY"
                className="rounded-xl min-h-[48px]"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label htmlFor="parentName" className="text-SubheadSm text-gray-950">
                Tên phụ huynh đại diện
                <span className="text-gray-500 text-bodyMd block">
                  (không bắt buộc)
                </span>
              </Label>
              <Input
                id="parentName"
                type="text"
                value={user?.parentName || ""}
                onChange={(e) =>
                  onUserChange(
                    user ? { ...user, parentName: e.target.value } : null
                  )
                }
                className="rounded-xl min-h-[48px]"
              />
            </div>
            <div className="grid grid-cols-[140px_1fr] items-center gap-4">
              <Label htmlFor="parentPhone" className="text-SubheadSm text-gray-950">
                Số điện thoại
                <span className="text-gray-500 text-bodyMd block">
                  (không bắt buộc)
                </span>
              </Label>
              <Input
                id="parentPhone"
                type="tel"
                value={user?.parentPhone || ""}
                onChange={(e) =>
                  onUserChange(
                    user ? { ...user, parentPhone: e.target.value } : null
                  )
                }
                className="rounded-xl min-h-[48px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-16 border-t border-gray-300 flex justify-between items-center px-8">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-[156px] border-gray-300 !rounded-[3rem]"
          >
            Thoát
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onDeactivate}
              className="w-[156px] border-gray-300 text-red-600 hover:text-red-700 !rounded-[3rem]"
            >
              Vô hiệu hóa
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log("Reset password")}
              className="w-[156px] border-gray-300 !rounded-[3rem]"
            >
              Đặt lại mật khẩu
            </Button>
            <Button
              onClick={onSubmit}
              className="w-[156px] bg-primary-600 text-white hover:bg-primary-700 !rounded-[3rem]"
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};