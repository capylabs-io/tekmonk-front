"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContestStore } from "@/store/ContestStore";
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
    return (
        <div className="space-y-4">
        <div className="flex gap-4">
            <div className="w-[50%]">
                <Label htmlFor="fullName">Họ tên học sinh <span className="text-red-500">*</span></Label>
                <Input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => change(e.target.name, e.target.value)}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="school">Trường học <span className="text-red-500">*</span></Label>
                <Input
                    id="school"
                    name="schoolName"
                    value={schoolName}
                    onChange={(e) => change(e.target.name, e.target.value)}
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
                    value={phoneNumber}
                    onChange={(e) => change(e.target.name, e.target.value)}
                    placeholder="00-000-0000"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="district">Quận, Huyện của trường  <span className="text-red-500">*</span></Label>
                <Input
                    id="district"
                    name="schoolAddress"
                    value={schoolAddress}
                    onChange={(e) => change(e.target.name, e.target.value)}
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
                    value={parentName}
                    onChange={(e) => change(e.target.name, e.target.value)}
                    placeholder="Câu trả lời"
                    required
                />
            </div>
            <div className="w-[50%]">
                <Label htmlFor="parentPhone">Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                <Input
                    id="parentPhone"
                    name="parentPhoneNumber"
                    value={parentPhoneNumber}
                    onChange={(e) => change(e.target.name, e.target.value)}
                    placeholder="00-000-0000"
                    required
                />
            </div>
        </div>
    </div>
    )
    
}