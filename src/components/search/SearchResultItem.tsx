"use client";

import Image from "next/image";
import { FileText, User } from "lucide-react";
import classNames from "classnames";
import { FaHashtag } from "react-icons/fa6";
import { VscProject } from "react-icons/vsc";
import moment from "moment";
import { CommonTag } from "../common/CommonTag";
import { SplitRenderItem } from "../common/SplitRenderItem";
import { ROUTE } from "@/contants/router";
import { useCustomRouter } from "../common/router/CustomRouter";

export type SearchResultType = "post" | "people" | "project" | "hashtag";

export interface SearchResultItemProps {
  id: string;
  type: SearchResultType;
  title: string;
  imageUrl?: string;
  date?: string;
  authorName?: string;
  authorAvatar?: string;
  className?: string;
  tags?: string;
}

const TYPE_LABELS: Record<SearchResultType, string> = {
  post: "Bài viết",
  people: "Người dùng",
  hashtag: "Hashtag",
  project: "Dự án",
};

export const SearchResultItem = ({
  id,
  type,
  title,
  imageUrl,
  date,
  authorName,
  authorAvatar,
  className,
  tags = "",
}: SearchResultItemProps) => {
  const router = useCustomRouter();
  const renderIcon = () => {
    switch (type) {
      case "post":
        return <FileText className="h-5 w-5 text-primary-60" />;
      case "people":
        return <User className="h-5 w-5 text-primary-60" />;
      case "hashtag":
        return <FaHashtag className="h-5 w-5 text-primary-60" />;
      case "project":
        return <VscProject className="h-5 w-5 text-primary-60" />;
      default:
        return <FileText className="h-5 w-5 text-primary-60" />;
    }
  };

  const tagList = tags
    ? tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const tagElements = tagList.map((tag, index) => (
    <CommonTag key={`tag-${index}`}>
      <div className="flex items-center gap-1">
        <FaHashtag className="h-3 w-3" />
        <span>{tag}</span>
      </div>
    </CommonTag>
  ));
  const handleRedirect = (id: number) => {
    if (type == "people") {
      router.push(`${ROUTE.PROFILE}/${id}`);
      return;
    }
    router.push(`${ROUTE.POST}/${id}`);
  };
  return (
    <div
      className={classNames(
        "flex gap-4 p-4 mt-4 rounded-lg border border-gray-20 hover:bg-gray-05 cursor-pointer transition-colors",
        className
      )}
      onClick={() => handleRedirect(Number(id))}
    >
      <div className="flex-shrink-0 items-center justify-center">
        {imageUrl ? (
          <div className="my-auto">
            <Image
              src={imageUrl}
              alt={title}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 bg-primary-10 rounded-full flex items-center justify-center">
            {renderIcon()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            {renderIcon()}
            <span className="text-xs text-gray-50">
              {TYPE_LABELS[type] || TYPE_LABELS.post}
            </span>
          </div>
          {date && (
            <span className="text-xs text-gray-50">
              {moment(date).format("DD/MM/YYYY")}
            </span>
          )}
        </div>

        <h3 className="text-gray-90 font-medium text-lg truncate">{title}</h3>

        {authorName && (
          <div className="flex items-center mt-2 gap-2">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={authorName}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <div className="w-5 h-5 bg-primary-20 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-primary-60" />
              </div>
            )}
            <span className="text-xs text-gray-60">{authorName}</span>

            {tagList.length > 0 && (
              <SplitRenderItem
                items={tagElements}
                maxVisible={2}
                className=""
                remainingItemsClassName="text-xs text-gray-50 bg-gray-20 rounded-[4px] h-6 px-2 flex items-center"
                tooltipContentClassName="bg-gray-20 rounded-[4px] h-6 px-2 flex items-center"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
