import React, { forwardRef, useMemo } from "react";
import { TextArea } from "@/components/common/TextArea";
import { Controller } from "react-hook-form";
import { Input } from "@/components/contest/Input";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

type Props = {
  title: string;
  value?: string;
  type: "text" | "text-area";
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string; // Added error prop
  placeholder?: string;
  name?: string;
  control?: any; // Added control prop for react-hook-form
  isRequired?: boolean;
};

export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>(
  (
    {
      title,
      value,
      error, // Added error handling
      type = "text",
      control, // Use control from react-hook-form
      placeholder,
      isRequired,
      name = "",
      customInputClassNames,
      customClassNames,
    },
    ref // Forwarded ref
  ) => {
    const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
    );
    
    return (
      <div
        className={`flex flex-wrap sm:flex-nowrap items-center ${customClassNames}`}
      >
        <label htmlFor={name} className="text-SubheadSm text-primary-950 w-1/4">
          {title}
          <span className="text-red-500">{isRequired ? " *" : ""}</span>
        </label>
        <div className="flex flex-col w-full max-w-[500px] rounded-xl overflow-hidden">
          {control ? ( // If control is passed, use Controller
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                type === "text-area" ? (
                  <ReactQuill
                    theme="snow"
                    value={field.value || value || ""}
                    className="w-full rounded-xl border border-grey-300 bg-grey-50 outline-none !text-bodyXs min-h-[100px]"
                    onChange={field.onChange}
                    placeholder={placeholder}
                  />
                ) : (
                  <Input
                    {...field}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    customInputClassNames={`${customInputClassNames}`}
                    customClassNames={`h-10 flex items-center text-bodyXs ${customInputClassNames}`}
                  />
                )
              }
            />
          ) : type === "text-area" ? (
            <ReactQuill
              theme="snow"
              
              className="w-full rounded-xl bg-grey-50 outline-none !text-bodyXs min-h-[200px] transition-all ease-linear"
              value={value}
              onChange={() => {}} // Handle value change as needed
              placeholder={placeholder}
            />
          ) : (
            <Input
              value={value}
              type={type}
              placeholder={placeholder}
              customInputClassNames={`${customInputClassNames}`}
              customClassNames={`h-10 flex items-center text-bodyXs ${customInputClassNames}`}
            />
          )}
          {/* Display error message */}
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      </div>
    );
  }
);

// Add displayName for better debugging in React DevTools
InputField.displayName = "InputField";
