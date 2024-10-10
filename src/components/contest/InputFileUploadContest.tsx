"use client";
import { Button } from "@/components/common/Button";
import classNames from "classnames";
import { X } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  value?: File | null; 
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string;
  onChange?: (file: File | null) => void; 
  onBlur?: () => void;
};

const BASE_CLASS =
  "w-full rounded-xl border border-grey-300 bg-grey-50 p-3 min-h-[64px] flex flex-col items-center justify-center relative text-sm";

export const InputFileUploadContest = ({
  title,
  value,
  error,
  onChange,
  onBlur,
  customClassNames,
}: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange && onChange(file); 
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  // Thêm hàm xử lý xóa file
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange && onChange(null);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  return (
    <>
      <div className={classNames("flex w-full items-start mt-5", customClassNames)}>
        <div className="w-1/4">
          <label
            htmlFor="file_input"
            className="text-SubheadSm text-primary-950"
          >
            {title}
          </label>
        </div>
        {/* File Upload Box */}
        <div
          className="py-4 text-bodyLg flex flex-col items-center gap-3 justify-center relative border border-gray-200 bg-gray-50 rounded-lg w-full cursor-pointer"
          onClick={handleClick}
        >
          {value ? (
            // Hiển thị tên file và nút xóa
            <div className="flex items-center gap-2">
              <p>{value.name}</p>
              <button
                onClick={handleRemoveFile}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            // Hiển thị giao diện upload khi chưa có file
            <>
              <p>Kéo thả file dự án để bắt đầu đăng tải</p>
              <p className="text-gray-500">hoặc</p>
              <Button
                className="h-[52px] rounded-[4rem] px-6"
                outlined={false}
                style={{
                  borderRadius: "4rem",
                }}
              >
                Lựa chọn file
              </Button>
            </>
          )}
          <input
            type="file"
            name="file_input"
            className="outline-none w-full grow bg-transparent opacity-0 hidden"
            ref={hiddenFileInput}
            onChange={handleOnChange}
            onBlur={onBlur}
          />
        </div>
      </div>
      {/* Display any error message */}
      {error && <p className="mt-2 self-start text-sm text-red-600">{error}</p>}
    </>
  );
};
