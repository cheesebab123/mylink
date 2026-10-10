"use client";

import React, { useState } from "react";
import {
  Mail,
  BookOpen,
  ChevronRight,
  Copy,
  Check,
  Share2,
  Layers,
  Palette,
  ExternalLink,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Home() {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2200);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      copyToClipboard(window.location.href, "link");
    }
  };

  const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "멀티미디어"];

  const linkRows = [
    {
      title: "GitHub 저장소",
      subtitle: "진행한 프로젝트와 소스 코드를 볼 수 있어요",
      href: "https://github.com/cheesebab123",
      icon: GithubIcon,
      badge: "오픈소스",
    },
    {
      title: "기술 블로그 & 기록",
      subtitle: "새롭게 배운 기술과 개발 회고를 모아뒀어요",
      href: "https://github.com/cheesebab123",
      icon: BookOpen,
      badge: "아티클",
    },
    {
      title: "프로젝트 모음",
      subtitle: "직접 기획하고 만든 웹 서비스를 둘러보세요",
      href: "https://github.com/cheesebab123?tab=repositories",
      icon: Layers,
      badge: "포트폴리오",
    },
    {
      title: "디자인 & 인터랙션 작업",
      subtitle: "멀티미디어 전공 기반의 UI/UX 디자인이에요",
      href: "https://github.com/cheesebab123",
      icon: Palette,
      badge: "디자인",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#191F28] flex flex-col justify-between items-center pb-24">
      {/* TDS 모바일 셸 컨테이너 (최대 440px) */}
      <main className="w-full max-w-[440px] px-5 sm:px-6 pt-3 flex flex-col gap-4">
        
        {/* TopBar (56pt 상단 내비게이션 바) */}
        <header className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-[#191F28] tracking-tight">
              myLink
            </span>
          </div>

          <button
            onClick={handleShare}
            aria-label="링크 공유하기"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#4E5968] hover:bg-[#F2F4F6] tds-pressable transition-colors cursor-pointer"
            title="프로필 링크 공유하기"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </header>

        {/* 프로필 메인 카드 (TDS 24px Radius Elevated Card) */}
        <section className="bg-white rounded-3xl p-6 border border-[#E5E8EB] tds-shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-4">
            {/* 아바타 (TDS 56px 라운드 아바타) */}
            <div className="w-14 h-14 rounded-2xl bg-[#E8F3FF] text-[#3182F6] font-bold text-2xl flex items-center justify-center shrink-0">
              최
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#191F28] tracking-tight">
                  최혁진
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E8F3FF] text-[#3182F6]">
                  프론트엔드
                </span>
              </div>
              <p className="text-sm text-[#8B95A1] font-medium">
                @cheesebab123
              </p>
            </div>
          </div>

          {/* 친절한 해요체 소개글 */}
          <p className="text-[15px] leading-relaxed text-[#4E5968] font-normal">
            인터랙티브한 사용자 경험과 감각적인 UI를 고민하는 개발자예요. 멀티미디어 디자인 감각과 모던 웹 기술을 살려 편리한 디지털 경험을 만들어요.
          </p>

          {/* 상태 배지 (Chip) */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F3FF] text-[#3182F6] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#3182F6] animate-pulse" />
              <span>새로운 프로젝트 제안을 환영해요</span>
            </div>
          </div>

          {/* 스킬 태그 리스트 */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-[#F2F4F6] text-[#4E5968] text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 링크 목록 섹션 (TDS ListRow 기반 카드) */}
        <section className="bg-white rounded-3xl p-2 border border-[#E5E8EB] tds-shadow-sm flex flex-col">
          <div className="px-4 py-3">
            <h2 className="text-xs font-bold text-[#8B95A1] uppercase tracking-wider">
              링크 모음
            </h2>
          </div>

          <div className="flex flex-col">
            {linkRows.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#F9FAFB] tds-pressable transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#F2F4F6] text-[#333D4B] group-hover:bg-[#E8F3FF] group-hover:text-[#3182F6] flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold text-[#191F28] group-hover:text-[#3182F6] transition-colors truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F2F4F6] text-[#6B7684]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#8B95A1] truncate mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#B0B8C1] group-hover:text-[#4E5968] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </a>
              );
            })}
          </div>
        </section>

        {/* 연락처 및 이메일 카드 */}
        <section className="bg-white rounded-3xl p-5 border border-[#E5E8EB] tds-shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3FF] text-[#3182F6] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#8B95A1]">
                  이메일 문의
                </span>
                <span className="text-sm font-semibold text-[#191F28]">
                  choieese.dev@gmail.com
                </span>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard("choieese.dev@gmail.com", "email")}
              className="px-3 py-1.5 rounded-xl bg-[#F2F4F6] hover:bg-[#E5E8EB] text-[#333D4B] font-semibold text-xs tds-pressable transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3182F6]" />
                  <span className="text-[#3182F6]">복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>복사</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="py-6 text-center text-xs text-[#B0B8C1] flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} 최혁진. All rights reserved.</p>
          <p className="text-[11px] text-[#D1D6DB]">토스 디자인 시스템(TDS) 스타일로 제작되었어요</p>
        </footer>

      </main>

      {/* TDS BottomCTA (화면 최하단 고정 Primary 액션 버튼) */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-4 pt-3 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB]/90 to-transparent pointer-events-none">
        <div className="w-full max-w-[440px] pointer-events-auto">
          <a
            href="mailto:choieese.dev@gmail.com"
            className="w-full h-14 rounded-2xl bg-[#3182F6] hover:bg-[#2B72D6] text-white font-bold text-[17px] flex items-center justify-center gap-2 shadow-sm tds-pressable cursor-pointer"
          >
            <Mail className="w-5 h-5" />
            <span>이메일 보내기</span>
          </a>
        </div>
      </aside>

      {/* TDS Toast 피드백 (grey-900 surface + green-500 check) */}
      {copiedType && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-[#191F28] text-white text-sm font-semibold tds-shadow-toast transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>
            {copiedType === "email"
              ? "이메일 주소를 복사했어요"
              : "프로필 링크를 복사했어요"}
          </span>
        </aside>
      )}
    </div>
  );
}
