"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import classNames from "classnames";
import { ProfileInfoBox } from "./ProfileInfoBox";

type Props = {
  imageUrl: string;
  thumbnailUrl: string;
  userName: string;
  userRank: ReactNode;
  specialName: string;
  createdAt: string;
  likedCount: string;
  commentCount: string;
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
}: Props) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="px-8">
      <div className="flex items-start mt-8 w-full justify-between">
        <ProfileInfoBox
          imageUrl={imageUrl}
          userName={userName}
          userRank={userRank}
          specialName={specialName}
        />
        <div>
          <span className="text-sm text-gray-500">{createdAt}</span>
        </div>
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
          <p className="text-xl font-bold text-gray-800">INTO THE BREACH</p>
          <p className="text-base text-gray-800">
            Dự án mới của mình mọi người ủng hộ nhé!
          </p>
        </div>
        <div className="mt-3 flex gap-x-10">
          <div
            className={classNames(
              "flex items-center gap-x-1 font-bold ",
              liked ? "text-red-500" : "text-gray-500",
            )}
          >
            <button onClick={() => setLiked((prev) => !prev)}>
              <Image
                src="/image/new/selected.png"
                alt="liked"
                width={20}
                height={20}
              />
            </button>
            {/* <Heart size={24}  /> */}
            <span>{likedCount}K</span>
          </div>
          <div className="flex items-center gap-x-1 font-bold text-gray-500">
            <button>
              <MessageCircle size={20} />
            </button>
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
