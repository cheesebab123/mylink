"use client";

import React, { useState } from "react";
import { loginWithGoogle } from "@/services/authService";
import { ThemeType } from "@/types";
import { cn } from "@/lib/utils";
import { Link2, Code2, BookOpen, Globe } from "lucide-react";

interface LandingViewProps {
  theme: ThemeType;
}

export function LandingView({ theme }: LandingViewProps) {
  const [isPending, setIsPending] = useState(false);

  const handleStartWithGoogle = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-between px-4 py-8 overflow-hidden relative transition-colors duration-300",
        theme === "toss" && "bg-[#F9FAFB] text-[#191F28]",
        theme === "neobrutalism" && "bg-[#FEF08A] text-black",
        theme === "glass" && "bg-[#0B0F17] text-white"
      )}
    >
      {/* Glass 테마 배경 오브 */}
      {theme === "glass" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        </div>
      )}

      {/* 상단 브랜드 로고 */}
      <header className="w-full max-w-[440px] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center font-bold text-sm",
              theme === "toss" && "rounded-xl bg-[#3182F6] text-white",
              theme === "neobrutalism" &&
                "rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000]",
              theme === "glass" &&
                "rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
            )}
          >
            <Link2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight">myLink</span>
        </div>
      </header>

      {/* 중앙 히어로 섹션 */}
      <main className="w-full max-w-[520px] flex flex-col items-center text-center my-auto pt-10 pb-6 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
          Development in{" "}
          <span
            className={cn(
              theme === "toss" && "text-[#2563EB]",
              theme === "neobrutalism" && "text-[#2563EB] underline decoration-4",
              theme === "glass" && "text-cyan-400"
            )}
          >
            One Link.
          </span>
        </h1>

        <p
          className={cn(
            "mt-5 text-sm sm:text-base leading-relaxed max-w-md",
            theme === "toss" && "text-[#4E5968]",
            theme === "neobrutalism" && "text-black font-medium",
            theme === "glass" && "text-slate-300"
          )}
        >
          GitHub, 블로그, 포트폴리오까지.
          <br />
          개발자를 위한 모든 링크를 한 페이지에 담아보세요.
        </p>

        {/* Google로 시작하기 CTA 버튼 */}
        <button
          type="button"
          onClick={handleStartWithGoogle}
          disabled={isPending}
          className={cn(
            "mt-8 h-12 px-7 flex items-center justify-center gap-2.5 text-sm font-bold transition-all cursor-pointer disabled:opacity-60",
            theme === "toss" &&
              "rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]",
            theme === "neobrutalism" &&
              "rounded-xl border-2 border-black bg-[#3B82F6] text-white shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000]",
            theme === "glass" &&
              "rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          )}
        >
          <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
          </span>
          <span>{isPending ? "로그인 중..." : "Google로 시작하기"}</span>
        </button>

        {/* 하단 프로필 & 링크 카드 프리뷰 목업 */}
        <div
          className={cn(
            "mt-12 w-full max-w-[340px] p-5 rounded-3xl -rotate-2 hover:rotate-0 transition-transform duration-300 text-left",
            theme === "toss" &&
              "bg-white border border-[#E5E8EB] shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
            theme === "neobrutalism" &&
              "bg-white border-3 border-black shadow-[6px_6px_0px_#000]",
            theme === "glass" &&
              "bg-white/[0.06] border border-white/15 backdrop-blur-xl shadow-2xl"
          )}
        >
          {/* 목업 프로필 */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                theme === "toss" && "bg-[#E5E8EB] text-[#6B7684]",
                theme === "neobrutalism" && "bg-[#FEF08A] border-2 border-black text-black",
                theme === "glass" && "bg-white/10 text-cyan-300"
              )}
            >
              Dev
            </div>
            <div className="flex-1 space-y-1.5">
              <div
                className={cn(
                  "h-3.5 w-28 rounded-full",
                  theme === "glass" ? "bg-white/20" : "bg-[#E5E8EB]"
                )}
              />
              <div
                className={cn(
                  "h-2.5 w-20 rounded-full",
                  theme === "glass" ? "bg-white/10" : "bg-[#F2F4F6]"
                )}
              />
            </div>
          </div>

          {/* 목업 링크 카드 2개 */}
          <div className="space-y-2.5">
            <div
              className={cn(
                "p-3 rounded-2xl flex items-center gap-3",
                theme === "toss" && "bg-[#EFF6FF]",
                theme === "neobrutalism" && "bg-[#BAE6FD] border-2 border-black",
                theme === "glass" && "bg-cyan-500/10 border border-cyan-400/20"
              )}
            >
              <div className="w-7 h-7 rounded-full bg-[#3182F6]/20 text-[#3182F6] flex items-center justify-center shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-2.5 w-24 rounded-full bg-[#3182F6]/30" />
                <div className="h-2 w-32 rounded-full bg-[#3182F6]/15" />
              </div>
            </div>

            <div
              className={cn(
                "p-3 rounded-2xl flex items-center gap-3",
                theme === "toss" && "bg-[#F9FAFB]",
                theme === "neobrutalism" && "bg-[#FDE68A] border-2 border-black",
                theme === "glass" && "bg-white/[0.05] border border-white/10"
              )}
            >
              <div className="w-7 h-7 rounded-full bg-[#6B7684]/15 text-[#4E5968] flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 space-y-1">
                <div
                  className={cn(
                    "h-2.5 w-28 rounded-full",
                    theme === "glass" ? "bg-white/20" : "bg-[#E5E8EB]"
                  )}
                />
                <div
                  className={cn(
                    "h-2 w-20 rounded-full",
                    theme === "glass" ? "bg-white/10" : "bg-[#F2F4F6]"
                  )}
                />
              </div>
            </div>

            <div
              className={cn(
                "p-3 rounded-2xl flex items-center gap-3 opacity-70",
                theme === "toss" && "bg-[#F9FAFB]",
                theme === "neobrutalism" && "bg-white border-2 border-black",
                theme === "glass" && "bg-white/[0.03] border border-white/10"
              )}
            >
              <div className="w-7 h-7 rounded-full bg-[#6B7684]/15 text-[#4E5968] flex items-center justify-center shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 space-y-1">
                <div
                  className={cn(
                    "h-2.5 w-20 rounded-full",
                    theme === "glass" ? "bg-white/15" : "bg-[#E5E8EB]"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-[11px] opacity-50 relative z-10">
        © {new Date().getFullYear()} myLink. All rights reserved.
      </footer>
    </div>
  );
}
