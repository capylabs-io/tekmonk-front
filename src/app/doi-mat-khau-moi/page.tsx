"use client";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ResetPasswordSchema} from "@/validation/ForgotPassword";
import {useSnackbarStore} from "@/store/SnackbarStore";
import {Input} from "@/components/common/Input";
import {Button} from "@/components/common/Button";
import {resetPasswordRequest} from "@/requests/forgot-password";
import {MoveRight} from "lucide-react";
import ContestLayout from "@/components/layout/ContestLayout";
import DotPattern from "@/components/ui/dot-pattern";
import {LAYERS} from "@/contants/layer";
import {cn} from "@/lib/utils";
import Image from "next/image";

export default function ResetPassword() {
  const router = useRouter();

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const handleSendEmail = async (data: any) => {
    const dataBody = {
      ...data,
      token: token,
    };
    try {
      const res = await resetPasswordRequest(dataBody);
      if (!res) {
        error("Lỗi!", "Mật khẩu không khớp");
        return;
      }
      success("Thành công!", "Mật khẩu đã được thay đổi");
      setIsPasswordChanged(true);
    } catch (err) {
      error("Lỗi!", "Lỗi không xác định, vui lòng thử lại sau");
    }
  };
  const backToMainPage = () => {
    setIsPasswordChanged(false);
    router.push("/");
  };
  const backToLoginPage = () => {
    router.push("/login");
    setIsPasswordChanged(false);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const passWordChange = (
    <div className="w-full overflow-x-hidden grid grid-cols-2 max-[819px]:grid-cols-1 h-screen black">
      <div className="relative flex flex-col items-center h-screen">
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
            onClick={() => router.back()}
          >
            Quay lại
          </div>
        </div>
        <div className="max-w-[372px] md:w-[372px] flex flex-col justify-center items-center mt-[180px]">
          <div className="w-full">
            <div className="text-primary-900 text-2xl font-bold text-center">
              Thiết lập mật khẩu
            </div>
            <div className="text-bodyLg text-base text-gray-800 mt-3 text-center">
              Đặt lại mật khẩu mới mà bạn mong muốn
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  type="password"
                  placeholder="Mật khẩu mới"
                  customClassNames="w-full mt-8 "
                  value={value}
                  onChange={onChange}
                  error={fieldState && fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  customClassNames="w-full mt-2 "
                  value={value}
                  onChange={onChange}
                  error={fieldState && fieldState.error?.message}
                />
              )}
            />
            <Button
              className="mt-8 w-full !rounded-[3rem]"
              onClick={handleSubmit(handleSendEmail)}
            >
              <div className="flex items-center gap-x-2">
                Thiết lập mật khẩu
                <MoveRight className="mt-0.5" size={16} strokeWidth={4} />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[url('/login.jpg')] bg-no-repeat !bg-center bg-cover"></div>
    </div>
  );

  const passwordChangeSuccess = (
    <div className="relative">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(200%_circle_at_center,white,transparent)]",
          `absolute top-0 min-h-full h-full z-[${LAYERS.BACKGROUND_1}]`
        )}
      />
      <ContestLayout>
        <div className="min-h-screen w-full max-md:p-2">
          <div className="md:w-[720px]  h-[376px] mt-10 bg-white border border-gray-300 rounded-2xl mx-auto flex flex-col justify-between">
            <div className="w-full border-b border-b-gray-300 h-16 text-SubheadLg text-primary-900 px-8 pt-5">
              Thay đổi mật khẩu thành công
            </div>
            <div className="text-center flex flex-col items-center">
              <Image
                alt=""
                src={"/image/icon/done-progress.png"}
                width={84}
                height={84}
              />
              <div className="text-xl text-[rgb(42,43,43)] mt-8">
                Mật khẩu đã được thay đổi. Xin vui lòng đăng nhập lại.
              </div>
            </div>
            <div className="w-full h-16 border-t border-gray-300 flex justify-between items-center px-14 max-tabletHeader:px-8 max-mobile:px-1">
              <Button
                outlined={true}
                className="border border-gray-300 h-10 !rounded-[3rem] max-tabletHeader:p-1"
                onClick={backToMainPage}
              >
                Quay lại trang chủ
              </Button>
              <Button
                className="h-10 !rounded-[3rem] max-mobile:p-3 max-tabletHeader:p-3"
                onClick={backToLoginPage}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </ContestLayout>
    </div>
  );

  return <>{isPasswordChanged ? passwordChangeSuccess : passWordChange}</>;
}
