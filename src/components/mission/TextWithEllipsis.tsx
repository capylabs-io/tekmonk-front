"use client";
import React from "react";
import { cn } from "@/lib/utils";

type TextWithEllipsisProps = {
  text: string;
  maxLines: number;
  secondText?: string;
};

export const TextWithEllipsis = ({
  text,
  maxLines,
  secondText,
}: TextWithEllipsisProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis whitespace-pre-line",
        maxLines ? `line-clamp-${maxLines}` : ""
      )}
    >
      {text.split(" ").length > 11
        ? `${text.split(" ").slice(0, 11).join(" ")}...`
        : text}{" "}
      {secondText && <span className="text-gray-500"> ({secondText})</span>}
    </div>
  );
};

export default TextWithEllipsis;
