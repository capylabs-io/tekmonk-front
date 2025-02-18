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

import StudentTablePagination from "@/components/admin/student-table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { InputTags } from "@/components/contest/InputTags";
import { useQuery } from "@tanstack/react-query";
import { ReqGetAllNews } from "@/requests/news";
import qs from "qs";
import { InputField } from "@/components/contest/InputField";
import { InputImgUploadContest } from "@/components/contest/InputImgUploadContest";
import Loading from "@/app/loading";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolve } from "path";

const newsSchema = z.object({
  title: z
    .string({ required_error: "Tên bài viết không được để trống" })
    .min(1, "Tên bài viết phải có ít nhất 1 ký tự"),
  tags: z.string().optional(), // Cho phép bỏ trống // Đánh dấu là tùy chọn
  image: z.string().optional(),
  content: z.string().min(1, "Mô tả không được để trống"),
});
interface TNewsContent {
  title: string;
  image: File | null;
  tags: string;
  type?: string;
}

export default function Page() {
  const [toggleCreateNews, setToggleCreateNews] = useState(false);
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
  } = methods;
  const [content, setContent] = useState<TNewsContent>({
    title: "",
    image: null,
    tags: "",
    type: "news",
  });
  // const [tags, setTags] = useState<string>();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //use query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", page, limit],
    queryFn: async () => {
      try {
        const queryString = qs.stringify({
          pagination: {
            page: page,
            pageSize: limit,
          },
          filters: {
            type: "news",
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

  // Handle image upload
  const handleImageUpload = (file: File | null) => {
    setContent((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCreateNews = () => {
    console.log("content", getValues());
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
      <div className="w-full h-auto min-h-[68px] flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b border-gray-20">
        <div className="text-SubheadLg text-gray-95 mb-2 sm:mb-0">Học viên</div>
        <CommonButton
          className="h-9 w-full sm:w-[120px] text-gray-00"
          variant="primary"
        >
          <div
            className="text-SubheadSm"
            onClick={() => setToggleCreateNews(true)}
          >
            Tạo bài viết
          </div>
        </CommonButton>
      </div>
      <div className="p-4 flex-1">
        {/* <StudentTable /> */}
        <div className="w-full overflow-auto">
          {/* Desktop view */}
          <div className="hidden md:block">
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
                          src={item.thumbnail || "/placeholder.svg"}
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
                          {item.tags
                            ?.split(",")
                            .map((tag: any, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-secondary/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
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

          {/* Mobile view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {data &&
              data.data.map((item, index) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={48}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {item.tags?.split(",").map((tag: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {item.createdAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
          open={toggleCreateNews}
          onOpenChange={() => setToggleCreateNews(false)}
        >
          <DialogContent className="sm:max-w-[800px] max-h-full bg-gray-00 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Tạo bài viết mới</DialogTitle>
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
            <Controller
              control={control}
              name="tags"
              render={({ field: { value, onChange }, fieldState }) => (
                <InputTags
                  value={value}
                  error={fieldState?.error?.message}
                  onValueChange={(tagsString) => {
                    setContent({ ...content, tags: tagsString });
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
                <InputField
                  value={value}
                  onChange={onChange}
                  title="Nội dung"
                  type="text-area"
                  isRequired
                  error={fieldState?.error?.message}
                  placeholder="Nội dung bài viết"
                />
              )}
            />

            {/* news image */}
            <InputImgUploadContest
              title="Đăng tải ảnh bìa"
              value={content.image}
              onChange={handleImageUpload}
              customClassNames="mt-b "
            />

            {/* Dialog Footer */}
            <DialogFooter className="flex items-center justify-between sm:justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline">Thoát</Button>
                <Button
                  variant="outline"
                  className="text-destructive"
                  onClick={() => {
                    setContent({ title: "", image: null, tags: "" });
                  }}
                >
                  Xoá
                </Button>
                <Button variant="outline">Lưu bản nháp</Button>
              </div>
              <Button
                className="bg-[#B455C0] hover:bg-[#A346B1] text-white"
                onClick={async () => {
                  const isValid = await trigger();
                  await handleCreateNews();
                  if (isValid) {
                    setToggleCreateNews(false);
                  } else {
                    console.log("error");
                  }
                }}
              >
                Đăng dự án
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FormProvider>
    </div>
  );
}
