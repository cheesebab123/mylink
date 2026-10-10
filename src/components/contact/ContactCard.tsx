"use client";

import React, { useState } from "react";
import { ThemeType } from "@/types";
import { Mail, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  email: string;
  theme: ThemeType;
  onCopySuccess?: (msg: string) => void;
}

export function ContactCard({ email, theme, onCopySuccess }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    onCopySuccess?.("email");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section
      className={cn(
        "flex items-center justify-between transition-all",
        // Toss
        theme === "toss" &&
          "bg-white rounded-3xl p-5 border border-[#E5E8EB] tds-shadow-sm",
        // Neobrutalism
        theme === "neobrutalism" &&
          "bg-white rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000]",
        // Glass
        theme === "glass" &&
          "bg-white/[0.05] border border-white/15 backdrop-blur-xl rounded-3xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white"
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center shrink-0 transition-colors",
            theme === "toss" && "rounded-xl bg-[#E8F3FF] text-[#3182F6]",
            theme === "neobrutalism" &&
              "rounded-lg border-2 border-black bg-[#FCA5A5] text-black shadow-[2px_2px_0px_#000]",
            theme === "glass" &&
              "rounded-xl bg-white/10 border border-white/15 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          )}
        >
          <Mail className="w-5 h-5" />
        </div>

        <div className="flex flex-col text-left min-w-0">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              theme === "toss" && "text-[#8B95A1]",
              theme === "neobrutalism" && "text-black font-black",
              theme === "glass" && "text-cyan-400"
            )}
          >
            이메일 문의
          </span>
          <span
            className={cn(
              "text-sm font-semibold truncate",
              theme === "toss" && "text-[#191F28]",
              theme === "neobrutalism" && "text-black font-black",
              theme === "glass" && "text-slate-200"
            )}
          >
            {email}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "px-3.5 py-1.5 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ml-2",
          // Toss
          theme === "toss" &&
            "rounded-xl bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] tds-pressable",
          // Neobrutalism
          theme === "neobrutalism" &&
            "rounded-lg border-2 border-black bg-[#A7F3D0] text-black font-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
          // Glass
          theme === "glass" &&
            "rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-md"
        )}
      >
        {copied ? (
          <>
            <Check
              className={cn(
                "w-3.5 h-3.5",
                theme === "toss" && "text-[#3182F6]",
                theme === "neobrutalism" && "text-black stroke-[3]",
                theme === "glass" && "text-cyan-300"
              )}
            />
            <span
              className={cn(
                theme === "toss" && "text-[#3182F6]",
                theme === "neobrutalism" && "text-black",
                theme === "glass" && "text-cyan-300"
              )}
            >
              복사됨
            </span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>복사</span>
          </>
        )}
      </button>
    </section>
  );
}
