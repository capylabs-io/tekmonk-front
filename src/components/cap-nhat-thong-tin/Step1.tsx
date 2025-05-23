"use client";
import { Label } from "@/components/ui/label";
import { Input } from "../common/Input";
import DatePicker from "react-date-picker";
import { Controller, useFormContext } from "react-hook-form";
import { UpdateUserInfoSchema } from "@/validation/UpdateUserInfo";

export const UpdateInfoStep1 = () => {
  const {
    control,
    trigger,
    register,
    formState: { errors },
  } = useFormContext<UpdateUserInfoSchema>();

  //custom className
  const customInputClassNames = "max-mobile:placeholder:text-base";
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 max-[680px]:grid-cols-1">
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Tên đầy đủ <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.fullName"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Họ và tên của bạn"
                customClassNames="mt-2 mb-0"
                customInputClassNames={customInputClassNames}
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
                placeholder="Tên trường học"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Địa chỉ<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.studentAddress"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Địa chỉ của bạn"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className=" text-gray-950 text-SubheadSm">
            Ngày sinh<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.dateOfBirth"
            render={({ field: { value, onChange }, fieldState }) => (
              <div>
                <DatePicker
                  className={`w-full rounded-xl border ${
                    fieldState.error ? "border-red-500" : "border-grey-300"
                  } border-grey-300 bg-grey-50 px-2 outline-none min-h-[51.5px] mt-2 !font-light focus-visible:outline-none`}
                  onChange={onChange}
                  format="dd/MM/yyyy"
                  value={value}
                  onError={() => {
                    trigger("stepOne.dateOfBirth");
                  }}
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
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Lớp<span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.className"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Tên lớp học"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
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
                placeholder="VD: Quận Hoàn Kiếm - Hà Nội"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
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
                placeholder="Họ và tên phụ huynh"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
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
                type="text"
                value={value}
                onChange={onChange}
                placeholder="VD: 0912345678"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="">
          <Label className="text-gray-950 text-SubheadSm">
            Email của phụ huynh <span className="text-red-500">*</span>
          </Label>
          <Controller
            control={control}
            name="stepOne.parentEmail"
            render={({ field: { value, onChange }, fieldState }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Email của phụ huynh"
                customClassNames="mt-2"
                customInputClassNames={customInputClassNames}
                error={fieldState && fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>
      <div className="text-sm">
        Lưu ý: Các trường có đánh dấu <span className="text-red-500">*</span> là
        yêu cầu bắt buộc phải nhập, vui lòng nhập đúng thông tin.
      </div>
    </div>
  );
};
