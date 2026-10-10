"use client";

import React from "react";
import { ThemeType } from "@/types";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string | null;
  theme: ThemeType;
}

export function Toast({ message, theme }: ToastProps) {
  if (!message) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 transition-all animate-in fade-in zoom-in-95 duration-150 whitespace-nowrap",
        // Toss
        theme === "toss" &&
          "rounded-2xl bg-[#191F28] text-white text-sm font-semibold tds-shadow-toast",
        // Neobrutalism
        theme === "neobrutalism" &&
          "rounded-xl bg-[#A7F3D0] text-black border-2 border-black text-sm font-black shadow-[4px_4px_0px_#000]",
        // Glass
        theme === "glass" &&
          "rounded-2xl bg-[#0F172A]/90 text-cyan-300 border border-cyan-400/50 text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl"
      )}
    >
      <div
        className={cn(
          "w-5 h-5 flex items-center justify-center shrink-0",
          theme === "toss" && "rounded-full bg-[#22C55E] text-white",
          theme === "neobrutalism" &&
            "rounded-md border-2 border-black bg-black text-white",
          theme === "glass" &&
            "rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
        )}
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <span>{message}</span>
    </aside>
  );
}
