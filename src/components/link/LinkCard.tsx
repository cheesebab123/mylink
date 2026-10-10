"use client";

import { LinkItem } from "@/types";
import { ChevronRight, Eye } from "lucide-react";

interface LinkCardProps {
  link: LinkItem;
  onLinkClick?: (id: string) => void;
}

export function LinkCard({ link, onLinkClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onLinkClick?.(link.id)}
      className="group flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white p-4 tds-shadow-sm tds-pressable transition-all hover:bg-[#F9FAFB]"
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <h4 className="font-semibold text-[15px] text-[#191F28] group-hover:text-[#3182F6] transition-colors">
          {link.title}
        </h4>
        {link.description && (
          <p className="line-clamp-1 text-xs text-[#6B7684]">
            {link.description}
          </p>
        )}
        <span className="line-clamp-1 text-[11px] text-[#8B95A1]">
          {link.url}
        </span>
      </div>

      <div className="flex items-center gap-2 pl-3 text-[#B0B8C1]">
        <div className="flex items-center gap-1 text-xs font-medium text-[#8B95A1]">
          <Eye className="h-3.5 w-3.5" />
          <span>{link.clicks}</span>
        </div>
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:text-[#4E5968]" />
      </div>
    </a>
  );
}
