"use client";

import { CommonButton } from "@/components/common/button/CommonButton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, PanelLeft } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import { CommonCard } from "@/components/common/CommonCard";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
import { CommonTable } from "@/components/common/CommonTable";
import { ColumnDef } from "@tanstack/react-table";
import { get } from "lodash";
import { PostType } from "@/types";
import { Post } from "@/components/home/Post";
import { ConvertoStatusPostToText } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useVerifiedPost } from "@/hooks/useVerifiedPost";
import moment from "moment";

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
  const {
    togglePostDialog,
    toggleConfirmDialog,
    listPost,
    currentPost,
    setCurrentPost,
    setTogglePostDialog,
    handleTabChange,
    setToggleConfirmDialog,
    handleVerifiedPost,
    handleVerified
  } = useVerifiedPost()

  const methods = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      tags: "",
      image: null,
      content: "",
    },
  });
  const { control, getValues, setValue, reset } = methods;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(100);


  const columns: ColumnDef<PostType>[] =
    [
      {
        header: 'STT',
        cell: ({ row }) => <span>{row.index + 1}</span>,

      },
      {
        header: 'Ảnh bìa',
        cell: ({ row }) => (
          <div className="flex items-center">
            <Image
              src={row.original?.thumbnail || ''}
              alt="thumbnail"
              height={64}
              width={130}
              className="rounded-xl w-full"
            />
          </div>
        ),
      },
      {
        header: 'Tiêu đề dự án',
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        header: 'Trạng thái',
        cell: ({ row }) => <span>{ConvertoStatusPostToText(row.original.isVerified || '')}</span>,
      },
      {
        header: 'Tags',
        cell: ({ row }) => <div className="flex flex-wrap gap-2">

          {row.original.tags.split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "").map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-gray-20 text-gray-95 rounded-md text-BodyXs"
              >
                <span className="px-2 py-1">{tag}</span>
              </div>
            ))}
        </div>,
      },
      {
        id: 'action',
        header: '',
        cell: ({ row }) => (
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setTogglePostDialog(true)
              setCurrentPost(row.original)
            }}
          >
            <Eye className="h-4 w-4" color="#7C6C80" />
          </button>
        ),
      },
    ]


  return (
    <div className="w-full h-screen border-r border-gray-20">
      <div className="w-full h-[68px] flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 border-b border-gray-20">
        <div className="text-SubheadLg text-gray-95 mb-2 sm:mb-0 flex items-center justify-center gap-2">
          <CommonCard
            size="small"
            className="w-8 h-8 !rounded-[6px] flex items-center justify-center"
          >
            <PanelLeft width={17} height={17} />
          </CommonCard>
          Phê duyệt
        </div>
      </div>
      {/* <div className="w-full flex flex-col py-2">
        <div className="h-9 w-[265px] flex items-center justify-center text-gray-95 gap-3"> */}
      <Tabs defaultValue="verified" className="w-full !h-[calc(100%-68px-2px)] overflow-y-auto" onValueChange={handleTabChange}>
        <TabsList className="w-full border-b border-gray-200 !justify-start">
          <TabsTrigger value="verified">Phê duyệt</TabsTrigger>
          <TabsTrigger value="history">Lịch sử phê duyệt</TabsTrigger>
        </TabsList>
        <TabsContent value="verified" className="overflow-y-auto">
          {
            listPost.length > 0 &&
            <div className="border rounded-2xl w-[720px] mx-auto py-8">
              {listPost.map((item, index) => (
                <>
                  <Post
                    showButton
                    data={item}
                    onVerifiedPost={handleVerifiedPost}
                    imageUrl="bg-[url('/image/home/profile-pic.png')]"
                    thumbnailUrl={get(item, 'thumbnail') || ''}
                    userName="Andy Lou"
                    specialName={get(item, 'postedBy.skills', '')}
                    userRank={
                      <span
                        className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
                      >
                        IV
                      </span>
                    }
                    postContent={get(item, 'content', '')}
                    postName={get(item, 'name', '')}
                    createdAt={moment(get(item, 'createdAt', ''), 'dd/mm/yyyy hh:mm:ss').toString()}
                    likedCount="6.2"
                    commentCount="61"
                  />
                  {
                    index !== listPost.length - 1 &&
                    <hr className="border-t border-gray-200 my-4" />
                  }
                </>
              ))}
            </div>
          }
        </TabsContent>
        <TabsContent value="history" className="overflow-y-auto p-4">
          <CommonTable
            data={listPost && listPost || [] as any[]}
            isLoading={false}
            columns={columns}
            page={page}
            totalPage={totalPage}
            totalDocs={totalDocs}
            onPageChange={setPage}
          />
        </TabsContent>
      </Tabs>
      <Dialog
        open={toggleConfirmDialog}
        onOpenChange={(open) => {
          if (!open) {
            setToggleConfirmDialog(false);
          }
        }}
      >
        <DialogContent className="max-w-[500px] max-h-full bg-gray-00 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Từ chối bài đăng
            </DialogTitle>
            <DialogDescription>
              <div className="text-gray-60 text-BodySm">
                Yêu cầu reset mật khẩu của tài khoản <span className="text-gray-95 font-bold">kh*********@gmail.com</span> đã được gửi đến hệ thống. Hãy chờ email phản hồi và làm theo hướng dẫn.
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <CommonButton
              variant="secondary"
              className="h-[48px]"
              childrenClassName="text-SubheadMd"
              onClick={() => {
                setToggleConfirmDialog(false);
              }}
            >
              Thoát
            </CommonButton>
            <CommonButton
              variant="primary"
              className="h-[48px]"
              childrenClassName="text-SubheadMd"
              onClick={() => {
                setToggleConfirmDialog(false);
                handleVerified(currentPost)
              }}
            >
              Từ chối
            </CommonButton>

          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={togglePostDialog}
        onOpenChange={(open) => {
          if (!open) {
            setCurrentPost(null);
            setTogglePostDialog(false);
          }
        }}
      >
        <DialogContent className="max-w-[500px] h-[600px] bg-gray-00 overflow-y-auto">
          <Tabs defaultValue="verified" className="w-full overflow-y-auto">
            <TabsList className="w-full border-b border-gray-200 !justify-start">
              <TabsTrigger value="post">Bài viết</TabsTrigger>
              <TabsTrigger value="note">Ghi chú</TabsTrigger>
            </TabsList>
            <TabsContent value="post" className="overflow-y-auto">
              <div className="relative">
                <div
                  className="inline-flex items-center bg-gray-20 text-gray-95 rounded-md text-BodyXs"
                >
                  <span className="px-2 py-1">{get(currentPost, 'isVerified')}</span>
                </div>
                <Post
                  isVerified
                  hideSocial
                  data={currentPost}
                  onVerifiedPost={handleVerifiedPost}
                  imageUrl="bg-[url('/image/home/profile-pic.png')]"
                  thumbnailUrl={get(currentPost, 'thumbnail') || ''}
                  userName="Andy Lou"
                  specialName={get(currentPost, 'postedBy.skills', '')}
                  userRank={
                    <span
                      className={`bg-[url('/image/user/silver-rank.png')] bg-no-repeat h-6 w-6 flex flex-col items-center justify-center text-xs`}
                    >
                      IV
                    </span>
                  }
                  postContent={get(currentPost, 'content', '')}
                  postName={get(currentPost, 'name', '')}
                  createdAt={moment(get(currentPost, 'createdAt', ''), 'dd/mm/yyyy hh:mm:ss').toString()}
                  likedCount="6.2"
                  commentCount="61"
                />
              </div>
            </TabsContent>
            <TabsContent value="note" className="overflow-y-auto p-4">
              {/* {
                currentPost?.isVerified === PostVerificationType.DENIED &&
                <>
                  <div className="text-SubheadLg text-gray-95">Lý do từ chối</div>
                  <div className="text-gray-60 text-BodyMd">Nội dung bài viết không phù hợp, bài viết này sẽ không được đănng tải</div>
                </>
              } */}
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between sm:justify-between mt-2">
            <CommonButton
              variant="secondary"
              className="h-[48px]"
              childrenClassName="text-SubheadMd"
              onClick={() => {
                setTogglePostDialog(false);
                reset();
              }}
            >
              Thoát
            </CommonButton>
            <div className="flex gap-2">
              <CommonButton
                variant="destructive"
                className="h-[48px]"
                childrenClassName="text-SubheadMd"
                onClick={() => {
                  setTogglePostDialog(false);
                  reset();
                }}
              >
                Xoá
              </CommonButton>
              <CommonButton
                variant="secondary"
                className="h-[48px]"
                childrenClassName="text-SubheadMd"
                onClick={() => {
                  setTogglePostDialog(false);
                  reset();
                }}
              >
                Khôi phục
              </CommonButton>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
}
