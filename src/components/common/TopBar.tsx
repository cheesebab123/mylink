"use client";

import React from "react";
import { ThemeType } from "@/types";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Share2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onShare: () => void;
}

export function TopBar({ theme, onThemeChange, onShare }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between gap-2">
      {/* 로고 & 타이틀 */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-8 h-8 flex items-center justify-center font-bold text-sm transition-all",
            theme === "toss" && "rounded-xl bg-[#3182F6] text-white",
            theme === "neobrutalism" &&
              "rounded-lg border-2 border-black bg-[#FEF08A] text-black shadow-[2px_2px_0px_#000] font-black",
            theme === "glass" &&
              "rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] backdrop-blur-md"
          )}
        >
          <Link2 className="w-4 h-4" />
        </div>
        <span
          className={cn(
            "tracking-tight transition-colors",
            theme === "toss" && "font-bold text-lg text-[#191F28]",
            theme === "neobrutalism" && "font-black text-xl text-black",
            theme === "glass" && "font-bold text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          )}
        >
          myLink
        </span>
      </div>

      {/* 테마 스위처 & 공유 버튼 */}
      <div className="flex items-center gap-2">
        <ThemeSwitcher currentTheme={theme} onThemeChange={onThemeChange} />

        <button
          type="button"
          onClick={onShare}
          aria-label="링크 공유하기"
          title="프로필 링크 공유하기"
          className={cn(
            "w-9 h-9 flex items-center justify-center transition-all cursor-pointer",
            // Toss
            theme === "toss" &&
              "rounded-full text-[#4E5968] hover:bg-[#F2F4F6] tds-pressable",
            // Neobrutalism
            theme === "neobrutalism" &&
              "rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
            // Glass
            theme === "glass" &&
              "rounded-xl bg-white/10 border border-white/20 text-slate-300 hover:text-white hover:bg-white/20 shadow-[0_0_10px_rgba(0,0,0,0.3)] backdrop-blur-md"
          )}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
