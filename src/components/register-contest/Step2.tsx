"use client";

import { Label } from "@/components/ui/label";
import { Input } from "../common/Input";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
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
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label  className="text-gray-950 text-SubheadSm">Email đăng ký dự thi <span className="text-red-500">*</span></Label>
                    <Input
                        type="email"
                        placeholder="Câu trả lời"
                        value={email}
                        onChange={handleChangeEmail}
                        customClassNames="mt-2" 
                    />
                </div>
                <div>
                    <Label className="text-gray-950 text-SubheadSm">Tên đăng nhập <span className="text-red-500">*</span></Label>
                    <Input
                        type="text"
                        placeholder="Câu trả lời"
                        value={username}
                        onChange={handleChangeUsername}
                        customClassNames="mt-2" 
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Label className="text-gray-950 text-SubheadSm">Mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Input
                            type="password"
                            value={password}
                            onChange={handleChangePassword}
                            customClassNames="mt-2" 
                        />
                    </div>
                </div>
                <div className="relative">
                    <Label className="text-gray-950 text-SubheadSm">Nhập lại mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            customClassNames="mt-2" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}