"use client";
import { Label } from "@/components/ui/label";

import { useContestStore } from "@/store/ContestStore";
import { Input } from "../common/Input";
export default function Step1 () {
    const {
        fullName, schoolName, phoneNumber, schoolAddress, parentName, parentPhoneNumber
    } = useContestStore(state => {
        return {
            fullName: state.fullName,
            schoolName: state.schoolName,
            phoneNumber: state.phoneNumber,
            schoolAddress: state.schoolAddress,
            parentName: state.parentName,
            parentPhoneNumber: state.parentPhoneNumber,
        }
    });
    const change = useContestStore(state => state.change);
    const handleChangeFullName = (text: string) => {
        change("fullName", text);
    }
    const handleChangeSchoolName = (text: string) => {
        change("schoolName", text);
    }
    const handleChangePhoneNumber = (text: string) => {
        change("phoneNumber", text);
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
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Họ tên học sinh <span className="text-red-500">*</span></Label>
                <Input
                
                        type="text"
                        value={fullName}
                        onChange={handleChangeFullName}
                        placeholder="Câu trả lời"     
                        customClassNames="mt-2"          
                />
            </div>
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Trường học <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={schoolName}
                    onChange={handleChangeSchoolName}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                    
                />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Số điện thoại liên hệ <span className="text-red-500">*</span></Label>
                <Input
                    type="number"
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber}
                    placeholder="00-000-0000"
                    customClassNames="mt-2"  
                />
            </div>
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Quận, Huyện của trường  <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={schoolAddress}
                    onChange={handleChangeSchoolAddress}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Họ và tên phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    type="text"
                    value={parentName}
                    onChange={handleChangeParentName}
                    placeholder="Câu trả lời"
                    customClassNames="mt-2"  
                />
            </div>
            <div className="w-[50%]">
                <Label className="text-gray-950 text-SubheadSm">Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    type="number"
                    value={parentPhoneNumber}
                    onChange={handleChangeParentPhoneNumber}
                    placeholder="00-000-0000"
                    customClassNames="mt-2"  
                />
            </div>
        </div>
    </div>
    )
    
}