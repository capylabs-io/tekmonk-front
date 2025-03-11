import { useProfileStore } from "@/store/ProfileStore";
import { X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Input } from "../common/Input";
import { TextArea } from "../common/TextArea";
import { Button } from "../common/button/Button";
import { InputFileUpdload } from "../common/InputFileUpload";
import { InputTags } from "@/components/contest/InputTags";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { uploadPost } from "@/requests/post";
import { useUserStore } from "@/store/UserStore";
import { PostVerificationType } from "@/types";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useLoadingStore } from "@/store/LoadingStore";

export const CreateProfileModal = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [isShowing, hide] = useProfileStore((state) => [
    state.isShowing,
    state.hide,
  ]);
  const [userInfo] = useUserStore((state) => [state.userInfo])
  const [showLoading, hideLoading] = useLoadingStore((state) => [state.show, state.hide]);
  const [showSuccess, showError] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const method = useForm({
    // resolver: zodResolver(),
    mode: "onChange",
    defaultValues: {
      name: "",
      url: "",
      image: null,
      tags: "",
      content: ""
    },
  });
  const modules = {
    toolbar: [
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ header: [1, 2, 3, false] }],
      ["link", "image"],
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
    "image",
  ];
  const { control, getValues, setValue, reset } = method;
  const appendFormData = (formData: FormData, data: any, parentKey = "") => {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "" || value instanceof File) return; // Skip empty values
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      if (typeof value === "object" && !(value instanceof File || value instanceof Blob)) {
        appendFormData(formData, value, newKey); // Recursively append nested objects
      } else {
        formData.append(newKey, String(value));
      }
    });
  };
  const handleCreatePost = async () => {
    try {
      showLoading()
      const formData = new FormData();
      const data = getValues()
      appendFormData(formData, data);
      formData.append('isVerified', PostVerificationType.PENDING)
      if (data.image) {
        formData.append('image', data.image)
      }
      const res = await uploadPost(formData)
      if (res) {
        showSuccess("Thành công", "Tạo bài viết thành công");
        reset();
        hide()
      }
    } catch (error) {
      console.log('error', error)
      showError("Thất bại", "Tạo bài viết Thất bại");
    } finally {
      hideLoading()
    }
  }
  const handleImageUpload = (file: File | null) => {
    if (file) setValue("image", file as any);
  };
  return isShowing ? (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
      <div className="relative mx-auto w-[688px] flex flex-col h-[80%] rounded-3xl bg-white overflow-y-auto">
        <button
          type="button"
          onClick={hide}
          className="absolute right-4 top-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X size={16} className="" />
        </button>

        <div className="w-full text-start p-6">
          <div className="text-HeadingSm font-bold text-gray-95">Đăng bài</div>
          <div className="text-BodyMd text-gray-60">
            Khoe ngay dự án mới của mình cho các đồng môn nhé!{" "}
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-6 space-y-5 grow">
          <div className="flex justify-between text-sm">
            <span className="text-gray-60 text-SubheadMd">Tiêu đề dự án</span>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) =>
              (<>
                <Input
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="Nhập thông tin"
                  customClassNames="max-w-[424px]"
                  customInputClassNames="text-sm"
                />
              </>)
              }
            />

          </div>
          <div className="flex justify-between">
            <span className="text-gray-60">
              <div className="flex flex-col gap-y-1">
                <div className="text-SubheadMd">Đường dẫn website</div>
                <div className="text-BodyMd">(không bắt buộc)</div>
              </div>
            </span>
            <Controller
              control={control}
              name="url"
              render={({ field: { value, onChange } }) =>
              (<>
                <Input
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="Nhập thông tin"
                  customClassNames="max-w-[424px]"
                  customInputClassNames="text-sm"
                />
              </>)
              }
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-60 text-SubheadMd">Tags</span>
            <Controller
              control={control}
              name="tags"
              render={({ field: { value, onChange }, fieldState }) => (
                <div className="w-[424px]">
                  <InputTags
                    hideTitle
                    value={value}
                    error={fieldState?.error?.message}
                    onValueChange={(tagsString) => {
                      onChange(tagsString);
                    }}
                    customInputClassNames="text-sm"
                    tooltipContent="Vui lòng nhập tag và ấn Enter"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-60">Hình ảnh</span>
            <InputFileUpdload
              value={getValues("image")}
              onChange={handleImageUpload}
              customClassNames="max-w-[424px]"
              customInputClassNames="text-sm"
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-60">Nội dung bài viết</span>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange }, fieldState }) => (
                <ReactQuill
                  theme="snow"
                  className="w-[424px] rounded-xl border border-grey-300 bg-grey-50 outline-none !text-[20px] h-[400px] transition-all ease-linear overflow-y-auto"
                  value={value}
                  onChange={onChange}
                  placeholder="Viết vài dòng giới thiệu tổng quan dự án"
                  modules={modules}
                  formats={formats}
                />
              )}
            />
          </div>
        </div>

        <hr className="border-t border-gray-200" />
        <div className="flex justify-between w-ful p-6">
          <Button className=" !bg-gray-00 border border-gray-20 !text-primary-95 w-[100px]"
            style={{
              boxShadow:
                "0px 4px 0px #ebe4ec"
            }}
            onClick={hide}>
            <div className="!text-sm !font-normal"> Thoát</div>
          </Button>
          <Button className="w-[150px] !font-medium border border-primary-70" style={{
            boxShadow:
              "0px 4px 0px #9a1595"
          }} onClick={handleCreatePost}>
            <div className="!text-sm !font-normal"> Đăng dự án</div>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
