"use client";

import React from "react";
import { ThemeType } from "@/types";
import { Sparkles, Box, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const themes: { id: ThemeType; label: string; icon: React.ReactNode }[] = [
    {
      id: "toss",
      label: "토스",
      icon: <span className="font-bold text-xs text-[#3182F6]">TDS</span>,
    },
    {
      id: "neobrutalism",
      label: "네오",
      icon: <Box className="w-3.5 h-3.5" />,
    },
    {
      id: "glass",
      label: "글래스",
      icon: <Moon className="w-3.5 h-3.5 text-cyan-400" />,
    },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-2xl transition-all",
        currentTheme === "toss" && "bg-[#F2F4F6] border border-[#E5E8EB]",
        currentTheme === "neobrutalism" && "bg-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-xl",
        currentTheme === "glass" && "bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      )}
    >
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onThemeChange(t.id)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-xl transition-all cursor-pointer",
              // Toss Theme Styles
              currentTheme === "toss" &&
                (isActive
                  ? "bg-white text-[#191F28] shadow-sm font-bold"
                  : "text-[#6B7684] hover:text-[#191F28] hover:bg-white/50"),
              // Neobrutalism Theme Styles
              currentTheme === "neobrutalism" &&
                (isActive
                  ? "bg-[#FEF08A] text-black border-2 border-black font-black shadow-[1px_1px_0px_#000] rounded-lg -translate-y-0.5"
                  : "text-zinc-800 hover:text-black font-bold border-2 border-transparent"),
              // Glass Theme Styles
              currentTheme === "glass" &&
                (isActive
                  ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.4)] font-bold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent")
            )}
            title={`${t.label} 테마로 변경`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
