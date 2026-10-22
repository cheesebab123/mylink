"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { ThemeType } from "@/types";
import { cn } from "@/lib/utils";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  theme?: ThemeType;
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  theme = "toss",
  className,
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 transition-opacity duration-200 animate-in fade-in",
          theme === "toss" && "bg-black/40 backdrop-blur-[2px]",
          theme === "neobrutalism" && "bg-black/60",
          theme === "glass" && "bg-black/70 backdrop-blur-md"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-md my-auto overflow-hidden p-6 z-10 transition-all duration-200 animate-in zoom-in-95",
          // Toss: 모던 미니멀 라운드 & 소프트 섀도우
          theme === "toss" &&
            "bg-white rounded-3xl border border-[#E5E8EB] shadow-2xl text-[#191F28]",
          // Neobrutalism: 볼드한 보더 & 하드 섀도우
          theme === "neobrutalism" &&
            "bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000] text-black",
          // Dark Glass: 반투명 글래스 & 네온 테두리
          theme === "glass" &&
            "bg-[#131B2A]/90 border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] backdrop-blur-2xl",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4">
          <div className="space-y-1 pr-6">
            {title && (
              <h3
                className={cn(
                  "text-lg font-bold tracking-tight",
                  theme === "toss" && "text-[#191F28]",
                  theme === "neobrutalism" && "font-black text-xl text-black",
                  theme === "glass" && "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className={cn(
                  "text-xs leading-relaxed",
                  theme === "toss" && "text-[#6B7684]",
                  theme === "neobrutalism" && "text-zinc-800 font-medium",
                  theme === "glass" && "text-slate-400"
                )}
              >
                {description}
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer",
              theme === "toss" &&
                "text-[#8B95A1] hover:text-[#191F28] hover:bg-[#F2F4F6] tds-pressable",
              theme === "neobrutalism" &&
                "border-2 border-black bg-[#FEF08A] text-black hover:bg-yellow-300 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
              theme === "glass" &&
                "text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}
