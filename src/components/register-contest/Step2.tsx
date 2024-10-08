"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContestStore } from "@/store/ContestStore";
import { Eye, EyeOff } from "lucide-react";
export default function Step2 () {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const {
        email, username, password, confirmPassword
    } = useContestStore(state => {
        return {
            email: state.email,
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword,
        }
    });
    const change = useContestStore(state => state.change);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="email">Email đăng ký dự thi <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Câu trả lời"
                        value={email}
                        onChange={(e) => change(e.target.name, e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="username">Tên đăng nhập <span className="text-red-500">*</span></Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Câu trả lời"
                        value={username}
                        onChange={(e) => change(e.target.name, e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Label htmlFor="password">Mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => change(e.target.name, e.target.value)}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <Label htmlFor="confirmPassword">Nhập lại mật khẩu <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => change(e.target.name, e.target.value)}
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}