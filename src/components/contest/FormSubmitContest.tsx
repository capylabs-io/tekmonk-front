import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContentNoClose,
  DialogTrigger,
} from "@/components/common/Dialog";
import InputField from "@/components/contest/InputField";
import { InputFileUploadContest } from "@/components/contest/InputFileUploadContest";
import { InputImgUploadContest } from "@/components/contest/InputImgUploadContest";
import React, { useState } from "react";

const FormSubmitContest = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null>(null);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFileChange = (file: File | null) => {
    setProjectFile(file);
    console.log(projectFile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div ref={ref} onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContentNoClose className="max-w-[688px] sm:rounded-[32px] overflow-y-auto max-h-screen">
        <div className="px-2 sm:px-14 border-b text-center border-gray-200">
          <h4 className="text-SubheadXl text-primary-900 mb-1 md:text-xl sm:text-lg text-base">
            Nộp bài thi
          </h4>
          <p className="text-bodyXl sm:text-bodyLg w-full mt-1 mb-2 sm:mb-5 md:text-base sm:text-sm text-xs">
            Lưu ý: Mỗi thí sinh chỉ được nộp bài thi một lần. Bài dự thi không
            thể xoá hoặc chỉnh sửa sau khi đã nộp. Vui lòng kiểm tra kĩ trước
            khi đăng tải.
          </p>
        </div>
        <section className="px-6">
          <InputField
            title="Tên dự án"
            type="text"
            customClassNames="mb-2 sm:mb-5"
            placeholder="VD: Chatbot Miracle"
          />
          <div className="w-full border-t border-gray-200 py-2 sm:py-5">
            <InputImgUploadContest title="Ảnh dự án" />
            <InputFileUploadContest
              title="File dự án"
              onChange={handleFileChange}
              value={projectFile}
            />
          </div>
          <div className="flex flex-col gap-[18px] border-t border-gray-200 py-5">
            <InputField
              title="Tags"
              type="text"
              placeholder="VD: B2C, AI, design...."
            />
            <InputField
              title="Mô tả"
              type="text-area"
              placeholder="Viết vài dòng giới thiệu tổng quan dự án"
            />
          </div>
        </section>
        <footer className="flex flex-wrap items-center sm:justify-between p-2 gap-1 sm:px-6 sm:pt-6 border-t border-gray-200 justify-center">
          <Button
            className="rounded-[4rem] border border-gray-300 sm:w-[280px]"
            outlined={true}
            style={{
              borderRadius: "4rem",
            }}
            onClick={closeDialog}
          >
            Huỷ
          </Button>
          <Button
            className="w-[280px]"
            outlined={false}
            style={{
              borderRadius: "4rem",
            }}
            onClick={closeDialog}
          >
            Nộp bài
          </Button>
        </footer>
      </DialogContentNoClose>
    </Dialog>
  );
});

FormSubmitContest.displayName = "SubmitContestDialog";

export default FormSubmitContest;
