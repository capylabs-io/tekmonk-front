import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { localKanitFont } from "@/fonts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  outlined?: boolean;
  childrenClassName?: string;
  wrapperClassName?: string;
}

export const CommonButton = ({
  className,
  childrenClassName,
  wrapperClassName,
  variant = "primary",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <div
      className={cn(
        "px-4 py-2 rounded-lg duration-200 cursor-pointer text-SubheadSm",
        "text-center flex items-center justify-center",
        {
          " border-[1px] bg-[#BC4CAC] hover:bg-primary-70 text-white border-primary-70 shadow-custom-primary":
            variant === "primary" && !disabled,
          " border-[2px] bg-gray-00 hover:bg-gray-10 active:bg-gray-20 text-primary-95 border-gray-20 shadow-custom-gray":
            variant === "secondary" && !disabled,
          "opacity-50 cursor-not-allowed": disabled,
        },
        wrapperClassName
      )}
    >
      <button
        className={cn(
          childrenClassName,
          localKanitFont.className,
          {
            "text-white": variant === "primary",
            "text-primary-95": variant === "secondary",
          },
          "!cursor-pointer w-full h-full flex items-center justify-center",
          { "cursor-not-allowed": disabled }
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
