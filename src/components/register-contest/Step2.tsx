"use client";

import { Label } from "@/components/ui/label";
import { Input } from "../common/Input";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import { Controller, useFormContext } from "react-hook-form";
import { WizardSchema } from "@/validation/ContestRegister";

export const Step2 = () => {


    const {
        email, username, password, confirmPassword
    } = useContestRegisterStore(state => {
        return {
            email: state.email,
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword,
        }
    });
    const change = useContestRegisterStore(state => state.change);
    const handleChangeEmail = (text: string) => {
        change("email", text);
    }
    const handleChangeUsername = (text: string) => {
        change("username", text);
    }
    const handleChangePassword = (text: string) => {
        change("password", text);
    }
    const handleChangeConfirmPassword = (text: string) => {
        change("confirmPassword", text);
    }

const { control, trigger, register, formState: {errors} } = useFormContext<WizardSchema>();
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label  className="text-gray-950 text-SubheadSm">Email đăng ký dự thi <span className="text-red-500">*</span></Label>
                    <Controller
            control={control}
            name="stepTwo.email"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2 mb-0"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
                
                </div>
                <div>
                    <Label className="text-gray-950 text-SubheadSm">Tên đăng nhập <span className="text-red-500">*</span></Label>
                    <Controller
            control={control}
            name="stepTwo.username"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2 mb-0"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Label className="text-gray-950 text-SubheadSm">Mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                    <Controller
            control={control}
            name="stepTwo.password"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2 mb-0"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
                    </div>
                </div>
                <div className="relative">
                    <Label className="text-gray-950 text-SubheadSm">Nhập lại mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                       <Controller
            control={control}
            name="stepTwo.confirmPassword"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="password"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2 mb-0"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
                    </div>
                </div>
            </div>
        </div>
    )
}