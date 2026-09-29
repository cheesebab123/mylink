"use client";

import React, { useState } from "react";
import {
  Mail,
  BookOpen,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Layers,
  Palette,
  ArrowUpRight,
  Heart,
  Globe,
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
    }, 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      copyToClipboard(window.location.href, "link");
    }
  };

  const skills = [
    { name: "React", bg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:border-cyan-400/40" },
    { name: "Next.js", bg: "bg-zinc-800/80 text-zinc-200 border-zinc-700/60 hover:border-zinc-500" },
    { name: "TypeScript", bg: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-400/40" },
    { name: "Tailwind CSS", bg: "bg-teal-500/10 text-teal-300 border-teal-500/20 hover:border-teal-400/40" },
    { name: "UI / UX", bg: "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:border-purple-400/40" },
    { name: "Multimedia", bg: "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:border-rose-400/40" },
  ];

  const links = [
    {
      title: "GitHub 저장소",
      description: "프로젝트 소스 코드와 커밋 기록 구경하기",
      href: "https://github.com/cheesebab123",
      icon: GithubIcon,
      iconBg: "bg-zinc-900 text-white border border-zinc-700 shadow-md",
      badge: "Open Source",
    },
    {
      title: "기술 블로그 & 지식 기록",
      description: "새롭게 배운 웹 기술과 개발 인사이트 정리",
      href: "https://github.com/cheesebab123",
      icon: BookOpen,
      iconBg: "bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/25",
      badge: "Tech Blog",
    },
    {
      title: "프로젝트 아카이브",
      description: "인터랙티브 웹 앱 및 프론트엔드 작업물",
      href: "https://github.com/cheesebab123?tab=repositories",
      icon: Layers,
      iconBg: "bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-indigo-500/25",
      badge: "Projects",
    },
    {
      title: "디자인 & 크리에이티브",
      description: "멀티미디어 전공 기반의 UI/UX 디자인 모음",
      href: "https://github.com/cheesebab123",
      icon: Palette,
      iconBg: "bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-rose-500/25",
      badge: "Creative",
    },
  ];

  return (
    <main className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 bg-[#090a10] text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* 앰비언트 글로우 배경 효과 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-pink-500/15 blur-[140px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-1/3 w-[380px] h-[380px] bg-gradient-to-br from-blue-600/15 via-cyan-500/15 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-0" />

      {/* 섬세한 그리드 배경 오버레이 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* 메인 프로필 카드 */}
      <div className="relative z-10 w-full max-w-lg bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/80 flex flex-col items-center">
        
        {/* 상단 상태 바 & 공유 버튼 */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open to Opportunities</span>
          </div>

          <button
            onClick={handleShare}
            aria-label="링크 공유하기"
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="프로필 링크 복사"
          >
            {copiedType === "link" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">복사됨</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>공유</span>
              </>
            )}
          </button>
        </div>

        {/* 아바타 프로필 사진 영역 */}
        <div className="relative mb-5 group cursor-default">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-2xl shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-zinc-950 border-2 border-zinc-800/80 flex items-center justify-center relative overflow-hidden">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent select-none">
                최
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full shadow-lg border-2 border-zinc-900">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* 이름 및 타이틀 */}
        <div className="flex flex-col items-center gap-1.5 text-center mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              최혁진
            </h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              dev
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono flex items-center gap-1.5">
            <span>@cheesebab123</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">Front-End Developer</span>
          </p>
        </div>

        {/* 자기소개 문구 */}
        <p className="text-zinc-300 text-sm leading-relaxed text-center max-w-sm mb-5 font-normal">
          인터랙티브한 사용자 경험과 감각적인 UI를 만들어가는 프론트엔드 개발자 최혁진입니다.
          멀티미디어 디자인 감각과 모던 웹 기술로 더 직관적이고 몰입감 있는 웹을 만듭니다.
        </p>

        {/* 기술 스택 & 관심사 태그 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6 max-w-md">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border backdrop-blur-md ${skill.bg} transition-all duration-200 hover:scale-105 select-none`}
            >
              {skill.name}
            </span>
          ))}
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* 주요 링크 목록 */}
        <div className="w-full flex flex-col gap-3 mb-6">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={idx}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${link.iconBg} transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-zinc-100 group-hover:text-white transition-colors">
                        {link.title}
                      </h3>
                      {link.badge && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-700/60 text-zinc-300 border border-white/5">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl text-zinc-500 group-hover:text-zinc-200 group-hover:bg-zinc-700/50 transition-all">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>

        {/* 이메일 바로 복사 & 연락처 박스 */}
        <div className="w-full bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-pink-950/40 border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] text-zinc-400 font-medium">Contact Email</p>
              <p className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                choieese.dev@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => copyToClipboard("choieese.dev@gmail.com", "email")}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all active:scale-95 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>이메일 복사</span>
                </>
              )}
            </button>
            <a
              href="mailto:choieese.dev@gmail.com"
              className="inline-flex items-center justify-center p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 text-xs transition-all"
              title="메일 앱 열기"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 푸터 영역 */}
        <footer className="w-full flex flex-col items-center gap-2 pt-2 text-center">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Crafted with passion</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>by 최혁진</span>
          </div>
          <p className="text-[11px] text-zinc-600 font-mono">
            &copy; {new Date().getFullYear()} Hyukjin Choi. All rights reserved.
          </p>
        </footer>

      </div>

      {/* 하단 토스트 알림 피드백 */}
      {copiedType && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-white/20 text-white text-xs font-medium shadow-2xl backdrop-blur-lg transition-all animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>
            {copiedType === "email"
              ? "이메일 주소가 클립보드에 복사되었습니다."
              : "프로필 링크가 클립보드에 복사되었습니다."}
          </span>
        </div>
      )}
    </main>
  );
}
