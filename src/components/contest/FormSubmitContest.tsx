import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogContentNoClose,
  DialogTrigger,
} from "@/components/common/Dialog";
import { DataContestSubmission } from "@/types/contestSubmit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/contest/InputField";
import {
  createContestSubmission,
  uploadAssets,
  uploadSource,
  uploadThumbnail,
} from "@/requests/contestSubmit";
import { InputFileUploadContest } from "@/components/contest/InputFileUploadContest";
import { InputImgUploadContest } from "@/components/contest/InputImgUploadContest";
import { DialogTitle } from "@radix-ui/react-dialog";
import { InputMulImgUploadContest } from "./InputMulImgUploadContest";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { getOneContestEntry } from "@/requests/contestEntry";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";

// Define the validation schema
const submissionSchema = z.object({
  title: z.string().min(1, "Tên dự án không được để trống"),
  tags: z
    .string()
    .regex(
      /^\s*[a-zA-Z0-9]+\s*(,\s*[a-zA-Z0-9]+\s*)*$/,
      "Tags phải được phân tách bởi dấu phẩy và không có khoảng trắng thừa"
    ),
  url: z.string(),
  description: z.string(),
});

const FormSubmitContest = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [imgProject, setImgProject] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  const { success, error, warn } = useSnackbarStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      tags: "",
      url: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      warn("Warning", "Vui lòng chờ trong giây lát...\n không load lại trình duyệt");
      closeDialog();
      useLoadingStore.getState().show();

      const tags = data.tags.split(",").map((tag: string) => tag.trim());

      const contestEntry = await getOneContestEntry(useUserStore.getState().candidateNumber || "");

      const contestObj: DataContestSubmission = {
        title: data.title,
        description: data.description,
        tags: { data: tags },
        contest_entry: contestEntry.id
      };

      const result = await createContestSubmission(contestObj);

      const uploadPromises = [];

      if (projectFile) {
        uploadPromises.push(uploadSource(result.id, projectFile));
      }

      if (thumbnail) {
        uploadPromises.push(uploadThumbnail(result.id, thumbnail));
      }

      uploadPromises.push(...imgProject.map(img => uploadAssets(result.id, img)));

      await Promise.all(uploadPromises);

      success("Success", "Nộp bài thi thành công!");
      router.push("all-contest-entries/" + result.id);
    } catch (err) {
      error("Error", "Có lỗi xảy ra khi nộp bài thi");
    } finally {
      useLoadingStore.getState().hide();
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFileChange = (file: File | null) => {
    setProjectFile(file);
  };

  const handleImgChange = (newImages: File[]) => {
    setImgProject(newImages);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div ref={ref} onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </DialogTrigger>
      <DialogTitle className="hidden">Nộp bài thi</DialogTitle>
      <DialogContent aria-describedby="dialog-description"></DialogContent>
      <DialogContentNoClose 
        className="max-w-[688px] sm:rounded-[32px] max-mobile:overflow-y-auto max-mobile:max-h-screen pt-2 pb-0"
        aria-describedby="dialog-description"
      >
        <div id="dialog-description" className="sr-only">
          Form để nộp bài thi cuộc thi. Bao gồm các trường thông tin như tên dự án, ảnh thumbnail, ảnh mô tả, file dự án, URL, tags, và mô tả.
        </div>
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
            name="title"
            isRequired
            control={control}
            error={errors.title?.message}
            customClassNames="mb-2 sm:mb-5"
            placeholder="VD: Chatbot Miracle"
          />
          <div className="w-full border-t border-gray-200 py-2 sm:py-5">
            <InputImgUploadContest
              title="Ảnh dự án"
              value={thumbnail}
              onChange={setThumbnail}
              customClassNames="mt-b sm:mb-5"
            />
            <InputMulImgUploadContest
              title="Ảnh mô tả dự án"
              imgArr={imgProject}
              onChange={handleImgChange}
            />
            <InputFileUploadContest
              title="File dự án"
              onChange={handleFileChange}
              value={projectFile}
            />
            <InputField
              title="URL"
              type="text"
              name="url"

              control={control}
              error={errors.url?.message}
              customClassNames="mt-2 sm:mt-5"
              placeholder="VD: Chatbot Miracle"
            />
          </div>
          <div className="flex flex-col gap-[18px] border-t border-gray-200 pt-5">
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
        <footer className="flex flex-wrap items-center sm:justify-between p-2 py-4 gap-1 sm:px-6 border-t border-gray-200 justify-center">
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
});

FormSubmitContest.displayName = "SubmitContestDialog";

export default FormSubmitContest;
