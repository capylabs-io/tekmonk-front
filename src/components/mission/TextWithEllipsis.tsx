"use client";
import React from "react";
import { cn } from "@/lib/utils";

type TextWithEllipsisProps = {
  text: string;
  maxLines: number;
};

export const TextWithEllipsis = ({ text, maxLines }: TextWithEllipsisProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis whitespace-pre-line",
        maxLines ? `line-clamp-${maxLines}` : ""
      )}
    >
      {text}
    </div>
  );
};

export default TextWithEllipsis;
