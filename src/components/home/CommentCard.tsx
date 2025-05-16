import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Dot,
  Heart,
  MessageCircle,
  Repeat2,
  Upload,
  Edit2,
  Check,
  X,
  Pencil,
} from "lucide-react";
import { get } from "lodash";
import { timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { editCommentPost } from "@/requests/post";
import { PostComment } from "@/types/common-types";
import { useUserStore } from "@/store/UserStore";
import { useCustomRouter } from "../common/router/CustomRouter";

type Props = {
  comment: PostComment;
  isVerified?: boolean;
  imageUrl?: string;
  username?: string;
  name?: string;
  time?: string | number;
  isDetail?: boolean;
  content?: string;
  interact?: {
    numberOflike: number;
    numberOfMessage: number;
    numberOfShare: number;
    numberOfView: number;
  };
  onUpdateComment?: () => void;
};

export const CommentCard = ({
  isVerified,
  imageUrl,
  username,
  name,
  content,
  time,
  interact,
  comment,
  onUpdateComment,
}: Props) => {
  const router = useCustomRouter();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content || "");
  const { success, error } = useSnackbarStore();
  const [userInfo] = useUserStore((state) => [state.userInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleUpdateComment = async () => {
    if (!comment.id) return;

    try {
      const res = await editCommentPost(comment.id, { content: editedContent });
      if (res) {
        success("Thành công", "Đã cập nhật bình luận");
        onUpdateComment?.();
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating comment:", err);
      error("Lỗi", "Không thể cập nhật bình luận");
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`h-[40px] w-[40px] flex-shrink-0 rounded-full border bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${comment?.commentedBy?.data?.avatar || "/image/home/profile-pic.png"
            })`,
        }}
      ></div>
      <div className="w-full flex-1 space-y-0.5">
        <div className="text-black flex items-center gap-1 text-base font-medium">
          <div className="hover:cursor-pointer hover:underline hover:text-primary-70" onClick={() => router.push(`/ho-so/${comment?.commentedBy?.id}`)}>{comment?.commentedBy?.fullName || name}</div>
          <div className="inline-flex items-center gap-1 text-sm text-grey-500 hover:cursor-pointer hover:underline hover:text-primary-70" onClick={() => router.push(`/ho-so/${comment?.commentedBy?.id}`)}>
            @{comment?.commentedBy?.username || username}
            <Dot size={20} />
            {time ? timeAgo(Number(time)) : "Invalid time"}
          </div>
          {comment?.commentedBy?.id === userInfo?.id && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto p-0 h-auto hover:bg-transparent flex gap-1 items-center"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={16} /> Sửa
            </Button>
          )}
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-70"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(content || "");
                }}
              >
                Huỷ
              </Button>
              <Button
                size="sm"
                className="bg-primary-70 text-white"
                onClick={handleUpdateComment}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm md:text-base">{content}</p>
        )}
        <div className="flex justify-between gap-x-4 text-sm">
          <div className="flex gap-x-4 lg:gap-[35.5px]">
            <div className="inline-flex items-center gap-1 md:gap-2">
              <MessageCircle size={16} />
              {get(interact, "numberOfMessage", "")}
            </div>
            {/* <div className="inline-flex items-center gap-1 md:gap-2">
              <Repeat2 size={16} />
              {get(interact, 'numberOfShare', '')}
            </div> */}
            <div className="inline-flex items-center gap-1 md:gap-2">
              <Heart size={16} />
              {get(interact, "numberOflike", "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
