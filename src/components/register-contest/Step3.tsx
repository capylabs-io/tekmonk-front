"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useContestStore } from "@/store/ContestStore";
import { get } from "lodash";
import { Trash2 } from "lucide-react";
import { UserPlus } from "lucide-react";

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
                            <td className="border border-gray-300 p-2">Lập trình bằng CodeCombat (Python hoặc JavaScript)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng C</td>
                            <td className="border border-gray-300 p-2">THPT: 16 - 18 tuổi</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân</td>
                            <td className="border border-gray-300 p-2">Lập trình bằng CodeCombat (Python hoặc JavaScript)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Bảng D</td>
                            <td className="border border-gray-300 p-2">THCS, THPT: Bảng sáng tạo</td>
                            <td className="border border-gray-300 p-2">Thi cá nhân hoặc thi theo đội, tối đa 03 thành viên</td>
                            <td className="border border-gray-300 p-2">
                                <div>Sáng tạo sản phẩm công nghệ phục vụ cho các chủ đề giải đáp (sử dụng Scratch hoặc Python).</div>
                                <div>Sản phẩm sáng tạo dự thi chưa từng đạt giải các cuộc thi, hội thi cấp quốc gia, quốc tế.</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <Label className="text-SubheadSm text-gray-950">Thí sinh đăng ký bảng đấu <span className="text-red-500">*</span></Label>
                <RadioGroup
                    value={contest_group_stage}
                    onValueChange={(value) => change('contest_group_stage', value)}
                    className="flex flex-col space-y-2 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="category-A" />
                        <Label className="text-bodyLg text-black ">Bảng A (Khối tiểu học: 8 - 11 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="category-B" />
                        <Label className="text-bodyLg text-black">Bảng B (Khối THCS: 12 - 15 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="category-C" />
                        <Label className="text-bodyLg text-black">Bảng C (Khối THPT: 16 - 18 tuổi)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="category-D1" />
                        <Label className="text-bodyLg text-black">Thi cá nhân - Bảng D(Bảng sáng tạo cho học sinh THCS, THPT)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5" id="category-D2" />
                        <Label className="text-bodyLg text-black">Thi nhóm - Bảng D(Bảng sáng tạo cho học sinh THCS, THPT)</Label>
                    </div>
                </RadioGroup>
            </div>

            {contest_group_stage === "5" && (
                <div className="space-y-4">
                    {groupMemberInfo.map((member, index) => (
                        <div key={index} className="p-2 relative">
                            {index > 0 && 
                                <div className="w-full border-t border-gray-300"></div>
                            }
                            <div className="text-primary-900 text-SubheadLg mb-2" style={{
                                marginTop: index > 0 ? '2rem' : '0'
                            }}>Thông tin thành viên {index + 2} </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                style={{
                                    top: index > 0 ? '2rem' : '0'
                                }}
                                onClick={() => deleteTeamMember(index)}
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Họ và tên thí sinh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`name-${index}`}
                                        value={member.name}
                                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                        placeholder="Câu trả lời"
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Trường học <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`school-${index}`}
                                        value={member.schoolName}
                                        onChange={(e) => updateTeamMember(index, 'schoolName', e.target.value)}
                                        placeholder="Câu trả lời"
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Số điện thoại liên hệ <span className="text-red-500">*</span></Label>
                                    <Input 
                                        id={`phone-${index}`}
                                        value={member.phone}
                                        onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                                        placeholder="00-000-0000"
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Ngày tháng năm sinh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        type="date"
                                        value={member.dob}
                                        onChange={(e) => updateTeamMember(index, 'dob', e.target.value)}
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Họ và tên phụ huynh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        value={member.parentName}
                                        onChange={(e) => updateTeamMember(index, 'parentName', e.target.value)}
                                        placeholder="Câu trả lời"
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                                <div>
                                    <Label className="text-gray-950 text-SubheadSm">Số điện thoại của phụ huynh <span className="text-red-500">*</span></Label>
                                    <Input 
                                        value={member.parentPhoneNumber}
                                        onChange={(e) => updateTeamMember(index, 'parentPhoneNumber', e.target.value)}
                                        placeholder="00-000-0000"
                                        className="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                                    />
                                </div>
                            </div>

                            
                        </div>
                    ))}
                    {groupMemberInfo.length < 2 && (
                        <Button
                        variant="outline"
                        className="w-[205px] mx-auto bg-white text-primary-900 border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2"
                        onClick={addTeamMember}
                      >
                        <UserPlus className="w-5 h-5 text-black" />
                        <span className="text-SubheadMd">Thêm thành viên</span>
                      </Button>
                    )}
                </div>
            )}
        </div>
    )
}


