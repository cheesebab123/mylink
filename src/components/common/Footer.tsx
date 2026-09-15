import { APP_CONFIG } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-950">
      <Container size="lg">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-sm text-zinc-500 dark:text-zinc-400">
          <p>© {currentYear} {APP_CONFIG.name}. All rights reserved.</p>
          <p>{APP_CONFIG.description}</p>
        </div>
      </Container>
    </footer>
  );
}
