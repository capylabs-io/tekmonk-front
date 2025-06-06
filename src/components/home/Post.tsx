"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Tag, Plus, Send } from "lucide-react";
import classNames from "classnames";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { PostType, PostTypeEnum } from "@/types";
import { CommonButton } from "../common/button/CommonButton";
import { useLoadingStore } from "@/store/LoadingStore";
import { updatePost, addCommentPost } from "@/requests/post";
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
import { ActionGuard } from "../common/ActionGuard";
import { motion } from "framer-motion";
import { PostImageGallery } from "./post-detail";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProjectResources } from "./ProjectResources";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import qs from "qs";
import { cn } from "@/lib/utils";

export type PostProps = {
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
  onCommentClick?: (data: PostType) => void;
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
  onCommentClick,
  taggedUsers,
  postTags,
  onUpdatePost,
  isDetail,
}: PostProps) => {
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
  const queryClient = useQueryClient();
  const { success, error } = useSnackbarStore();
  const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [taggedUsersDialogOpen, setTaggedUsersDialogOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const taggedList = useMemo(() => {
    return taggedUsers?.filter(
      (user) => user.id.toString() !== data?.postedBy?.id.toString()
    );
  }, [taggedUsers, data]);
  const { data: dataAvatarConfig, refetch: refetchAvatarConfig } = useQuery({
    queryKey: ["avatar-config", data?.postedBy?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: [
          "frontHair",
          "backHair",
          "cloth",
          "mouth",
          "eye",
          "theme",
          "special",
        ],
        filters: {
          user: {
            id: {
              $eq: Number(data?.postedBy?.id),
            },
          },
        },
      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!data?.postedBy?.id,
    refetchOnWindowFocus: false,
  });
  // Extract images from the post data
  const postImages = useMemo(() => {
    // For now, we'll use the thumbnail as the first image
    // In a real implementation, you would get all images from the post data
    const images = [];
    if (thumbnailUrl) {
      images.push(thumbnailUrl);
    }

    // Add more images if available in the post data
    if (data?.images) {
      // Handle images which are objects with url property
      const imageUrls = (data.images as { url: string }[]).map(
        (img) => img.url
      );
      images.push(...imageUrls);
    }

    return images;
  }, [thumbnailUrl, data]);

  // Determine the grid layout based on number of images
  const getGridLayout = () => {
    switch (postImages.length) {
      case 0:
        return "";
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 md:grid-cols-4";
      case 4:
        return "grid-cols-2 md:grid-cols-3";
      default:
        return "grid-cols-2 md:grid-cols-4";
    }
  };

  // Generate specific class for each item based on its position
  const getItemClass = (index: number) => {
    if (postImages.length === 1) {
      return "col-span-1";
    } else if (postImages.length === 2) {
      return "col-span-1";
    } else if (postImages.length === 3) {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
        : "col-span-1 md:col-span-1";
    } else if (postImages.length === 4) {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-1 md:row-span-2"
        : "col-span-1";
    } else {
      return index === 0
        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
        : "col-span-1";
    }
  };

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
        queryClient.invalidateQueries({
          queryKey: ["infinite-latest-post"],
        });
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

  const handleOpenGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  // Display only first 5 items in grid, with counter on the last one if more
  const displayImages =
    postImages.length > 5 ? postImages.slice(0, 5) : postImages;
  const remainingCount = postImages.length - 5;

  // Extract tags from post data if available
  const postTagsList = useMemo(() => {
    if (data?.tags) {
      return data.tags.split(", ");
    }
    return [];
  }, [data?.tags]);

  const handleCommentClick = () => {
    if (isDetail) {
      // If we're already on the detail page, just show the comment input
      setShowCommentInput(!showCommentInput);
    } else {
      // If we're not on the detail page, navigate to the post detail
      data && router.push(`/bai-viet/${data?.id}`);
    }
  };

  const handleSendComment = async () => {
    try {
      if (!data?.id) return;

      showLoading();
      const res = await addCommentPost({
        content: commentText,
        postId: Number(data.id),
      });

      if (res) {
        success("Thành công", "Đã thêm bình luận");
        setCommentText("");
        setShowCommentInput(false);
        onUpdatePost?.();
      }
    } catch (err) {
      console.log("error", err);
      error("Lỗi", "Đã xảy ra lỗi khi thêm bình luận");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div
        className={classNames("relative cursor-pointer", customClassname)}
        onDoubleClick={(e) => {
          isAllowClickDetail && handleClickPostCard(e);
        }}
      >
        <div className="flex items-start w-full gap-2">
          <ProfileInfoBox
            userId={get(data, "postedBy.id", 0)}
            imageUrl={imageUrl}
            userName={userName}
            userRank={userRank}
            specialName={specialName}
            onClick={() =>
              router.push(`${ROUTE.PROFILE}/${get(data, "postedBy.id", "")}`)
            }
            taggedUsers={taggedUsers}
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
                  "!font-light text-gray-800",
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

            {/* Image Grid */}
            {postImages.length > 0 && (
              <div className={`grid gap-2 ${getGridLayout()} mt-3`}>
                {displayImages.map((imageUrl, index) => {
                  const isLastWithMore = index === 4 && remainingCount > 0;

                  return (
                    <motion.div
                      key={index}
                      className={`relative rounded-lg overflow-hidden ${getItemClass(
                        index
                      )}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleOpenGallery(index)}
                    >
                      <Image
                        src={imageUrl}
                        alt={`Post image ${index + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />

                      {/* Type indicator */}
                      {index === 0 && (
                        <div className="absolute left-4 top-4">
                          {data?.type === PostTypeEnum.PROJECT ? (
                            <div className="bg-primary-70 text-white px-2 py-1 rounded-md">
                              <span className="font-medium">Dự án</span>
                            </div>
                          ) : (
                            <div className="bg-primary-70 text-white px-2 py-1 rounded-md">
                              <span className="font-medium">Bài viết</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Remaining Count Overlay */}
                      {isLastWithMore && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-white text-2xl font-bold flex items-center">
                            <Plus className="h-6 w-6 mr-1" />
                            {remainingCount}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Project Resources */}
          <ProjectResources
            projectFile={data?.projectFile}
            projectLink={data?.projectLink}
          />

          <div className="flex items-center justify-between mt-3">
            {!hideSocial && (
              <div className="flex gap-x-10">
                <div
                  className={classNames("flex items-center gap-x-1 font-bold ")}
                >
                  <ActionGuard
                    onAction={() => data && onLikedPostClick?.(data)}
                    actionName="thích bài viết"
                    className="cursor-pointer flex items-center justify-center "
                  >
                    <button>
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
                          "cursor-pointer hover:scale-110 transition-transform",
                          data?.isLiked ? "text-red-500" : ""
                        )}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </ActionGuard>
                  <span>{likedCount}</span>
                </div>
                <div className="flex items-center gap-x-1 font-bold text-gray-500">
                  <ActionGuard
                    onAction={handleCommentClick}
                    actionName="bình luận"
                    className="cursor-pointer flex items-center justify-center"
                  >
                    <button>
                      <MessageCircle
                        size={20}
                        className="hover:scale-110 transition-transform"
                      />
                    </button>
                  </ActionGuard>
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
                </>
              )}
              <Share
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/bai-viet/${data?.id}`}
                title={postName}
                description={
                  postContent?.replace(/<[^>]*>?/gm, "").substring(0, 200) || ""
                }
                hashtags={["tekmonk"]}
                image={thumbnailUrl || ""}
              />
            </div>
          </div>

          {/* Quick Comment Input (only shown when showCommentInput is true and isDetail is true) */}
          {showCommentInput && isDetail && (
            <div className="mt-4 flex items-center gap-2">
              {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
                <div
                  className="border-[5px] p-1 border-white bg-white rounded-full size-10 relative overflow-hidden"
                  style={{}}
                >
                  {dataAvatarConfig[0]?.frontHair && (
                    <Image
                      src={dataAvatarConfig[0]?.frontHair?.image || ""}
                      alt={dataAvatarConfig[0]?.frontHair?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[4]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.backHair && (
                    <Image
                      src={dataAvatarConfig[0]?.backHair?.image || ""}
                      alt={dataAvatarConfig[0]?.backHair?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[2]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.cloth && (
                    <Image
                      src={dataAvatarConfig[0]?.cloth?.image || ""}
                      alt={dataAvatarConfig[0]?.cloth?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[3]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.mouth && (
                    <Image
                      src={dataAvatarConfig[0]?.mouth?.image || ""}
                      alt={dataAvatarConfig[0]?.mouth?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[4]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.eye && (
                    <Image
                      src={dataAvatarConfig[0]?.eye?.image || ""}
                      alt={dataAvatarConfig[0]?.eye?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[3]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.theme && (
                    <Image
                      src={dataAvatarConfig[0]?.theme?.image || ""}
                      alt={dataAvatarConfig[0]?.theme?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[1]")}
                    />
                  )}
                  {dataAvatarConfig[0]?.special && (
                    <Image
                      src={dataAvatarConfig[0]?.special?.image || ""}
                      alt={dataAvatarConfig[0]?.special?.name || ""}
                      fill
                      className={cn("object-cover absolute z-[5]")}
                    />
                  )}
                </div>
              ) : (
                <div
                  className={`size-10 rounded-full border bg-cover bg-center bg-no-repeat`}
                  style={{
                    backgroundImage: `url(/image/home/profile-pic.png)`,
                    height: 40,
                    width: 40,
                  }}
                ></div>
              )}
              <div className="flex h-14 w-full items-center justify-center gap-1 rounded-lg border border-gray-300 px-3">
                <textarea
                  value={commentText}
                  placeholder="Viết bình luận"
                  className="text-black h-10 min-w-0 flex-1 resize-none rounded-md bg-transparent px-3 py-2 outline-none"
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  onClick={handleSendComment}
                  disabled={commentText.length === 0}
                  className="!rounded-lg bg-primary-70 hover:bg-primary-80"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Dialog */}
      {data && (
        <PostImageGallery
          data={data}
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
          images={postImages}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
          userName={userName}
          imageUrl={imageUrl}
          specialName={specialName}
          postName={postName}
          postContent={postContent}
          createdAt={createdAt}
          likedCount={likedCount}
          commentCount={commentCount}
          tags={postTagsList}
          onTagClick={handleSearchByTag}
          isLiked={data?.isLiked}
          onLike={() => data && onLikedPostClick?.(data)}
          postId={data.id}
          onUpdateComment={onUpdatePost}
        />
      )}

      <Dialog
        open={addStudentDialogOpen}
        onOpenChange={setAddStudentDialogOpen}
      >
        <DialogContent className="w-[680px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-HeadingSm font-semibold text-gray-95">
              Tag người dùng
            </DialogTitle>
          </DialogHeader>

          <div>
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
    </>
  );
};
