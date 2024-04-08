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
      const userInfo = await login(user);
      const roleName = get(userInfo, "role.name", "").toLowerCase();

      switch (roleName) {
        case Role.STUDENT:
          router.push("/home");
          break;
        case Role.TEACHER:
          // @TODO: chưa có
          //router Admin
          router.push("/");
          break;
        case Role.PARENT:
          router.push("/home");
          break;
        default:
          router.push("/login");
          break;
      }
    } catch (error) {
      toast.error("Login Fail");
    } finally {
      hide();
    }
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          src="/image/app-logox2.png"
          alt="app logo"
          width={318}
          height={64}
        />
        <div className="text-primary-900 text-2xl text-center mt-16">
          Đăng nhập
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
          <Button onClick={handleLogin}>Đăng nhập</Button>
        </div>
        {/* @TODO: forget passwork function */}
        {/* <div className="text-gray-600 text-sm text-center mt-5">
          Quên mật khẩu?
        </div> */}
      </div>
      <div className="bg-[url('/image/login/login-banner.png')] bg-no-repeat !bg-right"></div>
      <ToastContainer />
      {isShowing && <Loading />}
    </div>
  );
}
