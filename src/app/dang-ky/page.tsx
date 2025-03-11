"use client";
import { useState } from "react";
import { useUserStore } from "@/store/UserStore";
import "react-toastify/dist/ReactToastify.css";
import { Role } from "@/contants/role";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { HandleReturnMessgaeErrorLogin } from "@/requests/return-message-error";
import { Input } from "@/components/common/Input";
import { CommonButton } from "@/components/common/button/CommonButton";
import { useCustomRouter } from "@/components/common/router/CustomRouter";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sigUpChema } from "@/validation/auth";
import { ReqRegister } from "@/requests/login";

export default function Login() {
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const [login] = useUserStore((state) => [state.login]);

  const [isShowing, show, hide] = useLoadingStore((state) => [
    state.isShowing,
    state.show,
    state.hide,
  ]);
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const signUpForm = useForm({
    resolver: zodResolver(sigUpChema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { getValues, reset, setValue } = signUpForm
  const router = useCustomRouter();

  const handleSignUp = async () => {
    show();

    try {
      const data = getValues()
      const res = await ReqRegister(data);
      if (res) {
        success("Xong!", "Chúc mừng bạn đã đăng ký thành công");
        router.push("/dang-nhap");
      }
    } catch (err) {
      const message = HandleReturnMessgaeErrorLogin(err);
      error("Lỗi", message);
    } finally {
      hide();
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] flex justify-center items-center p-2">
      <div
        className="w-[368px] h-[468px] mx-auto flex flex-col gap-6 border border-gray-20 p-6 bg-gray-00 rounded-2xl"
        style={{
          boxShadow: "0px 4px 0px #DDD0DD",
        }}
      >
        <div className="w-full">
          <div className="text-HeadingSm text-gray-95">Đăng ký</div>
          <div className="text-BodySm text-gray-60">
            Tham gia ngay vào cộng đồng Tekmonk
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="w-full flex flex-col gap-2">
            <div className="text-SubheadSm text-gray-60">
              Tên tài khoản
            </div>
            <Controller
              name="username"
              control={signUpForm.control}
              render={({ field, formState }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  error={formState.errors.username?.message}
                  type="text"
                  customClassNames="h-[48px]"
                  placeholder="Tên tài khoản hoặc email"
                />
              )}
            />

          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-SubheadSm text-gray-60">
              Email
            </div>
            <Controller
              name="email"
              control={signUpForm.control}
              render={({ field, formState }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  error={formState.errors.email?.message}
                  type="text"
                  customClassNames="h-[48px]"
                  placeholder="Tên tài khoản hoặc email"
                />
              )}
            />

          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-SubheadSm text-gray-60">Mật khẩu</div>
            <Controller
              name="password"
              control={signUpForm.control}
              render={({ field, formState }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  error={formState.errors.password?.message}
                  type="password"
                  customClassNames="h-[48px]"
                  placeholder="Mật khẩu"
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-SubheadSm text-gray-60">Xác nhận lại mật khẩu</div>
            <Controller
              name="confirmPassword"
              control={signUpForm.control}
              render={({ field, formState }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  error={formState.errors.confirmPassword?.message}
                  type="password"
                  customClassNames="h-[48px]"
                  placeholder="Mật khẩu"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <CommonButton className="h-12" onClick={handleSignUp}>
            Đăng Ký
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
