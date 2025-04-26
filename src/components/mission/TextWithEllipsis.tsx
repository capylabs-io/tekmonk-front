"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TextWithEllipsisProps = {
  text: string;
  maxLines: number;
  secondText?: string;
};

/**
 * Truncate text to a max character count, appending secondText if provided.
 * Ensures secondText fits within the visible clamped area.
 */
function truncateCharsWithSecond(
  text: string,
  maxChars: number,
  secondText?: string
): React.ReactNode {
  const hasSecond = Boolean(secondText);

  // Reserve some characters if secondText exists
  const reservedChars = hasSecond ? maxChars - 10 : maxChars;
  const isTruncated = text.length > reservedChars;
  const main = isTruncated ? text.substring(0, reservedChars) : text;
  const dots = isTruncated ? "..." : "";

  return (
    <>
      {main}
      {dots}
      {secondText && <span className="text-gray-500"> ({secondText})</span>}
    </>
  );
}

export const TextWithEllipsis = ({
  text,
  maxLines,
  secondText,
}: TextWithEllipsisProps) => {
  const lineClampClass =
    {
      1: "line-clamp-1",
      2: "line-clamp-2",
      3: "line-clamp-3",
      4: "line-clamp-4",
      5: "line-clamp-5",
    }[maxLines] ?? "";

  return (
    <div
      className={cn(
        "overflow-hidden text-ellipsis whitespace-pre-line",
        lineClampClass
      )}
    >
      {truncateCharsWithSecond(text, 45, secondText)}
    </div>
  );
};

export default TextWithEllipsis;
