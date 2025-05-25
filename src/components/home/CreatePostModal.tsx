"use client";

import { useProfileStore } from "@/store/ProfileStore";
import { Info, X } from "lucide-react";
import { useMemo } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/button/Button";
import { InputTags } from "@/components/contest/InputTags";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { uploadPost } from "@/requests/post";
import { PostTypeEnum, PostVerificationType } from "@/types";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";
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

export const CreatePostModal = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [isShowing, hide, type] = useProfileStore((state) => [
    state.isShowing,
    state.hide,
    state.type,
  ]);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [showSuccess, showError] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const method = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: "normal",
      image: [],
      tags: "",
      content: "",
      projectFile: undefined,
      projectLink: "",
    },
  });

  // Watch the type field to conditionally render project fields
  const postType = method.watch("type");

  const modules = {
    toolbar: [
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, false] }],
      ["link"],
    ],
  };

  const formats = [
    "list",
    "bullet",
    "ordered",
    "bold",
    "italic",
    "underline",
    "header",
    "link",
  ];
  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = method;
  const appendFormData = (formData: FormData, data: any, parentKey = "") => {
    Object.entries(data).forEach(([key, value]) => {
      // Skip null, undefined, empty strings, but not Files
      if (value === null || value === undefined || value === "") {
        return;
      }

      // Skip File objects here as they need special handling
      if (value instanceof File) {
        return;
      }

      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      if (
        typeof value === "object" &&
        !(value instanceof File || value instanceof Blob)
      ) {
        appendFormData(formData, value, newKey); // Recursively append nested objects
      } else {
        formData.append(newKey, String(value));
      }
    });
  };
  const handleCreatePost = async () => {
    try {
      showLoading();
      const formData = new FormData();
      const data = getValues();
      appendFormData(formData, data);
      formData.append("isVerified", PostVerificationType.PENDING);
      if (data.image) {
        data.image.forEach((file) => {
          formData.append("images", file);
        });
      }
      // Handle project file for project type posts
      if (data.type === "project" && data.projectFile) {
        formData.append("projectFile", data.projectFile);
      }
      const res = await uploadPost(formData);
      if (res) {
        showSuccess(
          "Thành công",
          "Đăng tải bài viết thành công, vui lòng chờ duyệt"
        );
        reset({
          name: "",
          type: "normal",
          image: [],
          tags: "",
          content: "",
          projectFile: undefined,
          projectLink: "",
        });
        hide();
      }
    } catch (error) {
      console.log("error", error);
      const errorMessage = HandleReturnMessgaeErrorAxios(error);
      console.log("errorMessage", errorMessage);
      showError("Thất bại", errorMessage);
    } finally {
      hideLoading();
    }
  };

  return (
    isShowing && (
      <TooltipProvider>
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-between bg-black/60">
          <div className="relative mx-auto xl:w-[80vw] w-[688px] flex flex-col max-h-[80%] rounded-3xl bg-white overflow-hidden">
            <button
              type="button"
              onClick={hide}
              className="absolute right-4 top-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <X size={16} className="" />
            </button>

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
                <div className="p-6 space-y-5 grow xl:overflow-y-auto xl:custom-scrollbar">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-60 text-SubheadMd">Tiêu đề</span>
                    <div className="flex flex-col w-[424px]">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onChange } }) => (
                          <Input
                            value={value}
                            onChange={(e) => onChange(e)}
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
                  <div className="flex justify-between">
                    <span className="text-gray-60">
                      <div className="flex flex-col gap-y-1">
                        <div className="text-SubheadMd">Loại bài viết</div>
                      </div>
                    </span>
                    <div className="flex flex-col w-[424px] text-sm">
                      <Controller
                        control={control}
                        name="type"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            value={value || "normal"}
                            onValueChange={onChange}
                            defaultValue="normal"
                          >
                            <SelectTrigger className="w-full h-12 px-3 py-2 rounded-lg border border-gray-300 text-BodyMd">
                              <SelectValue
                                placeholder="Chọn loại bài viết"
                                className="text-BodyMd"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                value="normal"
                                className="text-BodyMd cursor-pointer"
                              >
                                Bài viết thường
                              </SelectItem>
                              <SelectItem
                                value="project"
                                className="text-BodyMd cursor-pointer"
                              >
                                Dự án
                              </SelectItem>
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
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-gray-60 text-SubheadMd flex items-center">
                      Tags{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            size={16}
                            className={`ml-1`}
                            color={`${"#9A1595"}`}
                          />
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
                            onValueChange={(tagsString) => {
                              onChange(tagsString);
                            }}
                            customInputClassNames="text-sm"
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* Project-specific fields - only show when type is "project" */}
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
                            render={({ field: { value, onChange } }) => (
                              <Input
                                value={value || ""}
                                onChange={(e) => onChange(e)}
                                type="url"
                                placeholder="https://github.com/username/project"
                                customClassNames="max-w-[424px]"
                                customInputClassNames="text-sm"
                              />
                            )}
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

                  <div className="flex flex-col gap-y-2 justify-between text-sm">
                    <span className="text-gray-60">Hình ảnh</span>
                    {/* Chnage with multiple files upload here */}
                    <FileUpload
                      maxFiles={10}
                      maxSizeInMB={5}
                      acceptedFileTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                      ]}
                      onFilesChange={(files: File[]) => {
                        setValue("image", files);
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 text-sm p-6">
                  <span className="text-gray-60 lg:hidden">Nội dung</span>
                  <div className="flex flex-col w-full h-full">
                    <Controller
                      control={control}
                      name="content"
                      render={({ field: { value, onChange }, fieldState }) => (
                        <ReactQuill
                          theme="snow"
                          className="w-full rounded-xl border border-grey-300 bg-grey-50 outline-none !text-[20px] xl:h-full h-[400px] transition-all ease-linear overflow-y-auto"
                          value={value}
                          onChange={onChange}
                          placeholder="Viết vài dòng giới thiệu tổng quan dự án"
                          modules={modules}
                          formats={formats}
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
            <div className="flex justify-between w-ful p-6">
              <Button
                className=" !bg-gray-00 border border-gray-20 !text-primary-95 w-[100px]"
                style={{
                  boxShadow: "0px 4px 0px #ebe4ec",
                }}
                onClick={hide}
              >
                <div className="!text-sm !font-normal"> Thoát</div>
              </Button>
              <Button
                className="w-[150px] !font-medium border border-primary-70"
                style={{
                  boxShadow: "0px 4px 0px #9a1595",
                }}
                onClick={method.handleSubmit(handleCreatePost)}
              >
                <div className="!text-sm !font-normal">Đăng bài viết</div>
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    )
  );
};
