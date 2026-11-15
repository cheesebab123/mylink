"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLinkSchema, AddLinkFormValues } from "@/lib/validations/link";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { LinkItem, ThemeType } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface InlineEditLinkFormProps {
  link: LinkItem;
  theme: ThemeType;
  onSave: (data: {
    title: string;
    url: string;
    description?: string;
    icon?: string;
    badge?: string;
  }) => Promise<void> | void;
  onCancel: () => void;
}

const ICON_PRESETS = [
  { name: "Globe", label: "웹사이트" },
  { name: "Github", label: "깃허브" },
  { name: "BookOpen", label: "블로그" },
  { name: "Layers", label: "프로젝트" },
  { name: "Palette", label: "디자인" },
  { name: "FileText", label: "문서/이력" },
  { name: "Share2", label: "소셜/SNS" },
  { name: "Mail", label: "이메일" },
  { name: "Code", label: "코드" },
  { name: "Sparkles", label: "추천" },
  { name: "Bookmark", label: "북마크" },
  { name: "Terminal", label: "개발" },
];

const BADGE_PRESETS = ["New", "포트폴리오", "오픈소스", "아티클", "디자인", "이력서", "추천"];

export function InlineEditLinkForm({
  link,
  theme,
  onSave,
  onCancel,
}: InlineEditLinkFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkFormValues>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
      description: link.description || "",
      icon: link.icon || "Globe",
      badge: link.badge || "",
    },
    mode: "onTouched",
  });

  const selectedIcon = watch("icon") || "Globe";
  const currentBadge = watch("badge") || "";

  const onSubmit = async (data: AddLinkFormValues) => {
    let formattedUrl = data.url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const newTitle = data.title.trim();
    const newDescription = data.description?.trim() || "";
    const newIcon = data.icon || "Globe";
    const newBadge = data.badge?.trim() || "";

    const oldTitle = link.title.trim();
    const oldUrl = link.url.trim();
    const oldDescription = (link.description || "").trim();
    const oldIcon = link.icon || "Globe";
    const oldBadge = (link.badge || "").trim();

    // 변경사항이 전혀 없는 경우 Firestore 연동 없이 편집 모드 닫기
    const isUnchanged =
      newTitle === oldTitle &&
      formattedUrl === oldUrl &&
      newDescription === oldDescription &&
      newIcon === oldIcon &&
      newBadge === oldBadge;

    if (isUnchanged) {
      onCancel();
      return;
    }

    try {
      await onSave({
        title: newTitle,
        url: formattedUrl,
        description: newDescription || undefined,
        icon: newIcon,
        badge: newBadge || undefined,
      });
    } catch (error) {
      console.error("Failed to submit link edit:", error);
    }
  };

  const getInputStyles = (hasError?: boolean) => {
    if (theme === "toss") {
      return cn(
        "w-full h-10 px-3 rounded-xl text-sm transition-all outline-none",
        "bg-[#F2F4F6] text-[#191F28] placeholder:text-[#8B95A1] border border-transparent",
        "focus:bg-white focus:border-[#3182F6]",
        hasError && "border-[#F04452] bg-red-50/50 focus:border-[#F04452]"
      );
    }
    if (theme === "neobrutalism") {
      return cn(
        "w-full h-10 px-3 rounded-lg text-sm font-bold transition-all outline-none",
        "bg-white text-black placeholder:text-zinc-400 border-2 border-black shadow-[2px_2px_0px_#000]",
        "focus:bg-[#FEF08A] focus:shadow-[3px_3px_0px_#000]",
        hasError && "border-red-600 bg-red-50"
      );
    }
    return cn(
      "w-full h-10 px-3 rounded-xl text-sm transition-all outline-none",
      "bg-white/10 text-white placeholder:text-slate-400 border border-white/20 backdrop-blur-md",
      "focus:bg-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50",
      hasError && "border-red-400 bg-red-950/20"
    );
  };

  const getLabelStyles = () => {
    if (theme === "toss") return "text-xs font-semibold text-[#4E5968]";
    if (theme === "neobrutalism") return "text-xs font-black text-black";
    return "text-xs font-medium text-slate-300";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "p-4 rounded-2xl flex flex-col gap-3.5 transition-all",
        theme === "toss" && "bg-white border-2 border-[#3182F6]/40 shadow-sm",
        theme === "neobrutalism" && "bg-[#FEF08A]/30 border-3 border-black shadow-[4px_4px_0px_#000]",
        theme === "glass" && "bg-cyan-950/20 border border-cyan-400/40 backdrop-blur-xl"
      )}
      noValidate
    >
      <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/10">
        <span
          className={cn(
            "text-xs font-bold",
            theme === "toss" && "text-[#3182F6]",
            theme === "neobrutalism" && "text-black font-black uppercase",
            theme === "glass" && "text-cyan-400"
          )}
        >
          ✏️ 링크 정보 수정
        </span>
      </div>

      {/* 링크 제목 (필수) */}
      <div className="space-y-1">
        <label className={getLabelStyles()}>
          링크 제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="예: 내 포트폴리오 웹사이트"
          className={getInputStyles(!!errors.title)}
          autoFocus
        />
        {errors.title?.message && (
          <p className="text-xs text-red-500 font-medium">{errors.title.message}</p>
        )}
      </div>

      {/* URL 주소 (필수) */}
      <div className="space-y-1">
        <label className={getLabelStyles()}>
          URL 주소 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("url")}
          placeholder="예: https://example.com"
          className={getInputStyles(!!errors.url)}
        />
        {errors.url?.message && (
          <p className="text-xs text-red-500 font-medium">{errors.url.message}</p>
        )}
      </div>

      {/* 설명 (선택) */}
      <div className="space-y-1">
        <label className={getLabelStyles()}>설명 (선택)</label>
        <input
          type="text"
          {...register("description")}
          placeholder="예: 작업물과 프로젝트 모음집"
          className={getInputStyles(!!errors.description)}
        />
        {errors.description?.message && (
          <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
        )}
      </div>

      {/* 아이콘 선택 */}
      <div className="space-y-1">
        <label className={getLabelStyles()}>아이콘 선택</label>
        <div className="grid grid-cols-6 gap-1.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-h-24 overflow-y-auto">
          {ICON_PRESETS.map((item) => {
            const isSelected = selectedIcon === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setValue("icon", item.name, { shouldValidate: true })}
                title={item.label}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-lg transition-all text-xs cursor-pointer",
                  isSelected
                    ? theme === "toss"
                      ? "bg-[#3182F6] text-white shadow-sm font-semibold"
                      : theme === "neobrutalism"
                      ? "bg-[#FEF08A] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000]"
                      : "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                    : theme === "toss"
                    ? "text-[#6B7684] hover:bg-[#E5E8EB]/60 hover:text-[#191F28]"
                    : theme === "neobrutalism"
                    ? "text-black hover:bg-zinc-200"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <DynamicIcon name={item.name} className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] leading-tight truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 뱃지 (선택) */}
      <div className="space-y-1">
        <label className={getLabelStyles()}>뱃지 태그 (선택)</label>
        <input
          type="text"
          {...register("badge")}
          placeholder="예: 추천, 포트폴리오 등"
          className={getInputStyles(!!errors.badge)}
        />
        {errors.badge?.message && (
          <p className="text-xs text-red-500 font-medium">{errors.badge.message}</p>
        )}
        <div className="flex flex-wrap gap-1 pt-1">
          {BADGE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setValue("badge", preset, { shouldValidate: true })}
              className={cn(
                "px-2 py-0.5 text-[10px] rounded-md transition-all cursor-pointer",
                currentBadge === preset
                  ? theme === "toss"
                    ? "bg-[#3182F6] text-white"
                    : theme === "neobrutalism"
                    ? "bg-black text-white font-bold"
                    : "bg-cyan-400 text-black font-semibold"
                  : theme === "toss"
                  ? "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                  : theme === "neobrutalism"
                  ? "border border-black bg-white text-black hover:bg-yellow-100"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              )}
            >
              #{preset}
            </button>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-black/5 dark:border-white/10">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50",
            theme === "toss" && "text-[#4E5968] hover:bg-[#F2F4F6] tds-pressable",
            theme === "neobrutalism" &&
              "border-2 border-black bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none font-bold",
            theme === "glass" &&
              "text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
          )}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50 shadow-sm",
            theme === "toss" &&
              "bg-[#3182F6] text-white hover:bg-[#2B72D6] tds-pressable",
            theme === "neobrutalism" &&
              "border-2 border-black bg-[#FEF08A] text-black hover:bg-yellow-300 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none font-black",
            theme === "glass" &&
              "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
          )}
        >
          {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          <span>저장하기</span>
        </button>
      </div>
    </form>
  );
}
