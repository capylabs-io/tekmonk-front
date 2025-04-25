"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { MessageCircle, Tag, UserPlus } from "lucide-react";
import classNames from "classnames";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { PostType, PostVerificationType } from "@/types";
import { CommonButton } from "../common/button/CommonButton";
import { useLoadingStore } from "@/store/LoadingStore";
import { likePost, updatePost } from "@/requests/post";
import { get } from "lodash";
import { PostCommentContent } from "./PostCommentContent";
import { useRouter } from "next/navigation";
import { ConvertoStatusPostToText } from "@/lib/utils";
import Share from "../common/Share";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListStudentSelect } from "./ListStudentSelect";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { Button } from "@/components/ui/button";

type Props = {
  data?: PostType | null;
  imageUrl: string;
  thumbnailUrl: string;
  userName: string;
  userRank: ReactNode;
  specialName: string;
  createdAt: string;
  likedCount: string;
  commentCount: string;
  postName?: string;
  postContent?: string;
  customClassname?: string;
  isVerified?: boolean;
  isAllowClickDetail?: boolean;
  showButton?: boolean;
  hideSocial?: boolean;
  onVerifiedPost?: (data: PostType) => void;
  onLikedPostClick?: (data: PostType) => void;
  onUpdatePost?: () => void;
};

export const Post = ({
  imageUrl,
  thumbnailUrl,
  userName,
  userRank,
  specialName,
  createdAt,
  likedCount,
  commentCount,
  showButton,
  hideSocial,
  customClassname,
  isVerified,
  postName,
  postContent,
  data,
  isAllowClickDetail,
  onVerifiedPost,
  onLikedPostClick,
  onUpdatePost,
}: Props) => {
  const router = useRouter();
  const handleOnClick = (value: any) => {
    onVerifiedPost?.(value);
  };
  const handleClickPostCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/bai-viet/${data?.id}`);
  };
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const { success, error } = useSnackbarStore();
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const handleTaggingUser = async () => {
    try {
      if (selectedStudents.length === 0) {
        error("Lỗi", "Vui lòng chọn ít nhất một học viên");
        return;
      }
      if (!data?.id) {
        return;
      }
      showLoading();
      const mappedSelectedStudents = selectedStudents.map((studentId) => ({
        id: Number(studentId),
      }));
      const res = await updatePost(data?.id, {
        tagged_users: mappedSelectedStudents,
      });
      if (res) {
        success("Thành công", "Đã tag người dùng");
      }
    } catch (err) {
      console.log("error", err);
      error("Lỗi", "Đã xảy ra lỗi khi tag người dùng");
    } finally {
      hideLoading();
      setAddStudentDialogOpen(false);
      onUpdatePost?.();
    }
  };
  return (
    <>
      <div
        className={classNames("relative", customClassname)}
        onDoubleClick={(e) => {
          isAllowClickDetail && handleClickPostCard(e);
        }}
      >
        {showButton && (
          <div className="flex gap-2 absolute top-0 right-0">
            <CommonButton
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOnClick({
                  ...data,
                  isVerified: PostVerificationType.ACCEPTED,
                });
              }}
            >
              Chấp thuận
            </CommonButton>
            <CommonButton
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOnClick({
                  ...data,
                  isVerified: PostVerificationType.DENIED,
                });
              }}
            >
              Từ chối
            </CommonButton>
          </div>
        )}
        <div className="flex items-center mt-8 w-full justify-between">
          <ProfileInfoBox
            imageUrl={imageUrl}
            userName={userName}
            userRank={userRank}
            specialName={specialName}
          />
          {isVerified && (
            <div className="inline-flex items-center bg-gray-20 text-gray-95 rounded-md text-BodyXs">
              <span className="px-2 py-1">
                {ConvertoStatusPostToText(get(data, "isVerified", ""))}
              </span>
            </div>
          )}
        </div>
        <div className="pl-10 mt-3">
          {!isVerified && (
            <div
              className={`w-full h-[300px] rounded-xl bg-center bg-cover bg-no-repeat`}
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
              }}
            ></div>
          )}

          <div className="mt-3">
            <p className="text-xl font-bold text-gray-800">{postName}</p>
            <div
              className="text-base text-gray-800"
              dangerouslySetInnerHTML={{
                __html: postContent || "",
              }}
            ></div>
          </div>
          {isVerified && (
            <div
              className={`w-full h-[300px] rounded-xl bg-center bg-cover bg-no-repeat mt-3`}
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
              }}
            ></div>
          )}
          <div className="flex items-center justify-between mt-3">
            {!hideSocial && (
              <div className="flex gap-x-10">
                <div
                  className={classNames("flex items-center gap-x-1 font-bold ")}
                >
                  <button
                    onClick={() => {
                      data && onLikedPostClick?.(data);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={data?.isLiked ? "#ef4444" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={classNames(
                        "cursor-pointer",
                        data?.isLiked ? "text-red-500" : ""
                      )}
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </button>
                  <span>{likedCount}</span>
                </div>
                <div className="flex items-center gap-x-1 font-bold text-gray-500">
                  <button>
                    <MessageCircle size={20} />
                  </button>
                  <span>{commentCount}</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div
                onClick={() => setAddStudentDialogOpen(true)}
                className="inline-flex items-center gap-2 !text-gray-500 hover:!text-primary-70"
              >
                <Tag className="h-4 w-4" />
                <span className="text-sm">Tag</span>
              </div>
              <Share
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${data?.id}`}
                title={postName}
                description={postContent}
                hashtags={["tekmonk"]}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={addStudentDialogOpen}
        onOpenChange={setAddStudentDialogOpen}
      >
        <DialogContent className="w-[680px] bg-white">
          <DialogHeader className="px-4">
            <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
              Tag người dùng
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <ListStudentSelect
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
            />

            {/* Actions */}
            <div className="flex justify-between mt-4">
              <div>
                <span className="text-sm text-gray-500">
                  Đã chọn {selectedStudents.length} người dùng
                </span>
              </div>
              <div className="flex gap-2">
                <CommonButton
                  variant="secondary"
                  onClick={() => setAddStudentDialogOpen(false)}
                >
                  Hủy
                </CommonButton>
                <CommonButton
                  variant="primary"
                  onClick={handleTaggingUser}
                  disabled={selectedStudents.length === 0}
                >
                  Tag
                </CommonButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
