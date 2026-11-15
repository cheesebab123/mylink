"use client";

import React, { useState, useEffect } from "react";
import { ThemeType } from "@/types";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  avatarUrl?: string;
  avatarText?: string;
  name: string;
  theme: ThemeType;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export function ProfileAvatar({
  avatarUrl,
  avatarText,
  name,
  theme,
  size = "lg",
  className,
}: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [avatarUrl]);

  const sizeClass =
    size === "md"
      ? "w-12 h-12 text-lg"
      : size === "xl"
        ? "w-16 h-16 text-3xl"
        : "w-14 h-14 text-2xl";

  const showImage = Boolean(avatarUrl && !imgError);

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 overflow-hidden transition-all select-none",
        sizeClass,
        theme === "toss" &&
          "rounded-2xl bg-[#E8F3FF] text-[#3182F6] font-bold",
        theme === "neobrutalism" &&
          "rounded-xl border-2 border-black bg-[#F43F5E] text-white font-black shadow-[3px_3px_0px_#000]",
        theme === "glass" &&
          "rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)] border border-cyan-400/40",
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name || "프로필 사진"}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{avatarText || name?.charAt(0) || "최"}</span>
      )}
    </div>
  );
}
