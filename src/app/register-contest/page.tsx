"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Step1 } from "@/components/register-contest/Step1";
import { Step2 } from "@/components/register-contest/Step2";
import { Step3 } from "@/components/register-contest/Step3";
import { Step4 } from "@/components/register-contest/Step4";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import SuccessComponent from "@/components/register-contest/Success";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { get } from "lodash";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, WizardSchema } from "@/validation/ContestRegister";
import HandleReturnMessgaeErrorAxios from "@/requests/return-message-error";
import { useSnackbarStore } from "@/store/SnackbarStore";

const steps = [
  {
    title: "Thông tin",
    titleHeader: "THÔNG TIN CÁ NHÂN",
    icon: "1",
    description: "Lưu lại thông tin cá nhân dùng để xác nhận khi dự thi",
  },
  {
    title: "Tài khoản",
    titleHeader: "TẠO TÀI KHOẢN",
    icon: "2",
    description: "Dùng để đăng nhập vào tài khoản cho cuộc thi",
  },
  {
    title: "Bảng thi",
    titleHeader: "LỰA CHỌN BẢNG ĐẤU",
    icon: "3",
    description:
      "Lựa chọn bảng đấu phù hợp với bạn (Lưu ý: nếu chọn thi nhóm ở bảng D thì bạn phải nhập thông tin thành viên của mình)",
  },
  {
    title: "Xác nhận",
    titleHeader: "XÁC NHẬN ĐĂNG KÝ THAM GIA",
    icon: "4",
    description:
      "Lưu ý xác nhận kĩ thông tin của mình trước khi xác nhận đăng ký",
  },
];

export default function RegisterContest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [candidateNumber, setCandidateNumber] = useState<string>("");
  const [isAccepted, setIsAccepted] = useState(false);
  const isConnected = useUserStore((state) => state.isConnected);
  const [register, clear] = useContestRegisterStore((state) => [
    state.register,
    state.clear,
  ]);
  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [error, success] = useSnackbarStore((state) => [
    state.error,
    state.success,
  ]);
  const groupMemberInfo = useContestRegisterStore(
    (state) => state.groupMemberInfo
  );

  const methods = useForm<WizardSchema>({
    mode: "onChange",
    resolver: zodResolver(wizardSchema),
  });

  const getStepName = (step: number) => {
    switch (step) {
      default:
      case 0:
        return "stepOne";
      case 1:
        return "stepTwo";
      case 2:
        return "stepThree";
    }
  };

  const handleNextStep = async () => {
    if (currentStep < steps.length - 1) {
      const stepName = getStepName(currentStep);
      const isValid = await methods.trigger(stepName);
      console.log("isValid", isValid);
      console.log("check groupStage", get(methods.getValues(), "stepThree"));
      if (isValid) setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = async (formData: any) => {
    console.log("formData", formData);
    console.log("groupMemberInfo", {
      ...get(formData, "stepOne", {}),
      ...get(formData, "stepTwo", {}),
      ...get(formData, "stepThree", {}),
    });
    try {
      show();

      const res = await register({
        ...get(formData, "stepOne", {}),
        ...get(formData, "stepTwo", {}),
        ...get(formData, "stepThree", {}),
      });
      setCandidateNumber(get(res, "candidateNumber", ""));
      success("Xong!", "Đăng ký thành công");
      setIsSubmitted(true);
    } catch (err) {
      const message = HandleReturnMessgaeErrorAxios(err);
      error("Lỗi", message);
    } finally {
      hide();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        //clear groupMemberInfo informData when back to step 1
        // method.setValue(
        //   "stepThree.contest_group_stage", "1"
        // );
        // console.log("groupMemberInfo", get(methods.getValues(), "stepThree"));
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:

        return <Step3 />;
      case 3:
        return <Step4 updateStatus={handleAccept} />;
      default:
        return null;
    }
  };

  const handleBackToLogin = () => {
    clear();
    router.push("/login");
  };

  const handleBackToContest = () => {
    clear();
    router.push("/");
  };

  const handleAccept = () => {
    setIsAccepted(!isAccepted);
  };

  useEffect(() => {
    if (currentStep == 3) {
      setIsAccepted(false);
    }
  }, [currentStep]);
  return !isConnected() ? (
    <>
      <div className="h-full mt-4 overflow-auto">
        <div className="px-2">
          <div
            className="w-full max-w-[720px] mx-auto h-80 rounded-2xl max-mobile:h-48"
            style={{
              backgroundImage: "url('/image/contest/Banner.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="p-2">
          <Card className="w-full max-w-[720px] mt-2 mx-auto rounded-2xl bg-white">
            <div className="w-full min-h-16 p-6 ">
              <div className=" text-SubheadLg text-primary-900 max-mobile:text-center">
                {steps[currentStep].titleHeader
                  ? steps[currentStep].titleHeader
                  : "Đăng ký tham gia thành công"}
              </div>
              <div className="text-bodyMd">
                {steps[currentStep].description
                  ? steps[currentStep].description
                  : ""}
              </div>
            </div>
            <div className="w-full border-t border-gray-300"></div>

            <CardContent className="mt-6">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center ml-[11%]">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-center flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index < currentStep
                                ? "bg-primary-600 text-white"
                                : index === currentStep
                                ? "bg-primary-50 text-gray-600 text-SubheadMd border-[2px] border-primary-600"
                                : "bg-white text-gray-600 border-[2px] border-gray-300"
                            }`}
                          >
                            {index < currentStep ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`h-[2px] flex-1 ${
                                index < currentStep
                                  ? "bg-primary-600"
                                  : "bg-gray-300"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 w-[90%] ml-[1.7%] flex justify-between">
                      {steps.map((step, index) => (
                        <span
                          key={index}
                          className="text-xs text-gray-500 flex-1 text-center"
                        >
                          {step.title}
                        </span>
                      ))}
                    </div>
                  </div>
                  <FormProvider {...methods}>
                    {renderStepContent()}
                  </FormProvider>
                </>
              ) : (
                <>
                  <SuccessComponent candidateNumber={candidateNumber} />
                </>
              )}
            </CardContent>
            {!isSubmitted ? (
              <>
                <div className="w-full border-t border-gray-300"></div>
                <div className="flex h-16 px-6 py-3 justify-between">
                  <Button
                    outlined={true}
                    onClick={handlePrevious}
                    className="rounded-[3rem] w-[108px] border-[1px] border-gray-300"
                  >
                    Quay lại
                  </Button>
                  <Button
                    onClick={
                      currentStep === steps.length - 1
                        ? methods.handleSubmit(handleNext)
                        : handleNextStep
                    }
                    className="rounded-[3rem] w-[108px]"
                    disabled={currentStep === 3 && !isAccepted}
                  >
                    {currentStep === steps.length - 1 ? "Xác nhận" : "Tiếp tục"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full border-t border-gray-300"></div>
                <div className="flex h-16 px-6 py-3 gap-2 justify-between">
                  <Button
                    onClick={handleBackToContest}
                    className="rounded-[3rem] w-[178px] border-[1px] border-gray-300"
                    outlined={true}
                  >
                    Nội dung cuộc thi
                  </Button>
                  <Button
                    onClick={handleBackToLogin}
                    className="rounded-[3rem] w-[130px]"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  ) : (
    router.push("/")
  );
}
