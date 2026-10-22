"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { AddLinkDialog } from "@/components/link/AddLinkDialog";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { Toast } from "@/components/common/Toast";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { ThemeType } from "@/types";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyPage() {
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    theme,
    profile,
    links,
    setTheme,
    addLink,
    deleteLink,
    toggleLinkActive,
  } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
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

  const handleAddLink = (newLink: {
    title: string;
    url: string;
    description?: string;
    icon?: string;
    badge?: string;
  }) => {
    addLink(newLink);
    showToast(`'${newLink.title}' 링크를 추가했어요`);
  };

  const handleDeleteLink = (id: string, title: string) => {
    if (deleteLink) {
      deleteLink(id);
      showToast(`'${title}' 링크를 삭제했어요`);
    }
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    if (toggleLinkActive) {
      toggleLinkActive(id);
      showToast(currentActive ? "링크를 비공개로 변경했어요" : "링크를 공개로 변경했어요");
    }
  };

  const currentTheme = mounted ? theme : "toss";

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center pb-24 relative transition-colors duration-300",
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
        {/* 마이페이지 상단 헤더 */}
        <header className="h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              aria-label="메인 페이지로 돌아가기"
              title="메인 페이지로 돌아가기"
              className={cn(
                "w-9 h-9 flex items-center justify-center transition-all cursor-pointer",
                currentTheme === "toss" &&
                  "rounded-full text-[#4E5968] hover:bg-[#F2F4F6] tds-pressable",
                currentTheme === "neobrutalism" &&
                  "rounded-lg border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000]",
                currentTheme === "glass" &&
                  "rounded-xl bg-white/10 border border-white/20 text-slate-300 hover:text-white"
              )}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1
              className={cn(
                "tracking-tight transition-colors",
                currentTheme === "toss" && "font-bold text-lg text-[#191F28]",
                currentTheme === "neobrutalism" && "font-black text-xl text-black",
                currentTheme === "glass" && "font-bold text-lg text-white"
              )}
            >
              마이페이지
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
            />
          </div>
        </header>

        {/* 프로필 정보 요약 카드 */}
        <section
          className={cn(
            "p-4 transition-all flex items-center justify-between",
            currentTheme === "toss" &&
              "bg-white rounded-3xl border border-[#E5E8EB] tds-shadow-sm",
            currentTheme === "neobrutalism" &&
              "bg-white rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]",
            currentTheme === "glass" &&
              "bg-white/[0.05] border border-white/15 backdrop-blur-xl rounded-3xl"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "w-12 h-12 flex items-center justify-center font-bold text-base shrink-0 transition-all",
                currentTheme === "toss" &&
                  "rounded-2xl bg-[#E8F3FF] text-[#3182F6]",
                currentTheme === "neobrutalism" &&
                  "rounded-xl border-2 border-black bg-[#FEF08A] text-black shadow-[2px_2px_0px_#000] font-black",
                currentTheme === "glass" &&
                  "rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
              )}
            >
              {profile.avatarText || <User className="w-5 h-5" />}
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={cn(
                  "font-bold text-sm truncate",
                  currentTheme === "neobrutalism" && "font-black"
                )}
              >
                {profile.name}
              </span>
              <span
                className={cn(
                  "text-xs truncate",
                  currentTheme === "toss" && "text-[#8B95A1]",
                  currentTheme === "neobrutalism" && "text-zinc-700 font-bold",
                  currentTheme === "glass" && "text-slate-400"
                )}
              >
                {profile.role} · {profile.email}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all cursor-pointer flex items-center gap-1",
              currentTheme === "toss" &&
                "bg-[#F2F4F6] text-[#3182F6] hover:bg-[#E8F3FF] tds-pressable",
              currentTheme === "neobrutalism" &&
                "bg-[#FEF08A] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black hover:bg-yellow-300",
              currentTheme === "glass" &&
                "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
            )}
          >
            <span>프로필 보기</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </section>

        {/* 링크 관리 섹션 */}
        <section
          className={cn(
            "p-4 transition-all flex flex-col gap-3",
            currentTheme === "toss" &&
              "bg-white rounded-3xl border border-[#E5E8EB] tds-shadow-sm",
            currentTheme === "neobrutalism" &&
              "bg-[#FEF08A]/40 rounded-2xl border-3 border-black p-4 shadow-[4px_4px_0px_#000]",
            currentTheme === "glass" &&
              "bg-white/[0.05] border border-white/15 backdrop-blur-xl rounded-3xl"
          )}
        >
          {/* 섹션 상단 헤더 & 링크 추가 버튼 */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2
                className={cn(
                  "text-sm font-bold tracking-tight",
                  currentTheme === "toss" && "text-[#191F28]",
                  currentTheme === "neobrutalism" && "font-black text-black text-base",
                  currentTheme === "glass" && "text-white"
                )}
              >
                링크 관리
              </h2>
              <p
                className={cn(
                  "text-[11px]",
                  currentTheme === "toss" && "text-[#8B95A1]",
                  currentTheme === "neobrutalism" && "text-zinc-700 font-bold",
                  currentTheme === "glass" && "text-slate-400"
                )}
              >
                총 {links.length}개의 링크가 등록되어 있어요
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddDialogOpen(true)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm",
                currentTheme === "toss" &&
                  "bg-[#3182F6] text-white hover:bg-[#2B72D6] tds-pressable",
                currentTheme === "neobrutalism" &&
                  "bg-white text-black border-2 border-black font-black shadow-[3px_3px_0px_#000] hover:bg-[#FEF08A] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]",
                currentTheme === "glass" &&
                  "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>새 링크 추가</span>
            </button>
          </div>

          {/* 링크 목록 */}
          {links.length === 0 ? (
            <div
              className={cn(
                "p-8 text-center rounded-2xl flex flex-col items-center justify-center gap-2",
                currentTheme === "toss" && "bg-[#F9FAFB] text-[#8B95A1]",
                currentTheme === "neobrutalism" &&
                  "bg-white border-2 border-black text-black font-bold",
                currentTheme === "glass" && "bg-white/5 text-slate-400"
              )}
            >
              <p className="text-sm">등록된 링크가 없습니다.</p>
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(true)}
                className="text-xs text-[#3182F6] underline font-semibold cursor-pointer"
              >
                첫 번째 링크를 추가해보세요
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pt-1">
              {links.map((link) => (
                <div
                  key={link.id}
                  className={cn(
                    "p-3 rounded-2xl flex items-center justify-between gap-3 transition-all",
                    currentTheme === "toss" &&
                      "bg-[#F9FAFB] border border-[#E5E8EB]/80 hover:border-[#3182F6]/30",
                    currentTheme === "neobrutalism" &&
                      "bg-white border-2 border-black shadow-[3px_3px_0px_#000]",
                    currentTheme === "glass" &&
                      "bg-white/[0.04] border border-white/10 hover:border-cyan-400/30"
                  )}
                >
                  {/* 좌측 정보 */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-10 h-10 flex items-center justify-center shrink-0 rounded-xl transition-all",
                        currentTheme === "toss" &&
                          "bg-white border border-[#E5E8EB] text-[#333D4B]",
                        currentTheme === "neobrutalism" &&
                          "bg-[#BAE6FD] border-2 border-black text-black shadow-[1px_1px_0px_#000]",
                        currentTheme === "glass" &&
                          "bg-white/10 border border-white/15 text-cyan-300"
                      )}
                    >
                      <DynamicIcon name={link.icon} className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={cn(
                            "text-sm font-semibold truncate",
                            currentTheme === "neobrutalism" && "font-black text-black"
                          )}
                        >
                          {link.title}
                        </span>
                        {link.badge && (
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.2 rounded font-medium",
                              currentTheme === "toss" &&
                                "bg-[#E8F3FF] text-[#3182F6]",
                              currentTheme === "neobrutalism" &&
                                "border border-black bg-[#FDE047] text-black font-black",
                              currentTheme === "glass" &&
                                "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                            )}
                          >
                            {link.badge}
                          </span>
                        )}
                        {link.isActive === false && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-600 font-medium">
                            비공개
                          </span>
                        )}
                      </div>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "text-xs truncate hover:underline flex items-center gap-1 mt-0.5",
                          currentTheme === "toss" && "text-[#8B95A1]",
                          currentTheme === "neobrutalism" && "text-zinc-600 font-bold",
                          currentTheme === "glass" && "text-slate-400"
                        )}
                      >
                        <span className="truncate">{link.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* 우측 조작 액션 (공개/비공개 토글, 삭제) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(link.id, link.isActive !== false)}
                      title={link.isActive !== false ? "비공개로 전환" : "공개로 전환"}
                      aria-label={link.isActive !== false ? "비공개로 전환" : "공개로 전환"}
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer",
                        link.isActive !== false
                          ? currentTheme === "toss"
                            ? "text-[#3182F6] hover:bg-[#E8F3FF]"
                            : currentTheme === "neobrutalism"
                            ? "text-black border border-black bg-white hover:bg-yellow-200"
                            : "text-cyan-300 hover:bg-cyan-500/20"
                          : "text-zinc-400 hover:bg-zinc-100"
                      )}
                    >
                      {link.isActive !== false ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id, link.title)}
                      title="링크 삭제"
                      aria-label="링크 삭제"
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
                        currentTheme === "neobrutalism" &&
                          "border border-black bg-white hover:bg-red-100 text-red-600"
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 새 링크 추가 다이얼로그 */}
      <AddLinkDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddLink={handleAddLink}
        theme={currentTheme}
      />

      {/* 토스트 피드백 */}
      <Toast message={toastMessage} theme={currentTheme} />
    </div>
  );
}
