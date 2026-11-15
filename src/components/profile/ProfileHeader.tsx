"use client";

import React from "react";
import { ProfileData, ThemeType } from "@/types";
import { ProfileAvatar } from "./ProfileAvatar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ProfileHeaderProps {
  profile: ProfileData;
  theme: ThemeType;
}

export function ProfileHeader({ profile, theme }: ProfileHeaderProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-5 transition-all duration-300",
        // Toss
        theme === "toss" &&
          "bg-white rounded-3xl p-6 border border-[#E5E8EB] tds-shadow-sm",
        // Neobrutalism
        theme === "neobrutalism" &&
          "bg-white rounded-2xl p-6 border-3 border-black shadow-[5px_5px_0px_#000]",
        // Glass
        theme === "glass" &&
          "bg-white/[0.05] border border-white/15 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white"
      )}
    >
      {/* 아바타 & 기본 정보 */}
      <div className="flex items-center gap-4">
        {/* 아바타 */}
        <ProfileAvatar
          avatarUrl={profile.avatarUrl}
          avatarText={profile.avatarText}
          name={profile.name}
          theme={theme}
          size="lg"
        />

        {/* 이름, 역할 뱃지, 핸들 */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className={cn(
                "text-xl tracking-tight transition-colors",
                theme === "toss" && "font-bold text-[#191F28]",
                theme === "neobrutalism" && "font-black text-black text-2xl",
                theme === "glass" && "font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              )}
            >
              {profile.name}
            </h1>

            {profile.role && (
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 text-xs font-semibold transition-all",
                  theme === "toss" &&
                    "rounded-full bg-[#E8F3FF] text-[#3182F6]",
                  theme === "neobrutalism" &&
                    "rounded-md border-2 border-black bg-[#A7F3D0] text-black font-black shadow-[2px_2px_0px_#000]",
                  theme === "glass" &&
                    "rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                )}
              >
                {profile.role}
              </span>
            )}
          </div>

          <p
            className={cn(
              "text-sm font-medium transition-colors",
              theme === "toss" && "text-[#8B95A1]",
              theme === "neobrutalism" && "text-zinc-700 font-bold",
              theme === "glass" && "text-slate-400"
            )}
          >
            {profile.handle}
          </p>
        </div>
      </div>

      {/* 친절한 소개글 */}
      {profile.bio && (
        <p
          className={cn(
            "text-[15px] leading-relaxed transition-colors",
            theme === "toss" && "text-[#4E5968] font-normal",
            theme === "neobrutalism" && "text-zinc-900 font-semibold",
            theme === "glass" && "text-slate-300 font-normal"
          )}
        >
          {profile.bio}
        </p>
      )}

      {/* 상태 뱃지 (Open for Work / 프로젝트 제안 등) */}
      {profile.isStatusOn && profile.statusBadge && (
        <div className="flex items-center">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all",
              theme === "toss" &&
                "rounded-full bg-[#E8F3FF] text-[#3182F6]",
              theme === "neobrutalism" &&
                "rounded-lg border-2 border-black bg-[#FEF08A] text-black font-black shadow-[2px_2px_0px_#000]",
              theme === "glass" &&
                "rounded-full bg-white/10 border border-cyan-400/30 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] backdrop-blur-sm"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                theme === "toss" && "bg-[#3182F6]",
                theme === "neobrutalism" && "bg-black",
                theme === "glass" && "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              )}
            />
            <span>{profile.statusBadge}</span>
          </div>
        </div>
      )}

      {/* 스킬 태그 리스트 */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className={cn(
                "px-2.5 py-1 text-xs transition-all",
                theme === "toss" &&
                  "rounded-lg bg-[#F2F4F6] text-[#4E5968] font-medium",
                theme === "neobrutalism" &&
                  "rounded-md border-2 border-black bg-white text-black font-bold shadow-[2px_2px_0px_#000] hover:bg-yellow-100",
                theme === "glass" &&
                  "rounded-lg bg-white/10 border border-white/15 text-slate-200 font-medium backdrop-blur-sm hover:border-cyan-400/40"
              )}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
