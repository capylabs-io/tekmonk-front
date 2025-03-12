import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Dot,
  Heart,
  MessageCircle,
  Repeat2,
  Upload,
} from "lucide-react";
import { get } from "lodash";
import { timeAgo } from "@/lib/utils";

type Props = {
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
};

export const CommentCard = ({
  isVerified,
  imageUrl,
  username,
  name,
  content,
  time,
  interact,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start gap-3">
      <div
        className={`h-[40px] w-[40px] flex-shrink-0 rounded-full border bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(/image/home/profile-pic.png)` }}
      ></div>
      <div className="w-full flex-1 space-y-0.5">
        <div className="text-black flex items-center gap-1 text-base font-medium">
          <div>{name}</div>
          <div className="inline-flex items-center gap-1 text-sm text-grey-500">
            @{username}
            <Dot size={20} />
            {time ? timeAgo(Number(time)) : "Invalid time"}
          </div>
        </div>
        <p className="text-sm md:text-base">{content}</p>
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
