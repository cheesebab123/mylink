"use client";

import React from "react";
import { LinkItem, ThemeType } from "@/types";
import { LinkCard } from "./LinkCard";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkListProps {
  links: LinkItem[];
  theme: ThemeType;
  onLinkClick?: (id: string) => void;
  onAddLink?: () => void;
}

export function LinkList({ links, theme, onLinkClick, onAddLink }: LinkListProps) {
  const activeLinks = links
    .filter((link) => link.isActive !== false)
    .sort((a, b) => a.order - b.order);

  if (activeLinks.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center transition-all",
          theme === "toss" &&
            "bg-white rounded-3xl border border-[#E5E8EB] text-[#8B95A1]",
          theme === "neobrutalism" &&
            "bg-white rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] text-black font-bold",
          theme === "glass" &&
            "bg-white/[0.05] rounded-3xl border border-white/10 text-slate-400 backdrop-blur-md"
        )}
      >
        <p className="text-sm mb-3">등록된 링크가 없습니다.</p>
        {onAddLink && (
          <button
            type="button"
            onClick={onAddLink}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer",
              theme === "toss" && "bg-[#3182F6] text-white hover:bg-[#2B72D6] tds-pressable",
              theme === "neobrutalism" &&
                "bg-[#FEF08A] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black",
              theme === "glass" && "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30"
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>첫 링크 추가하기</span>
          </button>
        )}
      </div>
    );
  }

  // Toss 테마: TDS ListRow 카드 컨테이너 내부 렌더링
  if (theme === "toss") {
    return (
      <section className="bg-white rounded-3xl p-2 border border-[#E5E8EB] tds-shadow-sm flex flex-col transition-all">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#8B95A1] uppercase tracking-wider">
            링크 모음
          </h2>
          {onAddLink && (
            <button
              type="button"
              onClick={onAddLink}
              className="flex items-center gap-1 text-xs font-semibold text-[#3182F6] hover:text-[#2B72D6] px-2 py-1 rounded-lg hover:bg-[#E8F3FF] transition-all cursor-pointer tds-pressable"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>링크 추가</span>
            </button>
          )}
        </div>
        <div className="flex flex-col">
          {activeLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              theme={theme}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      </section>
    );
  }

  // Neobrutalism 테마: 독립된 스택 카드 형태
  if (theme === "neobrutalism") {
    return (
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-black bg-[#FEF08A] px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_#000] rounded">
            LINKS
          </h2>
          {onAddLink && (
            <button
              type="button"
              onClick={onAddLink}
              className="flex items-center gap-1 text-xs font-black text-black bg-white px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FEF08A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ 추가</span>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {activeLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              theme={theme}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      </section>
    );
  }

  // Dark Glass 테마: 반투명 글래스 컨테이너
  return (
    <section className="bg-white/[0.05] border border-white/15 backdrop-blur-xl rounded-3xl p-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-1 transition-all">
      <div className="px-3 py-2 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          링크 목록
        </h2>
        {onAddLink && (
          <button
            type="button"
            onClick={onAddLink}
            className="flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-white px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>추가</span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {activeLinks.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            theme={theme}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    </section>
  );
}
