"use client";

import React from "react";
import { LinkItem, ThemeType } from "@/types";
import { ChevronRight, Eye } from "lucide-react";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  link: LinkItem;
  theme: ThemeType;
  onLinkClick?: (id: string) => void;
}

export function LinkCard({ link, theme, onLinkClick }: LinkCardProps) {
  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(
        "group flex items-center justify-between transition-all cursor-pointer",
        // Toss Theme
        theme === "toss" &&
          "p-3.5 rounded-2xl hover:bg-[#F9FAFB] tds-pressable",
        // Neobrutalism Theme
        theme === "neobrutalism" &&
          "p-4 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        // Glass Theme
        theme === "glass" &&
          "p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all"
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* 아이콘 컨테이너 */}
        <div
          className={cn(
            "w-11 h-11 flex items-center justify-center shrink-0 transition-colors",
            theme === "toss" &&
              "rounded-2xl bg-[#F2F4F6] text-[#333D4B] group-hover:bg-[#E8F3FF] group-hover:text-[#3182F6]",
            theme === "neobrutalism" &&
              "rounded-lg border-2 border-black bg-[#BAE6FD] text-black shadow-[2px_2px_0px_#000] group-hover:bg-[#7DD3FC]",
            theme === "glass" &&
              "rounded-xl bg-white/10 border border-white/15 text-cyan-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          )}
        >
          <DynamicIcon name={link.icon} className="w-5 h-5" />
        </div>

        {/* 텍스트 내용 */}
        <div className="flex flex-col min-w-0 text-left">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-[15px] truncate transition-colors",
                theme === "toss" &&
                  "font-semibold text-[#191F28] group-hover:text-[#3182F6]",
                theme === "neobrutalism" &&
                  "font-black text-black group-hover:text-blue-600",
                theme === "glass" &&
                  "font-semibold text-white group-hover:text-cyan-300"
              )}
            >
              {link.title}
            </span>

            {link.badge && (
              <span
                className={cn(
                  "text-[11px] px-2 py-0.5 transition-all shrink-0",
                  theme === "toss" &&
                    "font-medium rounded-md bg-[#F2F4F6] text-[#6B7684]",
                  theme === "neobrutalism" &&
                    "font-black rounded-md border-2 border-black bg-[#FDE047] text-black shadow-[1px_1px_0px_#000]",
                  theme === "glass" &&
                    "font-medium rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                )}
              >
                {link.badge}
              </span>
            )}
          </div>

          {link.description && (
            <span
              className={cn(
                "text-xs truncate mt-0.5 transition-colors",
                theme === "toss" && "text-[#8B95A1]",
                theme === "neobrutalism" && "text-zinc-700 font-bold",
                theme === "glass" && "text-slate-400"
              )}
            >
              {link.description}
            </span>
          )}
        </div>
      </div>

      {/* 우측 클릭수 & 화살표 */}
      <div className="flex items-center gap-2.5 shrink-0 ml-2">
        {typeof link.clicks === "number" && (
          <div
            className={cn(
              "flex items-center gap-1 text-[11px] font-medium transition-colors",
              theme === "toss" && "text-[#8B95A1]",
              theme === "neobrutalism" &&
                "text-black font-black border border-black bg-zinc-100 px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#000]",
              theme === "glass" && "text-slate-400"
            )}
            title={`클릭수: ${link.clicks}회`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{link.clicks}</span>
          </div>
        )}

        <ChevronRight
          className={cn(
            "w-5 h-5 transition-transform group-hover:translate-x-0.5",
            theme === "toss" && "text-[#B0B8C1] group-hover:text-[#4E5968]",
            theme === "neobrutalism" && "text-black stroke-[2.5]",
            theme === "glass" && "text-slate-500 group-hover:text-cyan-300"
          )}
        />
      </div>
    </a>
  );
}
