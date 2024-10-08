"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useContestStore } from "@/store/ContestStore";
import { get } from "lodash";
import { Trash2 } from "lucide-react";

export default function Step3 () {
    
    const {
        groupMemberInfo, contest_group_stage
    } = useContestStore(state => {
        return {
            groupMemberInfo: state.groupMemberInfo,
            contest_group_stage: state.contest_group_stage
        }
    });
    const change = useContestStore(state => state.change);
    const changeGroupMemberInfo = useContestStore(state => state.changeGroupMemberInfo);

    const addTeamMember = () => {
        if (groupMemberInfo.length < 2) {
            change('groupMemberInfo', [...groupMemberInfo, {
                name: '',
                schoolName: '',
                phone: '',
                dob: '',
                parentName: '',
                parentPhoneNumber: ''
            }]);
        }
    };

    const updateTeamMember = (index: number, key: string, value: any) => {
        changeGroupMemberInfo(index, key, value);
    };

    const deleteTeamMember = (index: number) => {
        const newGroupMemberInfo = groupMemberInfo.filter((_, i) => i !== index);
        change('groupMemberInfo', newGroupMemberInfo);
    }

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
                    value={contest_group_stage}
                    onValueChange={(value) => change('contest_group_stage', value)}
                    className="flex flex-col space-y-2 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="category-A" />
                        <Label htmlFor="category-A">Bảng A (Khối tiểu học: 8 - 10 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="category-B" />
                        <Label htmlFor="category-B">Bảng B (Khối THCS: 11 - 14 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="category-C" />
                        <Label htmlFor="category-C">Bảng C (Khối THPT: 15 - 17 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="category-D" />
                        <Label htmlFor="category-D">Bảng D (Bảng sáng tạo: 11 - 17 tuổi)</Label>
                    </div>
                </RadioGroup>
            </div>

            {contest_group_stage === "4" && (
                <div className="space-y-4">
                    {groupMemberInfo.map((member, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md relative">
                            <h4 className="text-lg font-semibold mb-2">Thông tin thành viên {index + 2}</h4>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => deleteTeamMember(index)}
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`name-${index}`}>Họ và tên thí sinh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`name-${index}`}
                                        value={member.name}
                                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                        placeholder="Câu trả lời"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`school-${index}`}>Trường học <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`school-${index}`}
                                        value={member.schoolName}
                                        onChange={(e) => updateTeamMember(index, 'schoolName', e.target.value)}
                                        placeholder="Câu trả lời"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`phone-${index}`}>Số điện thoại liên hệ <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`phone-${index}`}
                                        value={member.phone}
                                        onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                        placeholder="00-000-0000"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`dob-${index}`}>Ngày tháng năm sinh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`dob-${index}`}
                                        type="date"
                                        value={member.dob}
                                        onChange={(e) => updateTeamMember(index, 'dob', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`parent-name-${index}`}>Họ và tên phụ huynh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`parent-name-${index}`}
                                        value={member.parentName}
                                        onChange={(e) => updateTeamMember(index, 'parentName', e.target.value)}
                                        placeholder="Câu trả lời"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={`parent-phone-${index}`}>Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`parent-phone-${index}`}
                                        value={member.parentPhoneNumber}
                                        onChange={(e) => updateTeamMember(index, 'parentPhoneNumber', e.target.value)}
                                        placeholder="00-000-0000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {groupMemberInfo.length < 2 && (
                        <Button onClick={addTeamMember} className="mt-4">
                            Thêm thành viên
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}


