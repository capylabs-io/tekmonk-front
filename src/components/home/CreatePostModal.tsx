"use client";

import { useProfileStore } from "@/store/ProfileStore";
import { Info, X, Youtube, Link2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/button/Button";
import { InputTags } from "@/components/contest/InputTags";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { uploadPost, uploadFile } from "@/requests/post";
import { PostVerificationType } from "@/types";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { profileFormSchema, ProfileFormValues } from "@/validation/post";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FileUpload } from "../file-upload/file-upload";
import { ZipFileUpload } from "../file-upload/zip-file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HandleReturnMessgaeErrorAxios } from "@/requests/return-message-error";
import { UploadProgressModal, UploadProgressItem } from "./UploadProgressModal";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QUILL_MODULES = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ header: [1, 2, 3, false] }],
    ["link"],
  ],
};

const QUILL_FORMATS = [
  "list",
  "bullet",
  "ordered",
  "bold",
  "italic",
  "underline",
  "header",
  "link",
];

const DEFAULT_FORM_VALUES = {
  name: "",
  type: "normal" as const,
  image: [],
  tags: "",
  content: "",
  projectFile: undefined,
  projectLink: "",
};

export const CreatePostModal = () => {
  const [isShowing, hide] = useProfileStore((state) => [
    state.isShowing,
    state.hide,
  ]);
  const [showSuccess, showError] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);

  // Upload progress state
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadProgressItems, setUploadProgressItems] = useState<
    UploadProgressItem[]
  >([]);

  const method = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = method;
  const postType = method.watch("type");

  // Helper functions
  const updateProgressItem = (
    itemId: string,
    updates: Partial<UploadProgressItem>
  ) => {
    setUploadProgressItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
  };

  const createProgressItems = (files: File[]) => {
    const fileItems = files.map((file, index) => ({
      id: `file-${index}`,
      name: file.name,
      status: "pending" as const,
      progress: 0,
    }));

    const postItem = {
      id: "create-post",
      name: "Tạo bài viết",
      status: "pending" as const,
      progress: 0,
    };

    return [...fileItems, postItem];
  };

  const uploadSingleFile = async (
    file: File,
    itemId: string
  ): Promise<string> => {
    updateProgressItem(itemId, { status: "uploading", progress: 0 });

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgressItems((prev) =>
        prev.map((item) =>
          item.id === itemId && item.status === "uploading"
            ? {
                ...item,
                progress: Math.min(item.progress + Math.random() * 15 + 5, 90),
              }
            : item
        )
      );
    }, 200);

    try {
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadFile(formData);

      clearInterval(progressInterval);
      updateProgressItem(itemId, { status: "completed", progress: 100 });

      return response;
    } catch (error) {
      clearInterval(progressInterval);
      updateProgressItem(itemId, {
        status: "error",
        error: `Không thể tải lên tệp ${file.name}`,
      });
      throw error;
    }
  };

  const uploadFiles = async (files: File[]) => {
    const results: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadSingleFile(files[i], `file-${i}`);
        results.push(url);
      } catch (error) {
        console.error(`Failed to upload ${files[i].name}:`, error);
      }
    }

    return results;
  };

  const createPost = async (
    data: ProfileFormValues,
    imageUrls: string[],
    projectFileUrl?: string
  ) => {
    updateProgressItem("create-post", { status: "uploading", progress: 50 });

    try {
      const postData = {
        name: data.name,
        type: data.type,
        tags: data.tags,
        content: data.content,
        projectLink: data.projectLink || "",
        isVerified: PostVerificationType.PENDING,
        images: imageUrls.map((url) => ({ url })),
        projectFile: projectFileUrl,
      };

      const result = await uploadPost(postData);
      updateProgressItem("create-post", { status: "completed", progress: 100 });

      return result;
    } catch (error) {
      updateProgressItem("create-post", {
        status: "error",
        error: "Không thể tạo bài viết",
      });
      throw error;
    }
  };

  const handleCreatePost = async () => {
    try {
      const data = getValues();

      // Prepare files
      const imagesToUpload = data.image || [];
      const projectFile =
        data.type === "project" ? data.projectFile : undefined;
      const allFiles = projectFile
        ? [...imagesToUpload, projectFile]
        : imagesToUpload;

      // Setup progress tracking
      const progressItems = createProgressItems(allFiles);
      setUploadProgressItems(progressItems);
      setShowUploadProgress(true);

      // Upload files
      let imageUrls: string[] = [];
      let projectFileUrl: string | undefined;

      if (imagesToUpload.length > 0) {
        imageUrls = await uploadFiles(imagesToUpload);
      }

      if (projectFile) {
        try {
          projectFileUrl = await uploadSingleFile(
            projectFile,
            `file-${imagesToUpload.length}`
          );
        } catch (error) {
          console.error("Failed to upload project file:", error);
        }
      }

      // Brief pause to show upload completion
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create post
      const result = await createPost(data, imageUrls, projectFileUrl);

      if (result) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowUploadProgress(false);
        showSuccess(
          "Thành công",
          "Đăng tải bài viết thành công, vui lòng chờ duyệt"
        );
        reset(DEFAULT_FORM_VALUES);
        hide();
      }
    } catch (error) {
      console.error("Post creation error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : HandleReturnMessgaeErrorAxios(error);
      showError("Thất bại", errorMessage);
      setShowUploadProgress(false);
    }
  };

  const closeUploadProgress = () => {
    setShowUploadProgress(false);
    setUploadProgressItems([]);
  };

  const isUploading = showUploadProgress;

  if (!isShowing) return null;

  return (
    <TooltipProvider>
      <UploadProgressModal
        isOpen={showUploadProgress}
        onClose={closeUploadProgress}
        items={uploadProgressItems}
        title="Đang tải lên tệp"
      />

      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-between bg-black/60">
        <div className="relative mx-auto xl:w-[80vw] w-[688px] flex flex-col max-h-[80%] rounded-3xl bg-white overflow-hidden">
          <button
            type="button"
            onClick={isUploading ? undefined : hide}
            disabled={isUploading}
            className={`absolute right-4 top-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="w-full text-start p-6">
            <div className="text-HeadingSm font-bold text-gray-95">
              Đăng bài viết
            </div>
            <div className="text-BodyMd text-gray-60">
              Đăng bài viết của bạn để chia sẻ với cộng đồng!
            </div>
          </div>

          <hr className="border-t border-gray-200" />

          <FormProvider {...method}>
            <div className="overflow-y-auto !grid xl:!grid-cols-2 !grid-cols-1 max-xl:custom-scrollbar">
              {/* Left Column - Form Fields */}
              <div className="p-6 space-y-5 grow xl:overflow-y-auto xl:custom-scrollbar">
                {/* Title */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-60 text-SubheadMd">Tiêu đề</span>
                  <div className="flex flex-col w-[424px]">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          type="text"
                          placeholder="Nhập thông tin"
                          customClassNames="max-w-[424px]"
                          customInputClassNames="text-sm"
                        />
                      )}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Post Type */}
                <div className="flex justify-between">
                  <span className="text-gray-60 text-SubheadMd">
                    Loại bài viết
                  </span>
                  <div className="flex flex-col w-[424px] text-sm">
                    <Controller
                      control={control}
                      name="type"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value || "normal"}
                          onValueChange={onChange}
                        >
                          <SelectTrigger className="w-full h-12 px-3 py-2 rounded-lg border border-gray-300 text-BodyMd">
                            <SelectValue placeholder="Chọn loại bài viết" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">
                              Bài viết thường
                            </SelectItem>
                            <SelectItem value="project">Dự án</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.type.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex justify-between items-start text-sm">
                  <span className="text-gray-60 text-SubheadMd flex items-center">
                    Tags{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="ml-1" color="#9A1595" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        align="start"
                        className="max-w-[200px]"
                      >
                        <p>Vui lòng nhập tag và ấn Enter</p>
                      </TooltipContent>
                    </Tooltip>
                  </span>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field: { value, onChange }, fieldState }) => (
                      <div className="w-[424px]">
                        <InputTags
                          value={value}
                          error={fieldState?.error?.message}
                          onValueChange={onChange}
                          customInputClassNames="text-sm"
                        />
                      </div>
                    )}
                  />
                </div>

                {/* Project Fields */}
                {postType === "project" && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-60 text-SubheadMd">
                        Link dự án
                      </span>
                      <div className="flex flex-col w-[424px]">
                        <Controller
                          control={control}
                          name="projectLink"
                          render={({ field: { value, onChange } }) => {
                            const isYoutubeLink =
                              value &&
                              (value.includes("youtube.com") ||
                                value.includes("youtu.be"));

                            // Extract YouTube video ID
                            const getYoutubeVideoId = (url: string) => {
                              if (!url) return null;
                              const regExp =
                                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                              const match = url.match(regExp);
                              return match && match[2].length === 11
                                ? match[2]
                                : null;
                            };

                            const youtubeVideoId =
                              isYoutubeLink && value
                                ? getYoutubeVideoId(value)
                                : null;

                            return (
                              <>
                                <div className="relative">
                                  <Input
                                    value={value || ""}
                                    onChange={onChange}
                                    type="url"
                                    placeholder="https://github.com/username/project"
                                    customClassNames="max-w-[424px]"
                                    customInputClassNames="text-sm pl-9"
                                  />
                                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {isYoutubeLink ? (
                                      <Youtube
                                        size={16}
                                        className="text-red-500"
                                      />
                                    ) : (
                                      <Link2
                                        size={16}
                                        className="text-emerald-500"
                                      />
                                    )}
                                  </div>
                                  {isYoutubeLink && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                      YouTube
                                    </div>
                                  )}
                                </div>

                                {isYoutubeLink && youtubeVideoId && (
                                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                    <div className="relative w-full h-32">
                                      <Image
                                        src={`https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`}
                                        alt="YouTube thumbnail"
                                        fill
                                        className="object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                                          <Youtube className="w-5 h-5 text-white" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="p-2 bg-white">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Youtube
                                            size={14}
                                            className="text-red-500"
                                          />
                                          <span className="text-xs font-medium truncate">
                                            Video YouTube
                                          </span>
                                        </div>
                                        <div className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                                          Preview
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          }}
                        />
                        {errors.projectLink && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.projectLink.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2 justify-between text-sm">
                      <span className="text-gray-60">Tệp dự án (ZIP)</span>
                      <Controller
                        control={control}
                        name="projectFile"
                        render={({
                          field: { value, onChange },
                          fieldState,
                        }) => (
                          <ZipFileUpload
                            value={value || null}
                            onChange={onChange}
                            error={fieldState?.error?.message}
                          />
                        )}
                      />
                    </div>
                  </>
                )}

                {/* Images */}
                <div className="flex flex-col gap-y-2 justify-between text-sm">
                  <span className="text-gray-60">Hình ảnh</span>
                  <FileUpload
                    maxFiles={10}
                    maxSizeInMB={5}
                    acceptedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ]}
                    onFilesChange={(files: File[]) => setValue("image", files)}
                  />
                </div>
              </div>

              {/* Right Column - Content Editor */}
              <div className="flex flex-col gap-y-2 text-sm p-6">
                <span className="text-gray-60 lg:hidden">Nội dung</span>
                <div className="flex flex-col w-full h-full">
                  <Controller
                    control={control}
                    name="content"
                    render={({ field: { value, onChange } }) => (
                      <ReactQuill
                        theme="snow"
                        className="w-full rounded-xl border border-grey-300 bg-grey-50 outline-none !text-[20px] xl:h-full h-[400px] transition-all ease-linear overflow-y-auto"
                        value={value}
                        onChange={onChange}
                        placeholder="Viết vài dòng giới thiệu tổng quan dự án"
                        modules={QUILL_MODULES}
                        formats={QUILL_FORMATS}
                      />
                    )}
                  />
                  {errors.content && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.content.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FormProvider>

          <hr className="border-t border-gray-200" />

          {/* Footer */}
          <div className="flex justify-between w-full p-6">
            <Button
              className="!bg-gray-00 border border-gray-20 !text-primary-95 w-[100px]"
              style={{ boxShadow: "0px 4px 0px #ebe4ec" }}
              onClick={isUploading ? undefined : hide}
              disabled={isUploading}
            >
              <div className="!text-sm !font-normal">Thoát</div>
            </Button>

            <Button
              className="w-[150px] !font-medium border border-primary-70"
              style={{ boxShadow: "0px 4px 0px #9a1595" }}
              onClick={
                isUploading ? undefined : method.handleSubmit(handleCreatePost)
              }
              disabled={isUploading}
            >
              <div className="!text-sm !font-normal">
                {isUploading ? "Đang tải lên..." : "Đăng bài viết"}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
