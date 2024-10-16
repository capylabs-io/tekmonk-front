"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Role } from "@/contants/role";
import { get } from "lodash";
import { Loading } from "@/components/common/Loading";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";

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
  const [error, success] = useSnackbarStore((state) => [state.error, state.success]);

  const router = useRouter();

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

  const handleLogin = async () => {
    show();

    try {
      const resUserInfo = await login(user);
      
      const roleName = get(resUserInfo, "role.name", "").toLowerCase();

      if (roleName === Role.STUDENT) {
        success("Xong!","Đăng nhập thành công");
        router.push("/contest");
      } else {
        useUserStore.getState().clear();
        setUser({
          identifier: "",
          password: "",
        });
        error("Lỗi","Đăng nhập thất bại");
      }

    } catch (err) {
      setUser({
        identifier: "",
        password: "",
      });
      error("Lỗi","Đăng nhập thất bại");
    } finally {
      hide();
    }
  };

  return (
    <div className="w-full grid grid-cols-2 max-[819px]:grid-cols-1 h-screen">
      <div className="relative flex flex-col justify-center items-center h-screen">
      <div className="flex w-full gap-2.5 absolute top-10 left-10">
            <svg
              className="w-2 fill-primary-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <div
              className="text-primary-700 font-semibold text-base hover:cursor-pointer"
              onClick={() => router.push("/contest")}
            >
              Quay lại
            </div>
          </div>
        <Image
          src="/image/app-logox4.png"
          alt="app logo"
          width={318}
          height={64}
          className="text-red-600"
        />
        <div className="text-primary-900 text-4xl font-bold text-center mt-16">
          Đăng nhập
        </div>
        <div className="flex gap-x-1 mt-2">
          <div>Chưa có tài khoản?</div>
          <div className="font-bold underline hover:cursor-pointer" onClick={() => router.push('/register-contest')}>Đăng ký</div>
          <div>ngay</div>
        </div>
        <div className="w-[348px] mt-8 flex flex-col gap-y-4">
          <Input
            type="text"
            placeholder="Tên tài khoản, email hoặc số điện thoại"
            customClassNames="w-full"
            value={user.identifier}
            onChange={handleChangeUsername}
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={user.password}
            onChange={handChangePassword}
          />
          <Button className="mt-8" onClick={handleLogin}>Đăng nhập</Button>
          <div className="text-center">
            Quên mật khẩu?
          </div>
        </div>
        {/* @TODO: forget passwork function */}
        {/* <div className="text-gray-600 text-sm text-center mt-5">
          Quên mật khẩu?
        </div> */}
      </div>
      <div className="bg-[url('/image/login/login-banner.png')] bg-no-repeat !bg-right bg-cover"></div>
      {/* <ToastContainer /> */}
      {isShowing && <Loading />}
    </div>
  );
}
