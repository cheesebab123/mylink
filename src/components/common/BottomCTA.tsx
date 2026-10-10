"use client";

import React from "react";
import { ThemeType } from "@/types";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomCTAProps {
  email: string;
  theme: ThemeType;
}

export function BottomCTA({ email, theme }: BottomCTAProps) {
  return (
    <aside
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4 pt-3 pointer-events-none transition-all",
        theme === "toss" &&
          "bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/90 to-transparent",
        theme === "neobrutalism" &&
          "bg-gradient-to-t from-[#FEF08A] via-[#FEF08A]/90 to-transparent",
        theme === "glass" &&
          "bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/90 to-transparent"
      )}
    >
      <div className="w-full max-w-[440px] pointer-events-auto">
        <a
          href={`mailto:${email}`}
          className={cn(
            "w-full h-14 flex items-center justify-center gap-2 cursor-pointer transition-all",
            // Toss
            theme === "toss" &&
              "rounded-2xl bg-[#3182F6] hover:bg-[#2B72D6] text-white font-bold text-[17px] shadow-sm tds-pressable",
            // Neobrutalism
            theme === "neobrutalism" &&
              "rounded-xl border-2 border-black bg-[#F43F5E] hover:bg-[#E11D48] text-white font-black text-lg shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
            // Glass
            theme === "glass" &&
              "rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-[17px] shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-cyan-400/30 backdrop-blur-md"
          )}
        >
          <Mail className="w-5 h-5" />
          <span>이메일 보내기</span>
        </a>
      </div>
    </aside>
  );
}
