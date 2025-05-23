"use client";

import { Label } from "@/components/ui/label";
import { Input } from "../common/Input";
import { Controller, useFormContext } from "react-hook-form";
import { UpdateUserInfoSchema } from "@/validation/UpdateUserInfo";
import { useState } from "react";

export const UpdateInfoStep2 = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateUserInfoSchema>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //custom className
  const customInputClassNames = "max-mobile:placeholder:text-base";
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-950 text-SubheadSm">
              Email <span className="text-red-500">*</span>
            </Label>
            <Controller
              control={control}
              name="stepTwo.email"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Email của bạn"
                  customClassNames="mt-2 mb-0"
                  customInputClassNames={customInputClassNames}
                  error={fieldState && fieldState.error?.message}
                />
              )}
            />
          </div>
          <div>
            <Label className="text-gray-950 text-SubheadSm">
              Tên đăng nhập <span className="text-red-500">*</span>
            </Label>
            <Controller
              control={control}
              name="stepTwo.username"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Tên đăng nhập"
                  customClassNames="mt-2 mb-0"
                  customInputClassNames={customInputClassNames}
                  error={fieldState && fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Label className="text-gray-950 text-SubheadSm">Mật khẩu mới</Label>
            <div className="relative">
              <Controller
                control={control}
                name="stepTwo.password"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="Để trống nếu không muốn thay đổi"
                    customClassNames="mt-2 mb-0"
                    customInputClassNames={customInputClassNames}
                    error={fieldState && fieldState.error?.message}
                  />
                )}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>
          <div className="relative">
            <Label className="text-gray-950 text-SubheadSm">
              Nhập lại mật khẩu mới
            </Label>
            <div className="relative">
              <Controller
                control={control}
                name="stepTwo.confirmPassword"
                render={({ field: { value, onChange }, fieldState }) => (
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder="Để trống nếu không muốn thay đổi"
                    customClassNames="mt-2 mb-0"
                    customInputClassNames={customInputClassNames}
                    error={fieldState && fieldState.error?.message}
                  />
                )}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm mt-4 font-bold">
        Lưu ý: Để trống các trường mật khẩu nếu bạn không muốn thay đổi mật
        khẩu.
      </div>
    </>
  );
};
