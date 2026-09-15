import { Mail, BookOpen, Sparkles, Code2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-950 dark:to-zinc-900 p-6">
      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none text-center flex flex-col items-center gap-6">
        
        {/* 아바타 프로필 영역 */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-3xl font-bold text-slate-800 dark:text-slate-100">
              홍
            </div>
          </div>
          <span className="absolute bottom-1 right-1 bg-indigo-600 text-white p-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4" />
          </span>
        </div>

        {/* 이름 및 직함 */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            홍길동
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900">
            🎓 대학생 &bull; 바이브 코딩 익스플로러
          </span>
        </div>

        {/* 자기소개글 */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xs font-normal">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* 구분선 */}
        <div className="w-full h-px bg-slate-200/60 dark:bg-zinc-800 my-1" />

        {/* 소셜 & 링크 버튼 */}
        <div className="w-full flex flex-col gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm transition-all hover:opacity-90 active:scale-[0.99] shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub 구경하기
          </a>

          <a
            href="mailto:gildong@example.com"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 font-medium text-sm border border-slate-200/80 dark:border-zinc-700 transition-all hover:bg-slate-200/60 dark:hover:bg-zinc-700/60 active:scale-[0.99]"
          >
            <Mail className="w-4 h-4 text-indigo-500" />
            이메일 보내기
          </a>

          <a
            href="#"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 font-medium text-sm border border-slate-200/80 dark:border-zinc-700 transition-all hover:bg-slate-200/60 dark:hover:bg-zinc-700/60 active:scale-[0.99]"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            학습 블로그
          </a>
        </div>

        {/* 푸터 카피라이트 */}
        <p className="text-xs text-slate-400 dark:text-zinc-500 pt-2">
          &copy; {new Date().getFullYear()} 홍길동. All rights reserved.
        </p>

      </div>
    </main>
  );
}


