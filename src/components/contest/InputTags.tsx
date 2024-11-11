"use client";

import { useState, KeyboardEvent, useEffect } from "react";
import { X } from "lucide-react";
import { Controller } from "react-hook-form";
type Props = {
  customClassNames?: string;
  error?: string; // Added error prop
  placeholder?: string;
  name?: string;
  isRequired?: boolean;
  isTooltip?: boolean;
  tooltipContent?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};
export const InputTags = ({
  error, // Added error handling
  placeholder,
  isRequired,
  name = "",
  customClassNames,
  isTooltip = false,
  tooltipContent,
  value,
  onValueChange,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);

        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  useEffect(() => {
    handleOnChange();
  }, [tags]);

  const handleOnChange = () => {
    // tách bởi dấu phấy và dấu cách
    const tagsString = tags.join(", ");
    onValueChange && onValueChange(tagsString);
  };
  return (
    <div className="space-y-1.5 w-full">
      <div className="relative flex w-full">
        <div className="w-[25%]">Tags</div>
        <div className="w-full">
          <div className="min-h-[2.5rem] w-full rounded-md border border-input bg-white px-3 py-2 text-sm">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center bg-gray-100 text-gray-800 rounded-md text-sm"
                >
                  <span className="px-2 py-1">{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="px-2 py-1 hover:bg-gray-200 rounded-r-md border-l border-gray-200 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none min-w-[120px] w-full"
                placeholder={tags.length === 0 ? "Nhập tag..." : ""}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-xs min-h-[48px]">{error}</div>}
        </div>
      </div>
    </div>
  );
};
