"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container size="sm" className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-red-600">오류가 발생했습니다</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        페이지를 불러오는 중 문제가 발생했습니다. 다시 시도해 주세요.
      </p>
      <div className="mt-6">
        <Button onClick={() => reset()} variant="primary">
          다시 시도
        </Button>
      </div>
    </Container>
  );
}
