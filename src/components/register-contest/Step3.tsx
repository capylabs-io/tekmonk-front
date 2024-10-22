"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import { Trash2 } from "lucide-react";
import { UserPlus } from "lucide-react";
import DatePicker from "react-date-picker";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { WizardSchema } from "@/validation/ContestRegister";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Input } from "../common/Input";
import { get } from "lodash";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export const Step3 = () => {
  const [value, onChange] = useState<Value>(new Date());
  const {
    control,
    trigger,
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<WizardSchema>();

  // Sử dụng useFieldArray để quản lý danh sách các thành viên
  const { fields, append, remove } = useFieldArray({
    control,
    name: "stepThree.groupMemberInfo", // Đây là path mà useFieldArray sẽ lắng nghe
  });

  const [valueGroup, setValueGroup] = useState<string>(
    getValues("stepThree.contest_group_stage")
  );

  const addTeamMember = () => {
    if (fields.length < 3) {
      append({
        name: "",
        schoolName: "",
        phone: "",
        dob: new Date(),
        parentName: "",
        parentPhoneNumber: "",
      });
    }
  };

  const deleteTeamMember = (indexToRemove: number) => {
    const currentMembers = getValues("stepThree.groupMemberInfo");
    if (currentMembers && currentMembers.length == 1) return;

    if (currentMembers && currentMembers.length > 1) {
      const updatedMembers = currentMembers.filter(
        (_, i) => i !== indexToRemove
      );

      setValue("stepThree.groupMemberInfo", updatedMembers);

      trigger("stepThree.groupMemberInfo");
    }
  };

  const checkContestGroupStage = () => {
    const groupStage = getValues("stepThree.contest_group_stage");
    setValueGroup(groupStage);
    if (groupStage !== "5") {
      setValue("stepThree.groupMemberInfo", []);
    }
  };

  useEffect(() => {
    if (fields.length == 0 && valueGroup == "5") {
      console.log("Auto-adding a team member");
      addTeamMember();
    }
  }, [valueGroup]);
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
              <td className="border border-gray-300 p-2">
                Tiểu học: 8 - 11 tuổi
              </td>
              <td className="border border-gray-300 p-2">Thi cá nhân</td>
              <td className="border border-gray-300 p-2">
                Lập trình bằng CodeCombat (Python hoặc JavaScript)
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bảng B</td>
              <td className="border border-gray-300 p-2">THCS: 12 - 15 tuổi</td>
              <td className="border border-gray-300 p-2">Thi cá nhân</td>
              <td className="border border-gray-300 p-2">
                Lập trình bằng CodeCombat (Python hoặc JavaScript)
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bảng C</td>
              <td className="border border-gray-300 p-2">THPT: 16 - 18 tuổi</td>
              <td className="border border-gray-300 p-2">Thi cá nhân</td>
              <td className="border border-gray-300 p-2">
                Lập trình bằng CodeCombat (Python hoặc JavaScript)
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Bảng D</td>
              <td className="border border-gray-300 p-2">
                THCS, THPT: Bảng sáng tạo
              </td>
              <td className="border border-gray-300 p-2">
                Thi cá nhân hoặc thi theo đội, tối đa 03 thành viên
              </td>
              <td className="border border-gray-300 p-2">
                <div>
                  Sáng tạo sản phẩm công nghệ phục vụ cho các chủ đề giải đáp
                  (sử dụng Scratch hoặc Python).
                </div>
                <div>
                  Sản phẩm sáng tạo dự thi chưa từng đạt giải các cuộc thi, hội
                  thi cấp quốc gia, quốc tế.
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Label className="text-SubheadSm text-gray-950">
          Thí sinh đăng ký bảng đấu <span className="text-red-500">*</span>
        </Label>
        <Controller
          control={control}
          name="stepThree.contest_group_stage"
          render={({ field: { value, onChange }, fieldState }) => (
            <RadioGroup
              name="stepThree.contest_group_stage"
              value={value ? value : "1"}
              onValueChange={(value) => {
                onChange(value);
                checkContestGroupStage();
              }}
              className="flex flex-col space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="category-A" />
                <Label className="text-bodyLg text-black ">
                  Bảng A (Khối tiểu học: 8 - 11 tuổi)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="category-B" />
                <Label className="text-bodyLg text-black">
                  Bảng B (Khối THCS: 12 - 15 tuổi)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="category-C" />
                <Label className="text-bodyLg text-black">
                  Bảng C (Khối THPT: 16 - 18 tuổi)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="category-D1" />
                <Label className="text-bodyLg text-black">
                  Thi cá nhân - Bảng D (Bảng sáng tạo cho học sinh THCS, THPT)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="category-D2" />
                <Label className="text-bodyLg text-black">
                  Thi nhóm - Bảng D (Bảng sáng tạo cho học sinh THCS, THPT)
                </Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      {valueGroup == "5" && (
        <>
          <div className="">
            {fields.map((member, index) => (
              <div key={index} className="p-2 relative">
                {index == 0 && (
                  <div className="p-2 mx-auto text-center text-SubheadLg">
                    Thông tin thành viên trong nhóm
                  </div>
                )}
                {index > 0 && (
                  <div className="w-full border-t border-gray-300"></div>
                )}
                <div
                  className="text-primary-900 text-SubheadMd mb-2 flex justify-between"
                  style={{
                    marginTop: index > 0 ? "2rem" : "0",
                  }}
                >
                  Thông tin thành viên {index + 2}{" "}
                  <Trash2
                    className="h-5 w-5 text-red-600 hover:cursor-pointer"
                    onClick={() => deleteTeamMember(index)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-950 text-SubheadSm">
                      Họ và tên thí sinh <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.name`}
                      render={({ field: { value, onChange }, fieldState }) => (
                        <>
                          <Input
                            type="text"
                            value={member.name ? member.name : value}
                            onChange={onChange}
                            placeholder="Câu trả lời"
                            customClassNames="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                            error={fieldState && fieldState.error?.message}
                          />
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-950 text-SubheadSm">
                      Trường học <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.schoolName`}
                      render={({ field: { value, onChange }, fieldState }) => (
                        <Input
                          type="text"
                          value={member.schoolName ? member.schoolName : value}
                          onChange={onChange}
                          placeholder="Câu trả lời"
                          customClassNames="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                          error={fieldState && fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-950 text-SubheadSm">
                      Số điện thoại liên hệ{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.phone`}
                      render={({ field: { value, onChange }, fieldState }) => (
                        <Input
                          type="text"
                          value={member.phone ? member.phone : value}
                          onChange={onChange}
                          placeholder="00-000-0000"
                          customClassNames="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                          error={get(
                            errors,
                            `stepThree.groupMemberInfo.${index}.phone.message`,
                            ""
                          )}
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <Label className=" text-gray-950 text-SubheadSm">
                      Ngày tháng năm sinh{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.dob`}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <div>
                          <DatePicker
                            className={`w-full rounded-xl border ${
                              fieldState.error
                                ? "border-red-500"
                                : "border-grey-300"
                            } bg-grey-50 p-2 outline-none min-h-[52.5px] text-lg focus-visible:outline-none`}
                            onChange={onChange}
                            value={member.dob ? member.dob : value}
                          />
                          {fieldState.error && (
                            <p className="text-red-500 text-sm">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-950 text-SubheadSm">
                      Họ và tên phụ huynh
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.parentName`}
                      render={({ field: { value, onChange }, fieldState }) => (
                        <Input
                          type="text"
                          value={member.parentName ? member.parentName : value}
                          onChange={onChange}
                          placeholder="Câu trả lời"
                          customClassNames="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                          error={fieldState && fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-950 text-SubheadSm">
                      Số điện thoại của phụ huynh
                    </Label>
                    <Controller
                      control={control}
                      name={`stepThree.groupMemberInfo.${index}.parentPhoneNumber`}
                      render={({ field: { value, onChange }, fieldState }) => (
                        <Input
                          type="text"
                          value={
                            member.parentPhoneNumber
                              ? member.parentPhoneNumber
                              : value
                          }
                          onChange={onChange}
                          placeholder="00-000-0000"
                          customClassNames="w-full rounded-xl border border-grey-300 bg-grey-50 p-3 outline-none min-h-[48px] text-lg focus-visible:outline-none"
                          error={fieldState && fieldState.error?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
            {fields.length < 2 && (
              <>
                <div className="w-full mt-2 border-t border-gray-300"></div>
                <Button
                  variant="outline"
                  className="w-[205px] mt-4 mx-auto bg-white text-primary-900 border-gray-300 rounded-full px-4 py-2 flex items-center space-x-2"
                  onClick={addTeamMember}
                >
                  <UserPlus className="w-5 h-5 text-black" />
                  <span className="text-SubheadMd">Thêm thành viên</span>
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
