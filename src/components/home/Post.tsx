"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Tag } from "lucide-react";
import classNames from "classnames";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { PostType, PostTypeEnum } from "@/types";
import { CommonButton } from "../common/button/CommonButton";
import { useLoadingStore } from "@/store/LoadingStore";
import { updatePost } from "@/requests/post";
import { get } from "lodash";
import { ConvertoStatusPostToText } from "@/lib/utils";
import Share from "../common/Share";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListStudentRemainingSelect } from "./ListStudentSelect";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { Button } from "@/components/ui/button";
import { User } from "@/types/common-types";
import { useUserStore } from "@/store/UserStore";
import { useCustomRouter } from "../common/router/CustomRouter";
import { useMemo } from "react";
import { CommonTag } from "../common/CommonTag";
import { ROUTE } from "@/contants/router";

type Props = {
  data?: PostType | null;
  imageUrl: string;
  thumbnailUrl: string;
  userName: string;
  userRank?: ReactNode;
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
  taggedUsers?: User[];
  onVerifiedPost?: (data: PostType) => void;
  onLikedPostClick?: (data: PostType) => void;
  onUpdatePost?: () => void;
  isDetail?: boolean;
  postTags?: string[];
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
  taggedUsers,
  postTags,
  onUpdatePost,
  isDetail,
}: Props) => {
  const router = useCustomRouter();
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
  const [userInfo] = useUserStore((state) => [state.userInfo]);
  const { success, error } = useSnackbarStore();
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [taggedUsersDialogOpen, setTaggedUsersDialogOpen] = useState(false);
  const taggedList = useMemo(() => {
    return taggedUsers?.filter(
      (user) => user.id.toString() !== userInfo?.id.toString()
    );
  }, [taggedUsers, userInfo]);
  // Tự động chọn người dùng đã được tag khi mở dialog tag
  useEffect(() => {
    if (addStudentDialogOpen && taggedUsers && taggedUsers.length > 0) {
      const taggedUserIds = taggedUsers.map((user) => user.id.toString());
      setSelectedStudents(taggedUserIds);
    }
  }, [addStudentDialogOpen, taggedUsers]);

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

  const handleSearchByTag = (tag: string) => {
    router.push(`${ROUTE.SEARCH}?q=${tag}&filter=hashtag`);
  };
  return (
    <>
      <div
        className={classNames("relative cursor-pointer", customClassname)}
        onDoubleClick={(e) => {
          isAllowClickDetail && handleClickPostCard(e);
        }}
      >
        <div className="flex items-center mt-8 w-full gap-2">
          <ProfileInfoBox
            imageUrl={imageUrl}
            userName={userName}
            userRank={userRank}
            specialName={specialName}
            onClick={() =>
              router.push(`/ho-so/${get(data, "postedBy.id", "")}`)
            }
          />
          {taggedList && taggedList?.length > 0 && (
            <div className="flex items-center gap-1">
              cùng với
              <div
                className="text-primary-70 hover:text-primary-80 font-medium hover:underline"
                onClick={() => router.push(`/ho-so/${taggedList[0]?.id}`)}
              >
                {taggedList[0]?.username}
              </div>
              và{" "}
              <div
                className="text-primary-70 hover:text-primary-80 font-medium hover:underline"
                onClick={() => setTaggedUsersDialogOpen(true)}
              >
                {taggedList.length - 1} người khác.
              </div>
              <div className="ml-1">
                {data?.type === PostTypeEnum.PROJECT ? (
                  <div>
                    <span className="font-medium">Dự án</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-medium">Bài viết</span>
                  </div>
                )}
              </div>
            </div>
          )}
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
            {!isDetail ? (
              <p
                className="text-xl font-bold text-gray-800 hover:text-primary-70 hover:underline"
                onClick={() => router.push(`/bai-viet/${data?.id}`)}
              >
                {postName}
              </p>
            ) : (
              <p className="text-xl font-bold text-gray-800">{postName}</p>
            )}
            {/* Make component tag here */}
            {data?.tags && data?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {data?.tags.split(", ").map((tag: string, index: number) => (
                  <CommonTag key={index} onClick={() => handleSearchByTag(tag)}>
                    {tag}
                  </CommonTag>
                ))}
              </div>
            )}
            <div className="relative">
              <div
                className={classNames(
                  "text-base text-gray-800",
                  isDetail ? "line-clamp-none" : "line-clamp-3"
                )}
                dangerouslySetInnerHTML={{
                  __html: postContent || "",
                }}
              ></div>
              {data?.id && !isDetail && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(`/bai-viet/${data?.id}`);
                  }}
                  className="text-primary-70 hover:text-primary-80 font-medium mt-2 hover:underline"
                >
                  Xem thêm
                </button>
              )}
            </div>
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
              {data?.postedBy?.id === userInfo?.id && (
                <>
                  <div
                    onClick={() => setAddStudentDialogOpen(true)}
                    className="inline-flex items-center gap-2 !text-gray-500 hover:!text-primary-70"
                  >
                    <Tag className="h-4 w-4" />
                    <span className="text-sm">Tag người khác</span>
                  </div>
                  <Share
                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${data?.id}`}
                    title={postName}
                    description={
                      postContent
                        ?.replace(/<[^>]*>?/gm, "")
                        .substring(0, 200) || ""
                    }
                    hashtags={["tekmonk"]}
                    image={thumbnailUrl || ""}
                  />
                </>
              )}
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
            {data?.postedBy?.id && (
              <ListStudentRemainingSelect
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                studentId={data?.postedBy?.id}
              />
            )}

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

      <Dialog
        open={taggedUsersDialogOpen}
        onOpenChange={setTaggedUsersDialogOpen}
      >
        <DialogContent className="w-[680px] bg-white">
          <DialogHeader className="px-4">
            <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
              Người dùng được tag
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <div className="max-h-[400px] overflow-y-auto">
              {taggedUsers &&
                taggedUsers.slice(1).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 py-2 border-b border-gray-200 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={"/image/home/profile-pic.png"}
                        alt={user.username || "User"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className="font-medium text-gray-800 hover:text-primary-70 hover:underline cursor-pointer"
                        onClick={() => {
                          router.push(`/ho-so/${user.id}`);
                          setTaggedUsersDialogOpen(false);
                        }}
                      >
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500">{user.username}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setTaggedUsersDialogOpen(false)}
                className="bg-primary-70 hover:bg-primary-80 text-white"
              >
                Đóng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
