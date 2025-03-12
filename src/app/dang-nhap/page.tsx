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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { siginChema } from "@/validation/auth";

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
  const signInForrm = useForm({
    resolver: zodResolver(siginChema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { getValues, reset, setValue } = signInForrm;
  const router = useCustomRouter();
  const handleChangeUsername = (identifier: string) => {
    setUser((prevState) => ({
      ...prevState,
      identifier,
    }));
  };

  const handChangePassword = (password: string) => {
    setUser((prevState) => ({
      ...prevState,
      password,
    }));
  };

  const handleForgotPassword = () => {
    router.push("/doi-mat-khau-moi");
  };

  const handleLogin = async () => {
    show();

    try {
      const data = getValues();
      const resUserInfo = await login({
        identifier: data.email,
        password: data.password,
      });
      console.log("resUserInfo", resUserInfo);
      const roleName = get(resUserInfo, "user_role.name", "").toLowerCase();

      if (roleName === Role.STUDENT.toLowerCase()) {
        success("Xong!", "Chúc mừng bạn đã đăng nhập thành công");
        router.push("/trang-chu");
      } else {
        useUserStore.getState().clear();
        setUser({
          identifier: "",
          password: "",
        });
        error("Lỗi", "Đăng nhập thất bại, vui lòng thử lại sau");
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
          <div className="text-HeadingSm text-gray-95">Đăng nhập</div>
          <div className="text-BodySm text-gray-60">
            Tham gia ngay vào cộng đồng Tekmonk
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <div className="text-SubheadSm text-gray-60">
              Tên tài khoản hoặc email
            </div>
            <Controller
              name="email"
              control={signInForrm.control}
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
              control={signInForrm.control}
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
            <div
              className="hover:underline text-primary-80 cursor-pointer self-end text-sm"
              onClick={() => router.push("/dang-ky")}
            >
              Tạo mới tài khoản?
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-[20px] h-[20px] text-red-500 accent-primary-80 
             appearance-none bg-white border border-gray-20 rounded-[4px] outline-none 
             focus:ring-0 focus:outline-none checked:appearance-auto"
            />

            <div>Lưu trạng thái đăng nhập</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <CommonButton className="h-12" onClick={handleLogin}>
            Đăng Nhập
          </CommonButton>
          <CommonButton
            className="h-12"
            variant="secondary"
            onClick={handleForgotPassword}
          >
            Quên mật khẩu
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
