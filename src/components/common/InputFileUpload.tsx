"use client";
import classNames from "classnames";
import { Eye, EyeOff, ImagePlus } from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";

type Props = {
  value?: string;
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
const BASE_CLASS =
  "w-full rounded-xl border border-grey-300 bg-grey-50 p-3 min-h-[64px] flex flex-col items-center justify-center relative text-sm";
export const InputFileUpdload = ({
  value,
  error,
  onChange,
  onBlur,
  customInputClassNames,
  customClassNames,
}: Props) => {
  const [showPassword, setshowPassword] = useState(false);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange && onChange(newVal);
  };
  const handleOnBlur = () => {
    onBlur && onBlur();
  };
  const handleClick = () => {
    hiddenFileInput.current!.click();
  };
  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };
  return (
    <>
      <div
        className={classNames(
          "flex w-full items-center text-base font-bold gap-x-4",
          customClassNames,
        )}
      >
        <div
          className="rounded-full p-8 flex items-center justify-center relative bg-primary-50"
          onClick={handleClick}
        >
          <ImagePlus size={24} className="absolute text-gray-500" />
        </div>
        <div
          className={classNames(
            BASE_CLASS,
            error &&
              "border-red-500 focus:border-red-500 text-sm focus:border-2",
            value &&
              !error &&
              "border-green-400 focus:border-green-400 focus:border-2",
          )}
        >
          <input
            type="file"
            lang="en-US"
            className="outline-none w-full grow bg-transparent opacity-0"
            value={value}
            ref={hiddenFileInput}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />

          <div
            className="absolute text-gray-400 text-center font-normal"
            onClick={handleClick}
          >
            <p>
              {" "}
              <span className="text-primary-700">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, PNG, JPG or GIF (max 400x400px)</p>
          </div>
        </div>
      </div>
      {error && <p className="mt-2 self-start text-sm text-red-600">{error}</p>}
    </>
  );
};
