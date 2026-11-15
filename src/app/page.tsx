"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { TopBar } from "@/components/common/TopBar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LinkList } from "@/components/link/LinkList";
import { ContactCard } from "@/components/contact/ContactCard";
import { Toast } from "@/components/common/Toast";
import { LandingView } from "@/components/landing/LandingView";
import { getProfile, getUidByUsername } from "@/services/profileService";
import { getLinks, incrementClick as firestoreIncrementClick } from "@/services/linkService";
import { LinkItem, ProfileData, ThemeType } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 공유 링크 (?u=username) 방문자용 상태
  const [sharedUsername, setSharedUsername] = useState<string | null>(null);
  const [sharedUid, setSharedUid] = useState<string | null>(null);
  const [sharedProfile, setSharedProfile] = useState<ProfileData | null>(null);
  const [sharedLinks, setSharedLinks] = useState<LinkItem[]>([]);
  const [isLoadingShared, setIsLoadingShared] = useState(false);
  const [sharedNotFound, setSharedNotFound] = useState(false);

  const {
    theme,
    user,
    isAuthLoading,
    profile,
    links,
    setTheme,
    incrementClick,
  } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const u = params.get("u")?.trim().toLowerCase() || null;
      if (u) {
        setSharedUsername(u);
        setIsLoadingShared(true);
        (async () => {
          try {
            const targetUid = await getUidByUsername(u);
            if (!targetUid) {
              setSharedNotFound(true);
              setIsLoadingShared(false);
              return;
            }
            const [targetProfile, targetLinks] = await Promise.all([
              getProfile(targetUid),
              getLinks(targetUid),
            ]);
            setSharedUid(targetUid);
            setSharedProfile(targetProfile);
            setSharedLinks(targetLinks);
          } catch (error) {
            console.error("공유 프로필 조회 실패:", error);
            setSharedNotFound(true);
          } finally {
            setIsLoadingShared(false);
          }
        })();
      }
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const activeProfile = sharedUsername && sharedProfile ? sharedProfile : profile;
  const activeLinks = sharedUsername ? sharedLinks : links;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const baseUrl = `${window.location.origin}${window.location.pathname}`;
      const shareUsername =
        sharedUsername ||
        activeProfile.username ||
        activeProfile.handle?.replace(/^@/, "").toLowerCase();
      const shareUrl = shareUsername ? `${baseUrl}?u=${encodeURIComponent(shareUsername)}` : baseUrl;

      navigator.clipboard.writeText(shareUrl);
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
    if (sharedUsername && sharedUid) {
      setSharedLinks((prev) =>
        prev.map((link) =>
          link.id === id ? { ...link, clicks: (link.clicks || 0) + 1 } : link
        )
      );
      firestoreIncrementClick(id, sharedUid).catch((err) =>
        console.error("Failed to increment click in Firestore:", err)
      );
      return;
    }
    incrementClick(id);
  };

  // SSR hydration safety (공유 링크 열람 시에는 프로필 소유자가 설정한 테마로 고정)
  const currentTheme = sharedUsername
    ? sharedProfile?.theme || "toss"
    : mounted
      ? theme
      : "toss";

  // 1. 초기 마운트 또는 Auth/공유 프로필 로딩 중
  if (!mounted || (!sharedUsername && isAuthLoading) || isLoadingShared) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center transition-colors",
          currentTheme === "toss" && "bg-[#F9FAFB] text-[#4E5968]",
          currentTheme === "neobrutalism" && "bg-[#FEF08A] text-black",
          currentTheme === "glass" && "bg-[#0B0F17] text-slate-300"
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-[#3182F6]" />
          <p className="text-xs font-medium opacity-75">불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 2. 공유 링크(?u=...)로 접속했으나 존재하지 않는 사용자일 때
  if (sharedUsername && sharedNotFound) {
    return (
      <div
        className={cn(
          "min-h-screen flex flex-col items-center justify-center px-4 text-center",
          currentTheme === "toss" && "bg-[#F9FAFB] text-[#191F28]",
          currentTheme === "neobrutalism" && "bg-[#FEF08A] text-black",
          currentTheme === "glass" && "bg-[#0B0F17] text-white"
        )}
      >
        <p className="text-lg font-bold mb-2">존재하지 않는 프로필입니다</p>
        <p className="text-sm opacity-70 mb-6">
          @{sharedUsername} 사용자를 찾을 수 없습니다.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#3182F6] text-white text-sm font-semibold hover:bg-[#1B64DA] transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 3. 일반 접속(/) + 로그아웃 상태 → 랜딩 페이지 표시 (토스 디자인 고정)
  if (!sharedUsername && !user) {
    return <LandingView theme="toss" />;
  }

  // 4. 로그인 완료 상태 또는 공유 프로필 조회 상태 → 마이링크 메인 화면 표시
  const isOwnerView = !sharedUsername || (!!user && user.uid === sharedUid);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-between items-center pb-12 relative transition-colors duration-300",
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
          showMyPageBtn={isOwnerView}
          showThemeSwitcher={!sharedUsername}
        />

        {/* 프로필 헤더 카드 */}
        <ProfileHeader profile={activeProfile} theme={currentTheme} />

        {/* 링크 목록 영역 */}
        <LinkList
          links={activeLinks}
          theme={currentTheme}
          onLinkClick={handleLinkClick}
        />

        {/* 연락처 & 이메일 카드 */}
        <ContactCard
          email={activeProfile.email}
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
          <p>© {new Date().getFullYear()} {activeProfile.name}. All rights reserved.</p>
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

      {/* 토스트 피드백 */}
      <Toast message={toastMessage} theme={currentTheme} />
    </div>
  );
}
