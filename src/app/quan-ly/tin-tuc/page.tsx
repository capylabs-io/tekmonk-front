"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

import Loading from "@/app/loading";
import StudentTablePagination from "@/components/admin/student-table-pagination";
import { InputField } from "@/components/contest/InputField";
import { InputImgUploadContest } from "@/components/contest/InputImgUploadContest";
import { InputTags } from "@/components/contest/InputTags";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ReqCreateNews,
  ReqGetAllNews,
  ReqUpdateImage,
  ReqUpdateNews,
} from "@/requests/news";
import { useLoadingStore } from "@/store/LoadingStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import qs from "qs";
import { useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { TimeConvert } from "@/components/common/TimeConvert";
import { SplitRenderItem } from "@/components/common/SplitRenderItem";
import dynamic from "next/dynamic";

const newsSchema = z.object({
  title: z
    .string({ required_error: "Tên bài viết không được để trống" })
    .min(1, "Tên bài viết phải có ít nhất 1 ký tự"),
  tags: z.string().optional(),
  image: z.any(),
  content: z.string().min(1, "Mô tả không được để trống"),
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

export default function Page() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [toggleNewsDialog, setToggleNewsDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIdUpdate, setCurrentIdUpdate] = useState<number | null>(null);

  const methods = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      tags: "",
      image: null,
      content: "",
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
    getValues,
    setValue,
    reset,
  } = methods;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("public");

  const tabs = [
    { id: "public", label: "Tin tức" },
    { id: "draft", label: "Bản nháp" },
    { id: "trash", label: "Thùng rác" },
  ];

  const [show, hide] = useLoadingStore((state) => [state.show, state.hide]);
  const [success, error] = useSnackbarStore((state) => [
    state.success,
    state.error,
  ]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["news", page, limit, activeTab],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: page,
            pageSize: limit,
          },
          filters: {
            type: "news",
            status: activeTab,
          },
          sort: ["id:asc"],
          populate: "*",
        });
        return await ReqGetAllNews(queryString);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });

  const handleImageUpload = (file: File | null) => {
    if (file) setValue("image", file as any);
  };

  const handleNewsSubmit = async (status: string) => {
    const formData = new FormData();
    formData.append("title", getValues("title"));
    formData.append("tags", getValues("tags"));
    formData.append("content", getValues("content"));
    const image = getValues("image");
    if (image) {
      formData.append("image", image as any);
    }
    formData.append("type", "news");
    formData.append("status", status);

    //get all data from react form here
    const formValues = {
      title: getValues("title"),
      tags: getValues("tags"),
      content: getValues("content"),
      image: getValues("image"),
    };
    try {
      show();
      if (isEditing && currentIdUpdate) {
        await ReqUpdateNews(currentIdUpdate.toString(), formValues);
        if (image) {
          await ReqUpdateImage(currentIdUpdate.toString(), formData);
        }
        success("Thành công", "Cập nhật bài viết thành công");
      } else {
        await ReqCreateNews(formData);
        success("Thành công", "Tạo bài viết thành công");
      }
      queryClient.invalidateQueries({ queryKey: ["news"] });
    } catch (err) {
      console.error("Error submitting news:", err);
      error(
        "Không thành công",
        isEditing ? "Cập nhật bài viết thất bại" : "Tạo bài viết thất bại"
      );
    } finally {
      hide();
      setToggleNewsDialog(false);
      setIsEditing(false);
      reset();
    }
  };

  const handleEditNews = (item: any) => {
    setIsEditing(true);
    reset({
      title: item.title,
      tags: item.tags,
      content: item.content,
    });
    setToggleNewsDialog(true);
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div>
        Có lỗi xảy ra, vui lòng thử lại sau hoặc liên hệ admin để biết thêm chi
        tiết
      </div>
    );

  return (
    <div className="w-full h-full border-r border-gray-20 overflow-y-auto">
      <div className="w-full h-auto min-h-[68px] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 border-b border-gray-20">
        <div className="text-SubheadLg text-gray-95 mb-2 sm:mb-0">Học viên</div>
        <CommonButton
          className="h-9 w-full sm:w-[120px] text-gray-00"
          variant="primary"
          onClick={() => {
            reset();
            setToggleNewsDialog(true);
          }}
        >
          <div className="text-SubheadSm">Tạo bài viết</div>
        </CommonButton>
      </div>
      <div className="w-full flex flex-col border-y border-gray-20 py-2">
        <div className="h-9 w-[265px] border-t border-x border-gray-20 rounded-t-lg flex items-center justify-center text-gray-95 gap-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full h-full flex items-center justify-center rounded-t-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer",
                activeTab === tab.id
                  ? "bg-[#C840B8] text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className=" flex-1 border-t border-gray-20">
          <div className="w-full overflow-auto">
            <div className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">STT</TableHead>
                    <TableHead className="w-[120px]">Ảnh bìa</TableHead>
                    <TableHead>Tên bài viết</TableHead>
                    <TableHead className="w-[200px]">Chủ đề</TableHead>
                    <TableHead className="w-[180px]">Ngày đăng</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">{item.id}</TableCell>
                        <TableCell>
                          <Image
                            src={
                              item.thumbnail
                                ? item.thumbnail
                                : "/placeholder.svg"
                            }
                            alt={item.title}
                            width={100}
                            height={60}
                            className="rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {item.tags && (
                              <SplitRenderItem
                                items={item.tags.split(",")}
                                className="rounded-[4px] bg-gray-20 text-gray-95 text-BodyXs flex items-center h-6 px-2"
                                remainingItemsClassName="rounded-[4px] bg-gray-20 text-gray-95 text-BodyXs flex items-center h-6 px-2"
                                tooltipContentClassName="rounded-[4px] bg-gray-20 text-gray-95 text-BodyXs flex items-center h-6 px-2"
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <TimeConvert
                            time={item.createdAt ? item.createdAt : ""}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditNews(item)}
                            >
                              <Edit
                                className="h-4 w-4"
                                onClick={() => {
                                  setCurrentIdUpdate(item.id);
                                  setIsEditing(true);
                                }}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <StudentTablePagination
            showDetails={true}
            totalItems={10}
            currentPage={page}
            itemsPerPage={limit}
            onPageChange={(page) => setPage(page)}
            onItemsPerPageChange={(itemsPerPage) => setLimit(itemsPerPage)}
            className=""
            showEllipsisThreshold={7}
          />
        </div>
        <FormProvider {...methods}>
          <Dialog
            open={toggleNewsDialog}
            onOpenChange={() => {
              setToggleNewsDialog(false);
              setIsEditing(false);
              reset();
            }}
          >
            <DialogContent className="sm:max-w-[800px] max-h-full bg-gray-00 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {isEditing ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
                </DialogTitle>
              </DialogHeader>
              <Controller
                control={control}
                name="title"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputField
                    value={value}
                    onChange={onChange}
                    title="Tiêu đề"
                    type="text"
                    isRequired
                    error={fieldState && fieldState.error?.message}
                    placeholder="Nhập tiêu đề bài viết"
                  />
                )}
              />
              {/* news image */}
              <InputImgUploadContest
                title="Đăng tải ảnh bìa"
                value={getValues("image")}
                onChange={handleImageUpload}
                customClassNames="mt-b "
              />

              <Controller
                control={control}
                name="tags"
                render={({ field: { value, onChange }, fieldState }) => (
                  <InputTags
                    value={value}
                    error={fieldState?.error?.message}
                    onValueChange={(tagsString) => {
                      onChange(tagsString);
                    }}
                    isTooltip={true}
                    isRequired
                    tooltipContent="Vui lòng nhập tag và ấn Enter"
                  />
                )}
              />

              <Controller
                control={control}
                name="content"
                render={({ field: { value, onChange }, fieldState }) => (
                  <ReactQuill
                    theme="snow"
                    className="w-full rounded-xl bg-grey-50 outline-none !text-[20px] min-h-[200px] transition-all ease-linear"
                    value={value}
                    onChange={onChange}
                    placeholder="Nội dung bài viết"
                    modules={modules}
                    formats={formats}
                  />
                )}
              />

              {/* Dialog Footer */}
              <DialogFooter className="flex items-center justify-between sm:justify-between">
                <CommonButton
                  variant="secondary"
                  className="h-[48px] !w-[91px] "
                  childrenClassName="text-SubheadMd"
                  onClick={() => {
                    setToggleNewsDialog(false);
                    setIsEditing(false);
                    reset();
                  }}
                >
                  Thoát
                </CommonButton>
                <div className="flex items-center gap-2">
                  <CommonButton
                    variant="secondary"
                    className="h-[48px] w-[77px]"
                    childrenClassName="!text-[#AD3C34]"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Xoá
                  </CommonButton>
                  <CommonButton
                    variant="secondary"
                    className="h-[48px] !w-[149px]"
                    onClick={() => handleNewsSubmit("draft")}
                  >
                    {isEditing ? "Đưa về bản nháp" : "Lưu bản nháp"}
                  </CommonButton>
                  <CommonButton
                    className="text-white h-[48px] w-[133px]"
                    onClick={() => {
                      setIsEditing(false);
                      handleNewsSubmit("public");
                    }}
                  >
                    {isEditing ? "Cập nhật" : "Đăng dự án"}
                  </CommonButton>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </FormProvider>
      </div>
    </div>
  );
}
