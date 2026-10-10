import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tds-pressable focus:outline-none disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors";

    const variants = {
      primary: "bg-[#3182F6] text-white hover:bg-[#2B72D6]",
      secondary: "bg-[#F2F4F6] text-[#191F28] hover:bg-[#E5E8EB]",
      outline: "border border-[#E5E8EB] bg-white text-[#191F28] hover:bg-[#F9FAFB]",
      ghost: "bg-transparent text-[#3182F6] hover:bg-[#E8F3FF]",
      danger: "bg-[#F04452] text-white hover:bg-[#D93442]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-xl",
      md: "h-10 px-4 text-sm rounded-xl",
      lg: "h-12 px-5 text-base rounded-2xl",
      xl: "h-14 px-6 text-[17px] rounded-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
