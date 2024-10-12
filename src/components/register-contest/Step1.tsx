"use client";
import { Label } from "@/components/ui/label";

import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import { Input } from "../common/Input";
export const Step1 = () => {
    const {
        fullName, schoolName, className, schoolAddress, parentName, parentPhoneNumber
    } = useContestRegisterStore(state => {
        return {
            fullName: state.fullName,
            schoolName: state.schoolName,
            className: state.className,
            schoolAddress: state.schoolAddress,
            parentName: state.parentName,
            parentPhoneNumber: state.parentPhoneNumber,
        }
    });
    const change = useContestRegisterStore(state => state.change);
    const handleChangeFullName = (text: string) => {
        change("fullName", text);
    }
    const handleChangeSchoolName = (text: string) => {
        change("schoolName", text);
    }
    const handleChangeClassname = (text: string) => {
        change("className", text);
    }
    const handleChangeSchoolAddress = (text: string) => {
        change("schoolAddress", text);
    }
    const handleChangeParentName = (text: string) => {
        change("parentName", text);
    }
    const handleChangeParentPhoneNumber = (text: string) => {
        change("parentPhoneNumber", text);
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1">
                {/* <div className="flex gap-4"> */}
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Họ tên học sinh <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={fullName}
                    onChange={handleChangeFullName}
                    placeholder="Câu trả lời"     
                    customClassNames="mt-2 mb-0"
                />
            </div>
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Trường học <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={schoolName}
                    onChange={handleChangeSchoolName}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"
                />
            </div>
        {/* </div> */}
        {/* <div className="flex gap-4"> */}
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Tên lớp học<span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={className}
                    onChange={handleChangeClassname}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                />
            </div>
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Địa chỉ của trường<span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={schoolAddress}
                    onChange={handleChangeSchoolAddress}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                />
            </div>
        {/* </div> */}
        {/* <div className="flex gap-4"> */}
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Họ và tên phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={parentName}
                    onChange={handleChangeParentName}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                />
            </div>
            <div className="">
                <Label className="text-gray-950 text-SubheadSm">Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    type="number"
                    value={parentPhoneNumber}
                    onChange={handleChangeParentPhoneNumber}
                    placeholder="00-000-0000"
                    customClassNames="mt-2"  
                />
            </div>
        {/* </div> */}
            </div>

        
    </div>
    )
    
}