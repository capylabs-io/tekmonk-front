import React, { forwardRef } from "react";
import { TextArea } from "@/components/common/TextArea";
import { Controller } from "react-hook-form"; // Import Controller from react-hook-form
import { Input } from "@/components/contest/Input";

type Props = {
  title: string;
  value?: string;
  type: "text" | "text-area";
  customInputClassNames?: string;
  customClassNames?: string;
  error?: string; // Added error prop
  placeholder?: string;
  name?: string;
  isSearch?: boolean;
  control?: any; // Added control prop for react-hook-form
};

export const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      title,
      value,
      error, // Added error handling
      type = "text",
      control, // Use control from react-hook-form
      placeholder,
      name = "",
      isSearch = false,
      customInputClassNames,
      customClassNames,
    },
    ref // Forwarded ref
  ) => {
    return (
      <div
        className={`flex flex-wrap sm:flex-nowrap items-center ${customClassNames}`}
      >
        <label htmlFor={name} className="text-SubheadSm text-primary-950 w-1/4">
          {title}
        </label>
        <div className="flex flex-col w-full">
          {control ? ( // If control is passed, use Controller
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                type === "text-area" ? (
                  <TextArea
                    {...field}
                    placeholder={placeholder}
                    customInputClassName={`w-full ${customInputClassNames}`}
                    ref={ref}
                  />
                ) : (
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    customInputClassNames={`${customInputClassNames}`}
                    customClassNames={`h-10 flex items-center text-bodyXs ${customInputClassNames}`}
                  />
                )
              }
            />
          ) : type === "text-area" ? (
            <TextArea
              value={value}
              onChange={() => {}} // Handle value change as needed
              placeholder={placeholder}
              customInputClassName={`w-full ${customInputClassNames}`}
              ref={ref}
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
