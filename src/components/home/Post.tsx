"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import classNames from "classnames";
import { ProfileInfoBox } from "./ProfileInfoBox";
import { PostType, PostVerificationType } from "@/types";
import { CommonButton } from "../common/button/CommonButton";
import { useLoadingStore } from "@/store/LoadingStore";
import { likePost, updatePost } from "@/requests/post";
import { get } from "lodash";

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
  isVerified?: boolean,
  showButton?: boolean,
  hideSocial?: boolean,
  onVerifiedPost?: (data: PostType) => void
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
  onVerifiedPost,
}: Props) => {
  const [liked, setLiked] = useState(false);
  const handleOnClick = (value: any) => {
    onVerifiedPost?.(value)
  } 
  const [showLoading, hideLoading] = useLoadingStore((state) => [state.show, state.hide])
  const handleLikedPostClick = async () => {
    setLiked((prev) => !prev)
    try {
      showLoading()
      const resLike = await likePost({
        postId: get(data, 'id')
      })
      if (resLike) {
        await updatePost(
          get(data, 'id', 0)
          , {
            likedCount: liked ? get(data, 'likeCount', 0) + 1 : get(data, 'likeCount', 0) > 0 ? get(data, 'likeCount', 0) - 1 : 0
          })
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      hideLoading()
    }
  }
  return (
    <div className={classNames("px-8 relative", customClassname)}>
      {
        showButton &&
        <div className="flex gap-2 absolute top-0 right-8">
          <CommonButton variant="primary" onClick={() => handleOnClick(
            {
              ...data,
              isVerified: PostVerificationType.ACCEPTED
            }
          )}>
            Chấp thuận
          </CommonButton>
          <CommonButton variant="secondary" onClick={() => handleOnClick({
            ...data,
            isVerified: PostVerificationType.DENIED
          })}>
            Từ chối
          </CommonButton>
        </div>
      }
      <div className="flex items-start mt-8 w-full justify-between">
        <ProfileInfoBox
          imageUrl={imageUrl}
          userName={userName}
          userRank={userRank}
          specialName={specialName}
        />
        {
          isVerified ?
            <div>

            </div>
            : <div>
              <span className="text-sm text-gray-500">{createdAt}</span>
            </div>
        }

      </div>
      <div className="pl-10 mt-3">
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          height={340}
          width={604}
          className="rounded-xl w-full"
        />
        {/* <div className="bg-[url('/image/new/new-pic.png')] bg-no-repeat bg-cover h-[340px] rounded-xl" /> */}
        <div className="mt-3">
          <p className="text-xl font-bold text-gray-800">{postName}</p>
          <div
            className="text-base text-gray-800"
            dangerouslySetInnerHTML={{
              __html: postContent || ''
            }}
          ></div>
        </div>
        {
          !hideSocial &&
          <div className="mt-3 flex gap-x-10">
            <div
              className={classNames(
                "flex items-center gap-x-1 font-bold "
              )}
            >
              <button onClick={handleLikedPostClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={liked ? '#ef4444' : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className={classNames('cursor-pointer', liked ? "text-red-500" : "")}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              </button>
              {/* <Heart size={24} /> */}
              <span>{likedCount}</span>
            </div>
            <div className="flex items-center gap-x-1 font-bold text-gray-500">
              <button>
                <MessageCircle size={20} />
              </button>
              <span>{commentCount}</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
