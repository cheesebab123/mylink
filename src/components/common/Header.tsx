import Link from "next/link";
import { APP_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Container } from "./Container";
import { Link2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E8EB] bg-white/90 backdrop-blur-md">
      <Container size="lg">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#191F28]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3182F6] text-white">
              <Link2 className="h-4 w-4" />
            </div>
            <span>{APP_CONFIG.name}</span>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-xl text-sm font-semibold text-[#4E5968] hover:bg-[#F2F4F6] hover:text-[#191F28] tds-pressable transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
