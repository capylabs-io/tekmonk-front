"use client";
import { Label } from "@/components/ui/label";
import { useContestRegisterStore } from "@/store/ContestRegisterStore";
import { Input } from "../common/Input";
import DatePicker from "react-date-picker";
import { Controller, useFormContext } from "react-hook-form";
import { WizardSchema } from "@/validation/ContestRegister";

export const Step1 = () => {
  const { studentDob } = useContestRegisterStore((state) => {
    return {
      studentDob: state.studentDob,
    };
  });
  const change = useContestRegisterStore((state) => state.change);
  type IFormValue = {
    fullName: string;
    schoolName: string;
    studentAddress?: string;
    studentDob?: string;
    className: string;
    schoolAddress: string;
    parentName: string;
    parentPhoneNumber: string;
  };
  const defaultValues: IFormValue = {
    fullName: "",
    schoolName: "",
    studentAddress: "",
    studentDob: "",
    className: "",
    schoolAddress: "",
    parentName: "",
    parentPhoneNumber: "",
  };
  const handleChangeStudentDob = (text: string) => {
    change("studentDob", text);
  };

  const {
    control,
    trigger,
    register,
    formState: { errors },
  } = useFormContext<WizardSchema>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1">
        {/* <div className="flex gap-4"> */}
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Họ tên học sinh{" "}<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.fullName"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2 mb-0"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Trường học <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.schoolName"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Địa chỉ của học sinh
          </Label>
          <Controller
            control={control}
            name="stepOne.studentAddress"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                error={fieldState && fieldState.error?.message}
                customClassNames="mt-2"
              />
            )}
          />
        </div>
        <div className="mt-2">
          <Label className=" text-gray-950 text-SubheadSm">
            Ngày sinh của học sinh
          </Label>
          <Controller
            control={control}
            name="stepOne.dateOfBirth"
            render={({ field: { value, onChange }, fieldState }) => (
              <DatePicker
                className="w-full rounded-xl border border-grey-300 bg-grey-50 p-2 outline-none min-h-[53.5px] text-lg focus-visible:outline-none"
                onChange={onChange}
                value={value}
                onError={() => {
                  trigger("stepOne.dateOfBirth");
                }}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Tên lớp học<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.className"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Địa chỉ của trường<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.schoolAddress"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Họ và tên phụ huynh <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.parentName"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Câu trả lời"
                customClassNames="mt-2"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Số điện thoại của phụ huynh <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.parentPhoneNumber"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="number"
                value={value}
                onChange={onChange}
                placeholder="00-000-0000"
                customClassNames="mt-2"
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
