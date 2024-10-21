"use client";
import { ImgSubmitPreview } from "@/components/contest/ImgSubmitPreview";
import classNames from "classnames";
import { ImagePlus } from "lucide-react";
import React, { useState, useEffect } from "react";

type Props = {
  title: string;
  imgArr?: File[];
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string;
  onChange?: (files: File[]) => void;
  onBlur?: () => void;
};


export const InputMulImgUploadContest = ({
  title,
  imgArr = [],
  error,
  onChange,
  onBlur,
  customClassNames,
}: Props) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const MAX_UPLOAD_FILES = parseInt(process.env.MAX_NUMBER_IMG_UPLOAD || "5");

  useEffect(() => {
    const urls = imgArr.map(URL.createObjectURL);
    setFileUrls(urls);
    return () => urls.forEach(URL.revokeObjectURL);
  }, [imgArr]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const validFiles = selectedFiles.filter((file) =>
      ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)
    );

    const updatedFiles = [...imgArr, ...validFiles].slice(0, MAX_UPLOAD_FILES);
    onChange && onChange(updatedFiles);
  };

  const removeImg = (index: number) => {
    const updatedFiles = imgArr.filter((_, i) => i !== index);
    onChange && onChange(updatedFiles);
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
  };

  const handleClick = () => {
    hiddenFileInput.current!.click();
  };

  return (
    <>
      <div className={classNames("flex flex-wrap w-full items-start", customClassNames)}>
        <div className="w-full sm:w-1/5 mb-1">
          <label htmlFor="file_input" className="text-SubheadSm text-primary-950">
            {title}
          </label>
          <p className="text-bodySm text-gray-500">SVG, PNG, JPG</p>
        </div>

        <div className="flex items-center flex-wrap h-16 space-y-2">
          {imgArr.map((file, index) => (
            <ImgSubmitPreview
              src={fileUrls[index]}
              key={file.name + index}
              width={64}
              height={64}
              className="mr-2"
              onRemove={() => removeImg(index)}
            />
          ))}
          {imgArr.length < MAX_UPLOAD_FILES && (
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
                accept="image/png, image/jpeg, image/svg+xml" // Restrict file types
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </div>
          )}
        </div>
      </div>
      {error && <p className="mt-2 self-start text-sm text-red-600">{error}</p>}
      {imgArr.length >= MAX_UPLOAD_FILES && (
        <p className="mt-2 self-start text-sm text-yellow-600">
          Chỉ có thể tải lên tối đa {MAX_UPLOAD_FILES} ảnh.
        </p>
      )}
    </>
  );
};
