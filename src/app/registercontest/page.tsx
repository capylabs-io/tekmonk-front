'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Eye, EyeOff, Trash2 } from "lucide-react"
import Step1 from "@/components/register-contest/Step1"
import Step2 from "@/components/register-contest/Step2"
import Step3 from "@/components/register-contest/Step3"
import Step4 from "@/components/register-contest/Step4"
import { useContestStore } from "@/store/ContestStore"

const steps = [
    { title: "Thông tin", icon: "1" },
    { title: "Tài khoản", icon: "2" },
    { title: "Bảng thi", icon: "3" },
    { title: "Xác nhận", icon: "4" },
]


const SuccessComponent = ({ onGoBack, onViewContest, onLogin }: { onGoBack: () => void, onViewContest: () => void, onLogin: () => void }) => (
    <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold text-purple-800">ĐĂNG KÝ THAM GIA THÀNH CÔNG</h2>
        <div className="flex justify-center">
            <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-white" />
            </div>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
            Cảm ơn bạn đã đăng ký tham gia "VIETNAM CODING OLYMPIAD 2024"! Chúng tôi sẽ sớm
            gửi thông tin chi tiết về sự kiện qua email. Hãy chuẩn bị cho những thử thách thú vị phía
            trước!
        </p>
        <div className="flex justify-center space-x-4">
            <Button
                variant="outline"
                onClick={onGoBack}
                className="px-6 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50"
            >
                Quay lại
            </Button>
            <Button
                variant="outline"
                onClick={onViewContest}
                className="px-6 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50"
            >
                Nội dung cuộc thi
            </Button>
            <Button
                onClick={onLogin}
                className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
            >
                Đăng nhập
            </Button>
        </div>
    </div>
)

export default function RegisterContest() {

    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const data
     = useContestStore(state => {
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
            groupMemberInfo: state.groupMemberInfo
        }
    });

    const register = useContestStore(state => state.register)
    const handleNext = () => {
        console.log("data = ", data)
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            //check log data
            console.log("data = ", data)
            register(data)
            setIsSubmitted(true)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleGoBack = () => {
        setIsSubmitted(false)
        setCurrentStep(0)
    }

    const handleViewContest = () => {
        // Implement view contest logic
        console.log("View contest content")
    }

    const handleLogin = () => {
        // Implement login logic
        console.log("Navigate to login page")
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 />
            case 3:
                return <Step4 />
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-purple-800">
                        TIEN PHONG STEM ROBOTICS
                    </CardTitle>
                    <p className="text-center text-gray-600">IYRC CHAMPIONSHIP 2024</p>
                </CardHeader>
                <CardContent>
                    {!isSubmitted ? (
                        <>
                            <div className="mb-8">
                                <div className="flex justify-between items-center ml-[11%]">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex items-center flex-1">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep
                                                        ? 'bg-purple-600 text-white'
                                                        : index === currentStep
                                                            ? 'bg-purple-600 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                    }`}
                                            >
                                                {index < currentStep ? (
                                                    <Check className="w-5 h-5" />
                                                ) : (
                                                    step.icon
                                                )}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`h-1 flex-1 ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 w-[90%] ml-[2%] flex justify-between">
                                    {steps.map((step, index) => (
                                        <span key={index} className="text-xs text-gray-500 flex-1 text-center">
                                            {step.title}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {renderStepContent()}

                            <div className="mt-8 flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0}
                                    className="px-6 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50"
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                                >
                                    {currentStep === steps.length - 1 ? 'Xác nhận' : 'Tiếp tục'}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <SuccessComponent
                            onGoBack={handleGoBack}
                            onViewContest={handleViewContest}
                            onLogin={handleLogin}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}