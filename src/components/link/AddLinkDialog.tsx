"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/Dialog";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { addLinkSchema, AddLinkFormValues } from "@/lib/validations/link";
import { ThemeType } from "@/types";
import { cn } from "@/lib/utils";

interface AddLinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink: (data: {
    title: string;
    url: string;
    description?: string;
    icon?: string;
    badge?: string;
  }) => void | Promise<void>;
  theme: ThemeType;
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

export function AddLinkDialog({
  isOpen,
  onClose,
  onAddLink,
  theme,
}: AddLinkDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkFormValues>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      icon: "Globe",
      badge: "",
    },
    mode: "onTouched",
  });

  const selectedIcon = watch("icon") || "Globe";
  const currentBadge = watch("badge") || "";

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        url: "",
        description: "",
        icon: "Globe",
        badge: "",
      });
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: AddLinkFormValues) => {
    let formattedUrl = data.url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      await onAddLink({
        title: data.title.trim(),
        url: formattedUrl,
        description: data.description?.trim() || undefined,
        icon: data.icon || "Globe",
        badge: data.badge?.trim() || undefined,
      });
      handleClose();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  // Helper styles based on theme
  const getInputStyles = (hasError?: boolean) => {
    if (theme === "toss") {
      return cn(
        "w-full h-11 px-3.5 rounded-xl text-sm transition-all outline-none",
        "bg-[#F2F4F6] text-[#191F28] placeholder:text-[#8B95A1] border border-transparent",
        "focus:bg-white focus:border-[#3182F6]",
        hasError && "border-[#F04452] bg-red-50/50 focus:border-[#F04452]"
      );
    }
    if (theme === "neobrutalism") {
      return cn(
        "w-full h-11 px-3.5 rounded-lg text-sm font-bold transition-all outline-none",
        "bg-white text-black placeholder:text-zinc-400 border-2 border-black shadow-[2px_2px_0px_#000]",
        "focus:bg-[#FEF08A] focus:shadow-[3px_3px_0px_#000]",
        hasError && "border-red-600 bg-red-50"
      );
    }
    // Glass
    return cn(
      "w-full h-11 px-3.5 rounded-xl text-sm transition-all outline-none",
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
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="새 링크 추가"
      description="나만의 프로필 페이지에 노출할 링크 정보를 입력해주세요."
      theme={theme}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1" noValidate>
        {/* 링크 제목 (필수) */}
        <div className="space-y-1.5">
          <label htmlFor="link-title" className={getLabelStyles()}>
            링크 제목 <span className="text-red-500">*</span>
          </label>
          <input
            id="link-title"
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

        {/* 연결할 URL (필수) */}
        <div className="space-y-1.5">
          <label htmlFor="link-url" className={getLabelStyles()}>
            URL 주소 <span className="text-red-500">*</span>
          </label>
          <input
            id="link-url"
            type="text"
            {...register("url")}
            placeholder="예: https://example.com 또는 github.com"
            className={getInputStyles(!!errors.url)}
          />
          {errors.url?.message && (
            <p className="text-xs text-red-500 font-medium">{errors.url.message}</p>
          )}
        </div>

        {/* 설명 (선택) */}
        <div className="space-y-1.5">
          <label htmlFor="link-description" className={getLabelStyles()}>
            설명 (선택)
          </label>
          <input
            id="link-description"
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
        <div className="space-y-1.5">
          <label className={getLabelStyles()}>아이콘 선택</label>
          <div className="grid grid-cols-6 gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 max-h-28 overflow-y-auto">
            {ICON_PRESETS.map((item) => {
              const isSelected = selectedIcon === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setValue("icon", item.name, { shouldValidate: true })}
                  title={item.label}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg transition-all text-xs cursor-pointer",
                    isSelected
                      ? theme === "toss"
                        ? "bg-[#3182F6] text-white shadow-sm font-semibold"
                        : theme === "neobrutalism"
                        ? "bg-[#FEF08A] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000]"
                        : "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      : theme === "toss"
                      ? "text-[#6B7684] hover:bg-[#E5E8EB]/60 hover:text-[#191F28]"
                      : theme === "neobrutalism"
                      ? "text-black hover:bg-zinc-200"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <DynamicIcon name={item.name} className="w-4 h-4 mb-0.5" />
                  <span className="text-[10px] leading-tight truncate w-full text-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 뱃지 (선택) */}
        <div className="space-y-1.5">
          <label htmlFor="link-badge" className={getLabelStyles()}>
            뱃지 태그 (선택)
          </label>
          <input
            id="link-badge"
            type="text"
            {...register("badge")}
            placeholder="예: 추천, 포트폴리오 등"
            className={getInputStyles(!!errors.badge)}
          />
          {errors.badge?.message && (
            <p className="text-xs text-red-500 font-medium">{errors.badge.message}</p>
          )}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {BADGE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setValue("badge", preset, { shouldValidate: true })}
                className={cn(
                  "px-2 py-0.5 text-[11px] rounded-md transition-all cursor-pointer",
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

        {/* 하단 버튼 액션 */}
        <div className="flex items-center justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
              theme === "toss" && "text-[#4E5968] hover:bg-[#F2F4F6] tds-pressable",
              theme === "neobrutalism" &&
                "border-2 border-black bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
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
              "px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer disabled:opacity-50",
              theme === "toss" &&
                "bg-[#3182F6] text-white hover:bg-[#2B72D6] tds-pressable shadow-sm",
              theme === "neobrutalism" &&
                "border-2 border-black bg-[#FEF08A] text-black hover:bg-yellow-300 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]",
              theme === "glass" &&
                "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            )}
          >
            링크 추가하기
          </button>
        </div>
      </form>
    </Dialog>
  );
}
