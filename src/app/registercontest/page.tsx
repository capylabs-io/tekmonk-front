'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Eye, EyeOff } from "lucide-react"

const steps = [
    { title: "Thông tin", icon: "1" },
    { title: "Tài khoản", icon: "2" },
    { title: "Bảng thi", icon: "3" },
    { title: "Xác nhận", icon: "4" },
]

interface TeamMember {
    name: string;
    schoolName: string;
    phone: string;
    dob: string;
    parentName: string;
    parentPhoneNumber: string;
}

interface FormData {
    fullName: string;
    school: string;
    phoneNumber: string;
    schoolAddress: string;
    parentName: string;
    parentPhoneNumber: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    contest_group_stage: string;
    groupMemberInfo: TeamMember[];
}

const Step1 = ({ formData, setFormData }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => (
    <div className="space-y-4">
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label htmlFor="fullName">Họ tên học sinh <span className="text-red-500">*</span></Label>
                <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="school">Trường học <span className="text-red-500">*</span></Label>
                <Input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label htmlFor="phoneNumber">Số điện thoại liên hệ <span className="text-red-500">*</span></Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="00-000-0000"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="district">Quận, Huyện của trường  <span className="text-red-500">*</span></Label>
                <Input
                    id="district"
                    name="district"
                    value={formData.schoolAddress}
                    onChange={(e) => setFormData({ ...formData, schoolAddress: e.target.value })}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label htmlFor="parentName">Họ và tên phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="parentPhone">Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhoneNumber}
                    onChange={(e) => setFormData({ ...formData, parentPhoneNumber: e.target.value })}
                    placeholder="00-000-0000"
                    required
                />
            </div>
        </div>
    </div>
)

const Step2 = ({ formData, setFormData }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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

const Step3 = ({ formData, setFormData }: { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<FormData>> }) => {
    const addTeamMember = () => {
        if (formData.groupMemberInfo.length < 2) {
            setFormData({
                ...formData,
                groupMemberInfo: [...formData.groupMemberInfo, { name: '', schoolName: '', phone: '', dob: '', parentName: '', parentPhoneNumber: '' }]
            });
        }
    };

    const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
        const updatedMembers = formData.groupMemberInfo.map((member, i) => 
            i === index ? { ...member, [field]: value } : member
        );
        setFormData({ ...formData, groupMemberInfo: updatedMembers });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin bảng đấu:</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Bảng</th>
                            <th className="border border-gray-300 p-2">Lớp</th>
                            <th className="border border-gray-300 p-2">Hình thức thi</th>
                            <th className="border border-gray-300 p-2">Nội dung thi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng A</td>
                            <td className="border border-gray-300 p-2">Tiểu học: 8 - 11 tuổi</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân</td>
                            <td className="border border-gray-300 p-2">Lập trình bằng CodeCombat (Python hoặc JavaScript)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng B</td>
                            <td className="border border-gray-300 p-2">THCS: 12 - 15 tuổi</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân</td>
                            <td className="border border-gray-300 p-2"></td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng C</td>
                            <td className="border border-gray-300 p-2">THPT: 16 - 18 tuổi</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân</td>
                            <td className="border border-gray-300 p-2"></td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng D</td>
                            <td className="border border-gray-300 p-2">THCS, THPT: Bảng sáng tạo</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân hoặc thi theo đội, tối đa 03 thành viên</td>
                            <td className="border border-gray-300 p-2">Sáng tạo sản phẩm công nghệ phục vụ cho các chủ đề giải đáp (sử dụng Scratch hoặc Python).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Label className="text-base font-semibold">Thí sinh đăng ký bảng đấu <span className="text-red-500">*</span></Label>
                <RadioGroup
                    value={formData.contest_group_stage}
                    onValueChange={(value) => setFormData({ ...formData, contest_group_stage: value })}
                    className="flex flex-col space-y-2 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="A" id="category-A" />
                        <Label htmlFor="category-A">Bảng A (Khối tiểu học: 8 - 10 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="B" id="category-B" />
                        <Label htmlFor="category-B">Bảng B (Khối THCS: 11 - 14 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="C" id="category-C" />
                        <Label htmlFor="category-C">Bảng C (Khối THPT: 15 - 17 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="D" id="category-D" />
                        <Label htmlFor="category-D">Bảng D (Bảng sáng tạo: 11 - 17 tuổi)</Label>
                    </div>
                </RadioGroup>
            </div>

            {formData.contest_group_stage === 'D' && (
                <div className="space-y-4">
                    {formData.groupMemberInfo.map((member, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md">
                            <h4 className="text-lg font-semibold mb-2">Thông tin thành viên {index + 2}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`name-${index}`}>Họ và tên thí sinh</Label>
                                    <Input 
                                        id={`name-${index}`}
                                        value={member.name}
                                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`school-${index}`}>Trường học</Label>
                                    <Input 
                                         
                                        id={`school-${index}`}
                                        value={member.schoolName}
                                        onChange={(e) => updateTeamMember(index, 'schoolName', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`phone-${index}`}>Số điện thoại liên hệ</Label>
                                    <Input 
                                        id={`phone-${index}`}
                                        value={member.phone}
                                        onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`dob-${index}`}>Ngày tháng năm sinh</Label>
                                    <Input 
                                        id={`dob-${index}`}
                                        type="date"
                                        value={member.dob}
                                        onChange={(e) => updateTeamMember(index, 'dob', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`parent-name-${index}`}>Họ và tên phụ huynh</Label>
                                    <Input 
                                        id={`parent-name-${index}`}
                                        value={member.parentName}
                                        onChange={(e) => updateTeamMember(index, 'parentName', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`parent-phone-${index}`}>Số điện thoại của phụ huynh</Label>
                                    <Input 
                                        id={`parent-phone-${index}`}
                                        value={member.parentPhoneNumber}
                                        onChange={(e) => updateTeamMember(index, 'parentPhoneNumber', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {formData.groupMemberInfo.length < 2 && (
                        <Button onClick={addTeamMember} className="mt-4">
                            Thêm thành viên
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

const Step4 = ({ formData }: { formData: FormData }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold">Xác nhận thông tin</h3>
        <div>
            <p><strong>Họ tên:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Số điện thoại:</strong> {formData.phoneNumber}</p>
            <p><strong>Bảng đấu:</strong> {formData.contest_group_stage}</p>
            {formData.contest_group_stage === 'D' && formData.groupMemberInfo.length > 0 && (
                <div>
                    <div className="font-semibold mt-2">Thông tin thành viên nhóm:</div>
                    {formData.groupMemberInfo.map((member, index) => (
                        <div key={index} className="ml-4">
                            <p><strong>Thành viên {index + 2}:</strong> {member.name}</p>
                            <p><strong>Trường:</strong> {member.schoolName}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <p>Vui lòng kiểm tra lại thông tin trước khi xác nhận đăng ký.</p>
    </div>
)

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

export default function MultiStepRegistrationForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        school: "",
        phoneNumber: "",
        schoolAddress: "",
        parentName: "",
        parentPhoneNumber: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        contest_group_stage: "",
        groupMemberInfo: []
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
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
                return <Step1 formData={formData} setFormData={setFormData} />
            case 1:
                return <Step2 formData={formData} setFormData={setFormData} />
            case 2:
                return <Step3 formData={formData} setFormData={setFormData} />
            case 3:
                return <Step4 formData={formData} />
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
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    index < currentStep
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
                                                    className={`h-1 flex-1 ${
                                                        index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
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