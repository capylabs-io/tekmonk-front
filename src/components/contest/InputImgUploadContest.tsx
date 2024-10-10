"use client";
import { ImgSubmitPreview } from "@/components/contest/ImgSubmitPreview";
import classNames from "classnames";
import { ImagePlus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  title: string;
  imgArr?: string[]; // Change from [string] to string[] to handle multiple images
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string;
  onChange?: (files: File[]) => void; // Accept File array instead of string
  onBlur?: () => void;
};

const BASE_CLASS =
  "w-full rounded-xl border border-grey-300 bg-grey-50 p-3 min-h-[64px] flex flex-col items-center justify-center relative text-sm";

export const InputImgUploadContest = ({
  title,
  imgArr,
  error,
  onChange,
  onBlur,
  customClassNames,
}: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    // check file is img
    const validFiles = selectedFiles.filter((file) =>
      ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)
    );

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onChange && onChange([...files, ...selectedFiles]); // Pass the updated files
  };

  const removeImg = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index); // Filter by index
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles); // Pass updated files array to onChange callback
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
  };

  const handleClick = () => {
    hiddenFileInput.current!.click();
  };

  // Generate preview URLs
  const urls =
    files.length > 0
      ? files.map((file) => URL.createObjectURL(file))
      : imgArr || [];

  return (
    <>
      <div className={classNames("flex w-full items-start", customClassNames)}>
        <div className="w-1/5">
          <label
            htmlFor="file_input"
            className="text-SubheadSm text-primary-950"
          >
            {title}
          </label>
          <p className="text-bodySm text-gray-500">SVG, PNG, JPG</p>
        </div>

        <div className="flex items-center flex-wrap space-y-2">
          {/* Render either existing images or newly selected files */}
          {urls.map((src, index) => (
            <ImgSubmitPreview
              imgSrc={src}
              key={index}
              width={64}
              height={64}
              className="mr-2"
              onRemove={() => removeImg(index)} // Pass the index for removal
            />
          ))}

          {/* File Upload Box */}
          <div
            className="rounded-lg p-8 flex items-center justify-center relative bg-primary-50 cursor-pointer"
            onClick={handleClick}
          >
            <ImagePlus size={24} className="absolute text-gray-500" />
            <input
              type="file"
              multiple
              name="file_input"
              className="outline-none w-full grow bg-transparent opacity-0 hidden"
              ref={hiddenFileInput}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
            />
          </div>
        </div>
      </div>
      {error && <p className="mt-2 self-start text-sm text-red-600">{error}</p>}
    </>
  );
};
