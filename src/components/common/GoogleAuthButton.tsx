"use client";

import React, { useState } from "react";
import { ThemeType } from "@/types";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { loginWithGoogle, logout } from "@/services/authService";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoogleAuthButtonProps {
  theme: ThemeType;
}

export function GoogleAuthButton({ theme }: GoogleAuthButtonProps) {
  const user = useMyLinkStore((state) => state.user);
  const isAuthLoading = useMyLinkStore((state) => state.isAuthLoading);
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google 로그인 처리 중 오류:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleLogout = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
    } finally {
      setIsPending(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div
        className={cn(
          "h-8 px-3 flex items-center text-xs font-medium opacity-60",
          theme === "glass" ? "text-slate-300" : "text-[#6B7684]"
        )}
      >
        확인 중...
      </div>
    );
  }

  if (user) {
    const displayName = user.displayName || user.email?.split("@")[0] || "사용자";
    return (
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-semibold truncate max-w-[140px]",
            theme === "toss" && "text-[#333D4B]",
            theme === "neobrutalism" && "text-black font-bold",
            theme === "glass" && "text-cyan-200"
          )}
        >
          {displayName}님
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isPending}
          className={cn(
            "h-8 px-2.5 flex items-center gap-1 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50",
            theme === "toss" &&
              "rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB] tds-pressable",
            theme === "neobrutalism" &&
              "rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] font-bold",
            theme === "glass" &&
              "rounded-xl bg-white/10 border border-white/20 text-slate-200 hover:bg-white/20 backdrop-blur-md"
          )}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>로그아웃</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isPending}
      className={cn(
        "h-8 px-3 flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50",
        theme === "toss" &&
          "rounded-full bg-white border border-[#E5E8EB] text-[#191F28] hover:bg-[#F9FAFB] shadow-xs tds-pressable",
        theme === "neobrutalism" &&
          "rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] font-bold",
        theme === "glass" &&
          "rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
      )}
    >
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
      <span>{isPending ? "로그인 중..." : "Google로 로그인"}</span>
    </button>
  );
}
