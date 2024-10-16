"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
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
import { toast } from "react-toastify";
import { useLoadingStore } from "@/store/LoadingStore";
import { useUserStore } from "@/store/UserStore";
import { FormProvider, useForm } from "react-hook-form";
import { ContestRegister } from "@/types/common-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, WizardSchema } from "@/validation/ContestRegister";

const steps = [
  { title: "Thông tin", titleHeader: "THÔNG TIN CÁ NHÂN", icon: "1" },
  { title: "Tài khoản", titleHeader: "TẠO TÀI KHOẢN", icon: "2" },
  { title: "Bảng thi", titleHeader: "LỰA CHỌN BẢNG ĐẤU", icon: "3" },
  { title: "Xác nhận", titleHeader: "XÁC NHẬN ĐĂNG KÝ THAM GIA", icon: "4" },
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
  const data = useContestRegisterStore((state) => {
    return {
      fullName: state.fullName,
      schoolName: state.schoolName,
      phoneNumber: state.phoneNumber,
      schoolAddress: state.schoolAddress,
      parentName: state.parentName,
      parentPhoneNumber: state.parentPhoneNumber,
      studentAddress: state.studentAddress,
      studentDob: state.studentDob,
      email: state.email,
      username: state.username,
      password: state.password,
      contest_group_stage: Number(state.contest_group_stage),
      groupMemberInfo: state.groupMemberInfo,
    };
  });
  const groupMemberInfo = useContestRegisterStore((state) => state.groupMemberInfo);
  const [activeStep, setActiveStep] = useState(0);
  const defaultValues: ContestRegister = {
    fullName: "",
    schoolName: "",
    studentAddress: "",
    studentDob: "",
    className: "",
    schoolAddress: "",
    parentName: "",
    parentPhoneNumber: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    groupMemberInfo: [],
    contest_group_stage: "",
  }
  const methods = useForm<WizardSchema>({
    mode: "onChange",
    // defaultValues,
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
  }

  const handleNextStep = async () => {
    if (currentStep < steps.length - 1) {
      const stepName = getStepName(currentStep);
      const isValid = await methods.trigger(stepName);

      if (isValid)
        setCurrentStep(currentStep + 1);
    }
  }

  const handleNext = async (formData: any) => {
    console.log('formData', formData);
    console.log('groupMemberInfo', {
        ...get(formData, 'stepOne', {}),
          ...get(formData, 'stepTwo', {}),
          ...get(formData, 'stepThree', {}),
          groupMemberInfo: groupMemberInfo
    });
    console.log("check 1 = ", data);
    try {
      show();
      
        const res = await register({
          ...get(formData, 'stepOne', {}),
          ...get(formData, 'stepTwo', {}),
          ...get(formData, 'stepThree', {}),
          groupMemberInfo: groupMemberInfo
          
        });
        setCandidateNumber(get(res, "candidateNumber", ""));
        console.log('res', res);
        toast.success("Đăng ký thành công")
        setIsSubmitted(true);
      // router.push("/contest");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại");
    } finally {
      hide();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/contest");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
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
    router.push("/contest");
  };

  const handleAccept = () => {
    setIsAccepted(!isAccepted);
  };
  return (
    !isConnected() ? 
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
                {steps[currentStep].titleHeader ? steps[currentStep].titleHeader : "Đăng ký tham gia thành công"}
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
                    // disabled={currentStep === 0}
                    //   highlight={true}
                    className="rounded-[3rem] w-[108px] border-[1px] border-gray-300"
                  >
                    Quay lại
                  </Button>
                  <Button
                    onClick={currentStep === steps.length - 1 ? methods.handleSubmit(handleNext) : handleNextStep}
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
    </> : router.push("/contest")
  );
}
