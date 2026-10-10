import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#4E5968]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-[#E5E8EB] bg-[#F2F4F6] px-4 py-2 text-[15px] text-[#191F28] placeholder:text-[#8B95A1] transition-all focus:bg-white focus:border-[#3182F6] focus:border-[1.5px] focus:outline-none disabled:cursor-not-allowed disabled:opacity-30",
            error && "border-[#F04452] bg-red-50/50 focus:border-[#F04452]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#F04452] font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
