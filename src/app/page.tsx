"use client";

import React, { useState, useEffect } from "react";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { TopBar } from "@/components/common/TopBar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LinkList } from "@/components/link/LinkList";
import { ContactCard } from "@/components/contact/ContactCard";
import { BottomCTA } from "@/components/common/BottomCTA";
import { Toast } from "@/components/common/Toast";
import { ThemeType } from "@/types";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { theme, profile, links, setTheme, incrementClick } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("프로필 링크를 복사했어요");
    }
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    const themeNames: Record<ThemeType, string> = {
      toss: "토스 (TDS)",
      neobrutalism: "네오브루탈리즘",
      glass: "다크 글래스",
    };
    showToast(`${themeNames[newTheme]} 테마로 변경했어요`);
  };

  const handleLinkClick = (id: string) => {
    incrementClick(id);
  };

  // SSR hydration safety
  const currentTheme = mounted ? theme : "toss";

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-between items-center pb-28 relative transition-colors duration-300",
        // Toss
        currentTheme === "toss" && "bg-[#F9FAFB] text-[#191F28]",
        // Neobrutalism
        currentTheme === "neobrutalism" && "bg-[#FEF08A] text-black",
        // Glass
        currentTheme === "glass" && "bg-[#0B0F17] text-white"
      )}
    >
      {/* Dark Glass Ambient Glowing Orbs */}
      {currentTheme === "glass" && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[110px]" />
        </div>
      )}

      {/* 모바일 셸 컨테이너 (최대 440px) */}
      <main className="w-full max-w-[440px] px-4 sm:px-6 pt-3 flex flex-col gap-4 relative z-10">
        {/* TopBar (로고, 3종 테마 전환, 마이페이지 이동, 공유 버튼) */}
        <TopBar
          theme={currentTheme}
          onThemeChange={handleThemeChange}
          onShare={handleShare}
          showMyPageBtn={true}
        />

        {/* 프로필 헤더 카드 */}
        <ProfileHeader profile={profile} theme={currentTheme} />

        {/* 링크 목록 영역 */}
        <LinkList
          links={links}
          theme={currentTheme}
          onLinkClick={handleLinkClick}
        />

        {/* 연락처 & 이메일 카드 */}
        <ContactCard
          email={profile.email}
          theme={currentTheme}
          onCopySuccess={() => showToast("이메일 주소를 복사했어요")}
        />

        {/* 푸터 */}
        <footer
          className={cn(
            "py-6 text-center text-xs flex flex-col items-center gap-1 transition-colors",
            currentTheme === "toss" && "text-[#8B95A1]",
            currentTheme === "neobrutalism" && "text-black font-bold",
            currentTheme === "glass" && "text-slate-500"
          )}
        >
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p
            className={cn(
              "text-[11px]",
              currentTheme === "toss" && "text-[#B0B8C1]",
              currentTheme === "neobrutalism" && "text-zinc-800",
              currentTheme === "glass" && "text-slate-600"
            )}
          >
            {currentTheme === "toss" && "토스 디자인 시스템(TDS) 스타일"}
            {currentTheme === "neobrutalism" && "네오브루탈리즘 레트로 팝 스타일"}
            {currentTheme === "glass" && "다크 글래스모피즘 사이버 스타일"}
          </p>
        </footer>
      </main>

      {/* 최하단 고정 Primary CTA */}
      <BottomCTA email={profile.email} theme={currentTheme} />

      {/* 토스트 피드백 */}
      <Toast message={toastMessage} theme={currentTheme} />
    </div>
  );
}
