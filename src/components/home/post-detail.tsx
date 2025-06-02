"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CommonTag } from "../common/CommonTag";
import { cn } from "@/lib/utils";
import { PostCommentContent } from "./PostCommentContent";
import { PostType, PostTypeEnum } from "@/types/posts";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { get } from "lodash";
import { useCustomRouter } from "../common/router/CustomRouter";
import { ROUTE } from "@/contants/router";
interface PostImageGalleryProps {
  open: boolean;
  data: PostType;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  userName?: string;
  imageUrl: string;
  specialName?: string;
  postName?: string;
  postContent?: string;
  createdAt?: string;
  likedCount?: string;
  commentCount?: string;
  tags?: string[];
  onTagClick?: (tag: string) => void;
  isLiked?: boolean;
  onLike?: () => void;
  postId?: number;
  onUpdateComment?: () => void;
}

export const PostImageGallery = ({
  open,
  data,
  onOpenChange,
  images,
  currentIndex,
  onIndexChange,
  userName,
  imageUrl,
  specialName,
  postName,
  postContent,
  createdAt,
  likedCount,
  commentCount,
  tags,
  onTagClick,
  isLiked,
  onLike,
  postId,
  onUpdateComment,
}: PostImageGalleryProps) => {
  const router = useCustomRouter();
  const [isDetail, setIsDetail] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 w-[90vw] border-none">
        {/* <DialogClose className="!hidden"></DialogClose> */}
        <div className="relative w-full h-[95vh] flex flex-col md:flex-row rounded-lg overflow-hidden">
          <div
            className="relative w-full md:w-3/4 h-[50vh] md:h-full flex items-center justify-center bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                fill
                unoptimized
                className="object-contain"
              />

              {/* Navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-50"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white z-50"
                    onClick={nextImage}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </div>

          {/* Right side - Post content */}
          <div className="relative w-full md:w-1/4 h-[50vh] md:h-full bg-white overflow-y-auto">
            <div className="p-6">
              {/* Post header */}
              {userName && (
                <div className="flex items-center justify-between gap-2 mt-2 mb-4">
                  <div className="flex items-center gap-2">
                    <ProfileInfoBox
                      imageUrl={imageUrl}
                      userName={userName}
                      specialName={specialName}
                      onClick={() =>
                        router.push(
                          `${ROUTE.PROFILE}/${get(data, "postedBy.id", "")}`
                        )
                      }
                      userId={get(data, "postedBy.id", 0)}
                    />
                  </div>
                  <div className="">
                    <div className="bg-primary-70 text-white px-2 py-1 rounded-md">
                      <span className="font-medium">
                        {data?.type === PostTypeEnum.PROJECT
                          ? "Dự án"
                          : "Bài viết"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Post title */}
              {postName && (
                <h2 className="text-xl font-bold mb-3">{postName}</h2>
              )}

              {createdAt && (
                <div className="text-sm text-gray-500 ml-auto mb-4">
                  {createdAt}
                </div>
              )}

              {/* Post tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag: string, index: number) => (
                    <CommonTag key={index} onClick={() => onTagClick?.(tag)}>
                      {tag}
                    </CommonTag>
                  ))}
                </div>
              )}

              {/* Post content */}
              {postContent && (
                <div
                  className={cn(
                    "!font-light text-gray-800",
                    isDetail ? "line-clamp-none" : "line-clamp-3"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: postContent || "",
                  }}
                ></div>
              )}
              {postContent && !isDetail ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDetail(true);
                  }}
                  className="text-primary-70 hover:text-primary-80 font-medium mt-2 hover:underline"
                >
                  Xem thêm
                </button>
              ) : postContent && postContent.length > 100 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDetail(false);
                  }}
                  className="text-primary-70 hover:text-primary-80 font-medium mt-2 hover:underline"
                >
                  Thu gọn
                </button>
              ) : null}

              {/* Post stats */}
              {(likedCount || commentCount) && (
                <div className="flex items-center gap-4 py-3 border-gray-200">
                  {likedCount && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "#ef4444" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${
                          isLiked ? "text-red-500" : ""
                        } cursor-pointer hover:scale-110 transition-transform`}
                        onClick={onLike}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span>{likedCount}</span>
                    </div>
                  )}
                  {commentCount && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageCircle size={20} />
                      <span>{commentCount}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Comments section */}
              <div className="pt-4">
                <h3 className="font-semibold mb-3">Bình luận</h3>
                <div className="h-full pr-2">
                  <PostCommentContent
                    postId={postId}
                    onUpdateComment={onUpdateComment}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
