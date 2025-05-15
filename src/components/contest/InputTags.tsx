"use client";

import { type KeyboardEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { TooltipProvider } from "../ui/tooltip";
import classNames from "classnames";

type Props = {
  customClassNames?: string;
  customInputClassNames?: string;
  error?: string; // Added error prop
  placeholder?: string;
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const InputTags = ({
  error,
  name = "",
  customClassNames,
  placeholder,
  customInputClassNames,
  value,
  onValueChange,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Initialize tags from the value prop
    if (value) {
      const initialTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setTags(initialTags);
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      e.stopPropagation();
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue("");
        onValueChange && onValueChange(newTags.join(", "));
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onValueChange && onValueChange(newTags.join(", "));
  };

  return (
    <TooltipProvider>
      <div className="space-y-1.5 w-full">
        <div className="relative block sm:flex justify-between  w-full items-start">
          <div className="w-full flex flex-col items-end gap-2">
            <div
              className={classNames(
                "min-h-[3rem] w-full rounded-xl border border-grey-300 bg-grey-50 px-3 py-2 text-sm",
                customClassNames
              )}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={classNames(
                  "flex-1 bg-transparent min-w-[120px] w-full text-BodyMd outline-none bg-grey-50 border-grey-300 mt-1 placeholder:text-gray-70 placeholder:text-BodyMd",
                  customInputClassNames
                )}
                placeholder="Nhập tags ..."
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gray-20 text-gray-95 rounded-md text-BodyXs"
                >
                  <span className="px-2 py-1">{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="px-2 py-1 rounded-r-md border-l border-gray-200 transition-colors"
                  >
                    <X className="h-3 w-3 hover:text-primary-20" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </div>
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-xs min-h-[48px]">{error}</div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
