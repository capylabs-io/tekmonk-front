"use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Check } from "lucide-react";
import {Step1} from "@/components/register-contest/Step1";
import {Step2} from "@/components/register-contest/Step2";
import {Step3} from "@/components/register-contest/Step3";
import {Step4} from "@/components/register-contest/Step4";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import SuccessComponent from "@/components/register-contest/Success";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { get } from "lodash";

const steps = [
  { title: "Thông tin", titleHeader: "THÔNG TIN CÁ NHÂN", icon: "1" },
  { title: "Tài khoản", titleHeader: "TẠO TÀI KHOẢN", icon: "2" },
  { title: "Bảng thi", titleHeader: "LỰA CHỌN BẢNG ĐẤU", icon: "3" },
  { title: "Xác nhận", titleHeader: "XÁC NHẬN ĐĂNG KÝ THAM GIA", icon: "4" },
];

export default function RegisterContest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [candidateNumber, setCandidateNumber] = useState<string>("");
  const router = useRouter();
  const data = useContestRegisterStore((state) => {
    return {
      fullName: state.fullName,
      schoolName: state.schoolName,
      phoneNumber: state.phoneNumber,
      schoolAddress: state.schoolAddress,
      parentName: state.parentName,
      parentPhoneNumber: state.parentPhoneNumber,
      email: state.email,
      username: state.username,
      password: state.password,
      contest_group_stage: Number(state.contest_group_stage),
      groupMemberInfo: state.groupMemberInfo,
    };
  });

  const [register] = useContestRegisterStore((state) => [state.register]);
  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
      try {
        const res = await register(data);
        setCandidateNumber(get(res, "candidateNumber",""));
        console.log(res)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }else {
      router.push("/contest");
    }
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
    setCurrentStep(0);
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
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1440px] mt-4 min-h-screen grid grid-cols-1 mx-auto ">
      <div className="w-full px-4">
          <div
          className="w-full px-4 max-w-[720px] mx-auto h-80 rounded-2xl max-mobile:h-48"
          style={{
            backgroundImage: "url('/image/contest/Banner.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

        </div>
      </div>
      

      <div className="w-full flex items-center justify-center mt-4 mb-5 px-4 sm:px-6 lg:px-8 max-mobile:mt-1">
        <Card className="w-full max-w-[720px] rounded-2xl">
          <div className="w-full min-h-16 p-6 ">
            <div className=" text-SubheadLg text-primary-900 max-mobile:text-center">
              {steps[currentStep].titleHeader}
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

                {renderStepContent()}
              </>
            ) : (
              <>
                <SuccessComponent candidateNumber={candidateNumber}/>
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
                  onClick={handleNext}
                  className="rounded-[3rem] w-[108px]"
                >
                  {currentStep === steps.length - 1 ? "Xác nhận" : "Tiếp tục"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full border-t border-gray-300"></div>
              <div className="flex h-16 px-6 py-3 justify-between">
                <Button
                  onClick={handleGoBack}
                  disabled={currentStep === 0}
                  outlined={true}
                  className="rounded-[3rem] w-[108px] border-[1px] border-gray-300"
                >
                  Quay lại
                </Button>
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push("/contest")}
                    className="rounded-[3rem] w-[178px] border-[1px] border-gray-300"
                    outlined={true}
                  >
                    Nội dung cuộc thi
                  </Button>
                  <Button
                    onClick={() => router.push("/login")}
                    className="rounded-[3rem] w-[130px]"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}