"use client";

import { LinkItem } from "@/types";
import { ExternalLink, Eye } from "lucide-react";

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
      className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500"
    >
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className="font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
          {link.title}
        </h4>
        {link.description && (
          <p className="line-clamp-1 text-sm text-zinc-500 dark:text-zinc-400">
            {link.description}
          </p>
        )}
        <span className="line-clamp-1 text-xs text-zinc-400 dark:text-zinc-500">
          {link.url}
        </span>
      </div>

      <div className="flex items-center gap-3 pl-4 text-zinc-400">
        <div className="flex items-center gap-1 text-xs">
          <Eye className="h-3.5 w-3.5" />
          <span>{link.clicks}</span>
        </div>
        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
