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
import { cn, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { editCommentPost } from "@/requests/post";
import { PostComment } from "@/types/common-types";
import { useUserStore } from "@/store/UserStore";
import { useCustomRouter } from "../common/router/CustomRouter";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { ReqGetAvatarConfig } from "@/requests/avatar-config";
import qs from "qs";

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
  const { data: dataAvatarConfig, refetch: refetchAvatarConfig } = useQuery({
    queryKey: ["avatar-config", userInfo?.id],
    queryFn: async () => {
      const queryString = qs.stringify({
        populate: ["frontHair", "backHair", "cloth", "mouth", "eye", "theme", "special"],
        filters: {
          user: {
            id: {
              $eq: Number(userInfo?.id),
            }
          },
        },

      });
      const res = await ReqGetAvatarConfig(queryString);
      return res.data;
    },
    enabled: !!userInfo?.id,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="flex items-start gap-3 w-full">
      {dataAvatarConfig && dataAvatarConfig.length > 0 ? (
        <div className="border-[5px] border-white p-1 bg-white h-[40px] w-[40px] flex-shrink-0 rounded-full relative overflow-hidden" >
          <>
            {dataAvatarConfig[0]?.frontHair && <Image src={dataAvatarConfig[0]?.frontHair?.image || ''} alt={dataAvatarConfig[0]?.frontHair?.name || ''} fill className={cn("object-cover absolute z-[4]")} />}
            {dataAvatarConfig[0]?.backHair && <Image src={dataAvatarConfig[0]?.backHair?.image || ''} alt={dataAvatarConfig[0]?.backHair?.name || ''} fill className={cn("object-cover absolute z-[2]")} />}
            {dataAvatarConfig[0]?.cloth && <Image src={dataAvatarConfig[0]?.cloth?.image || ''} alt={dataAvatarConfig[0]?.cloth?.name || ''} fill className={cn("object-cover absolute z-[3]")} />}
            {dataAvatarConfig[0]?.mouth && <Image src={dataAvatarConfig[0]?.mouth?.image || ''} alt={dataAvatarConfig[0]?.mouth?.name || ''} fill className={cn("object-cover absolute z-[4]")} />}
            {dataAvatarConfig[0]?.eye && <Image src={dataAvatarConfig[0]?.eye?.image || ''} alt={dataAvatarConfig[0]?.eye?.name || ''} fill className={cn("object-cover absolute z-[3]")} />}
            {dataAvatarConfig[0]?.theme && <Image src={dataAvatarConfig[0]?.theme?.image || ''} alt={dataAvatarConfig[0]?.theme?.name || ''} fill className={cn("object-cover absolute z-[1]")} />}
            {dataAvatarConfig[0]?.special && <Image src={dataAvatarConfig[0]?.special?.image || ''} alt={dataAvatarConfig[0]?.special?.name || ''} fill className={cn("object-cover absolute z-[5]")} />}
          </>
        </div>
      ) : (
        <div
          className={`h-[40px] w-[40px] flex-shrink-0 rounded-full border bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(${comment?.commentedBy?.data?.avatar || "/image/home/profile-pic.png"
              })`,
          }}
        ></div>
      )}
      <div className="w-[calc(100%-40px-12px)] space-y-0.5">
        <div className="text-black flex items-center gap-1 text-base font-medium flex-wrap">
          <div
            className="hover:cursor-pointer hover:underline hover:text-primary-70"
            onClick={() => router.push(`/ho-so/${comment?.commentedBy?.id}`)}
          >
            {comment?.commentedBy?.fullName || name}
          </div>
          <div
            className="inline-flex items-center gap-1 text-sm text-grey-500 hover:cursor-pointer hover:underline hover:text-primary-70"
            onClick={() => router.push(`/ho-so/${comment?.commentedBy?.id}`)}
          >
            {/* @{comment?.commentedBy?.specialName || "Thường dân"} */}
            <Dot size={20} />
            {time ? timeAgo(moment(time).valueOf()) : "Thời gian không hợp lệ"}
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
          <div className="text-sm md:text-base text-wrap break-words whitespace-pre-wrap w-full overflow-y-auto overflow-x-hidden font-thin">{content}</div>
        )}
      </div>
    </div>
  );
};
