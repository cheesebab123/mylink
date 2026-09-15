"use client";

import { LinkItem } from "@/types";
import { LinkCard } from "./LinkCard";

interface LinkListProps {
  links: LinkItem[];
  onLinkClick?: (id: string) => void;
}

export function LinkList({ links, onLinkClick }: LinkListProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700">
        <p className="text-zinc-500 dark:text-zinc-400">등록된 링크가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onLinkClick={onLinkClick} />
      ))}
    </div>
  );
}
