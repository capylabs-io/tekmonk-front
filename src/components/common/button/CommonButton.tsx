import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { localKanitFont } from "@/fonts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  outlined?: boolean;
  children: React.ReactNode;
}

export const CommonButton = ({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "w-full h text-lg font-medium rounded-lg duration-200",
        "text-center flex items-center justify-center",
        {
          " border-[1px] bg-[#BC4CAC] hover:bg-primary-70 text-white border-primary-70 shadow-custom-primary":
            variant === "primary",
          " border-[2px] bg-gray-00 hover:bg-gray-10 active:bg-gray-20 text-primary-95 border-gray-20 shadow-custom-gray":
            variant === "secondary",
        },
        localKanitFont.className,
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
