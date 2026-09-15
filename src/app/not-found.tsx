import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/common/Container";

export default function NotFound() {
  return (
    <Container size="sm" className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">404</h2>
      <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button variant="primary">홈으로 돌아가기</Button>
        </Link>
      </div>
    </Container>
  );
}
