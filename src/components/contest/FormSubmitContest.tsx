import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContentNoClose,
  DialogTrigger,
} from "@/components/common/Dialog";
import { InputFileUploadContest } from "@/components/contest/InputFileUploadContest";
import { InputImgUploadContest } from "@/components/contest/InputImgUploadContest";
import { DataContestSubmission } from "@/types/contestSubmit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/contest/InputField";
import { createContestSubmission, uploadSource, uploadThumbnail } from "@/requests/contestSubmit";
import { toast } from "react-toastify";

// Define the validation schema
const submissionSchema = z.object({
  title: z.string().nonempty("Tên dự án không được để trống"),
  tags: z.string()
    .nonempty("Tags không được để trống")
    .regex(/^\s*[a-zA-Z0-9]+\s*(,\s*[a-zA-Z0-9]+\s*)*$/, "Tags phải được phân tách bởi dấu phẩy và không có khoảng trắng thừa"),
  description: z.string().nonempty("Mô tả không được để trống"),
});

const FormSubmitContest = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [projectFile, setProjectFile] = useState<File | null>(null);
    const [imgProject, setImgProject] = useState<File[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(submissionSchema),
      defaultValues: {
        title: "",
        tags: "",
        description: "",
      },
    });

    const onSubmit = async (data: any) => {
      try {
        // Convert tags to array
        const tags = data?.tags.split(", ");
        const contestObj: DataContestSubmission = {
          title: data?.title,
          description: data?.description,
          tags: {
            data: tags,
          },
        };

        // create a new contest submission
        const result = await createContestSubmission(contestObj);

        console.log(result);

        // add media source
        if (projectFile) {
          await uploadSource(result.id, projectFile);
        }

        // Upload thumbnail images
        for (const img of imgProject) {
          await uploadThumbnail(result.id, img);
        }

        toast.success("Nộp bài thành công");
        // setIsOpen(false);
      } catch (error) {
        console.error("Error submitting contest:", error);
        toast.error("Vui lòng thử lại");
      }
    };

    const closeDialog = () => {
      setIsOpen(false);
    };

    const handleFileChange = (file: File | null) => {
      setProjectFile(file);
      console.log(file);
    };

    const handleImgChange = (newImages: File[]) => {
      setImgProject(prevImages => [...prevImages, ...newImages]);
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div ref={ref} onClick={() => setIsOpen(true)}>
            {children}
          </div>
        </DialogTrigger>
        <DialogContentNoClose className="max-w-[688px] sm:rounded-[32px] max-mobile:overflow-y-auto max-mobile:max-h-screen">
          <div className="px-2 sm:px-14 border-b text-center border-gray-200">
            <h4 className="text-SubheadXl text-primary-900 mb-1 md:text-xl sm:text-lg text-base">
              Nộp bài thi
            </h4>
            <p className="text-bodyXl sm:text-bodyLg w-full mt-1 mb-2 sm:mb-5 md:text-base sm:text-sm text-xs">
              Lưu ý: Mỗi thí sinh chỉ được nộp bài thi một lần. Bài dự thi không thể xoá hoặc chỉnh sửa sau khi đã nộp. Vui lòng kiểm tra kĩ trước khi đăng tải.
            </p>
          </div>
          <section className="px-6">
            <InputField
              title="Tên dự án"
              type="text"
              name="title"
              control={control}
              error={errors.title?.message}
              customClassNames="mb-2 sm:mb-5"
              placeholder="VD: Chatbot Miracle"
            />
            <div className="w-full border-t border-gray-200 py-2 sm:py-5">
              <InputImgUploadContest title="Ảnh dự án" imgArr={imgProject.map(img => img.name)} onChange={handleImgChange} />
              <InputFileUploadContest title="File dự án" onChange={handleFileChange} value={projectFile} />
            </div>
            <div className="flex flex-col gap-[18px] border-t border-gray-200 py-5">
              <InputField
                title="Tags"
                type="text"
                name="tags"
                control={control}
                error={errors.tags?.message}
                placeholder="VD: B2C, AI, design...."
              />
              <InputField
                title="Mô tả"
                name="description"
                control={control}
                error={errors.description?.message}
                type="text-area"
                placeholder="Viết vài dòng giới thiệu tổng quan dự án"
              />
            </div>
          </section>
          <footer className="flex flex-wrap items-center sm:justify-between p-2 gap-1 sm:px-6 sm:pt-6 border-t border-gray-200 justify-center">
            <Button
              className="rounded-[4rem] border border-gray-300 sm:w-[280px]"
              outlined={true}
              style={{ borderRadius: "4rem" }}
              onClick={closeDialog}
            >
              Huỷ
            </Button>
            <Button
              className="w-[280px]"
              outlined={false}
              style={{ borderRadius: "4rem" }}
              onClick={handleSubmit(onSubmit)}
            >
              Nộp bài
            </Button>
          </footer>
        </DialogContentNoClose>
      </Dialog>
    );
  }
);

FormSubmitContest.displayName = "SubmitContestDialog";

export default FormSubmitContest;