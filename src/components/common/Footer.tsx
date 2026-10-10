import { APP_CONFIG } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E8EB] bg-[#F9FAFB] py-8 text-xs text-[#8B95A1]">
      <Container size="lg">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>© {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
          <p className="text-[#B0B8C1]">{APP_CONFIG.description}</p>
        </div>
      </Container>
    </footer>
  );
}
