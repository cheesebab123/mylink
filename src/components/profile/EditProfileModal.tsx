"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, EditProfileFormValues } from "@/lib/validations/profile";
import { checkUsernameAvailable, UsernameTakenError } from "@/services/profileService";
import { useMyLinkStore } from "@/store/useMyLinkStore";
import { ProfileData, ThemeType } from "@/types";
import { ProfileAvatar } from "./ProfileAvatar";
import { cn } from "@/lib/utils";
import { X, Plus, Loader2, Sparkles, User, Mail, Tag, Camera, Trash2 } from "lucide-react";

const CHARACTER_AVATARS = ["👨‍💻", "👩‍💻", "🦊", "🐱", "🐶", "🐼", "🤖", "🚀", "🦄", "🐻"];

/**
 * 업로드된 이미지를 256x256 정사각형 JPEG Data URL로 리사이즈 및 압축
 */
function resizeImageToDataUrl(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("이미지를 읽지 못했습니다."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("올바른 이미지 파일이 아닙니다."));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("캔버스를 초기화할 수 없습니다."));
          return;
        }
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, maxSize, maxSize);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  theme: ThemeType;
  onSave: (updatedProfile: ProfileData) => Promise<void> | void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  theme,
  onSave,
}: EditProfileModalProps) {
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>(profile.avatarUrl || "");
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = useMyLinkStore((state) => state.user);

  const defaultUsername =
    profile.username || profile.handle?.replace(/^@/, "").toLowerCase() || "";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: defaultUsername,
      name: profile.displayName || profile.name,
      handle: profile.handle,
      avatarText: profile.avatarText || "",
      role: profile.role || "",
      bio: profile.bio || "",
      email: profile.email || "",
      statusBadge: profile.statusBadge || "",
      isStatusOn: profile.isStatusOn ?? true,
    },
  });

  // profile이 변경되었을 때 폼 초기화
  useEffect(() => {
    if (isOpen) {
      const nextUsername =
        profile.username || profile.handle?.replace(/^@/, "").toLowerCase() || "";
      reset({
        username: nextUsername,
        name: profile.displayName || profile.name,
        handle: profile.handle,
        avatarText: profile.avatarText || "",
        role: profile.role || "",
        bio: profile.bio || "",
        email: profile.email || "",
        statusBadge: profile.statusBadge || "",
        isStatusOn: profile.isStatusOn ?? true,
      });
      setSkills(profile.skills || []);
      setSkillInput("");
      setAvatarUrl(profile.avatarUrl || "");
      setPhotoError(null);
    }
  }, [isOpen, profile, reset]);

  // 스크롤 락
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setSkillInput("");
      return;
    }
    setSkills([...skills, trimmed]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError(null);

    if (!file.type.startsWith("image/")) {
      setPhotoError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    try {
      const compressedDataUrl = await resizeImageToDataUrl(file, 256);
      setAvatarUrl(compressedDataUrl);
    } catch (error) {
      console.error("Failed to process profile image:", error);
      setPhotoError("이미지를 처리하는 중 오류가 발생했습니다.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSelectCharacter = (emoji: string) => {
    setAvatarUrl("");
    setPhotoError(null);
    setValue("avatarText", emoji, { shouldDirty: true });
  };

  const onSubmit = async (data: EditProfileFormValues) => {
    const updatedUsername = data.username.trim().toLowerCase();
    const updatedName = data.name.trim();
    const updatedHandle = data.handle.trim();
    const updatedAvatarText = data.avatarText?.trim() || updatedName.charAt(0) || "최";
    const updatedRole = data.role?.trim() || "";
    const updatedBio = data.bio?.trim() || "";
    const updatedEmail = data.email.trim();
    const updatedStatusBadge = data.statusBadge?.trim() || "";
    const updatedIsStatusOn = data.isStatusOn ?? true;

    // 변경사항 dirty check
    const isUnchanged =
      updatedUsername === (profile.username || "") &&
      updatedName === (profile.displayName || profile.name) &&
      updatedHandle === profile.handle &&
      updatedAvatarText === (profile.avatarText || "") &&
      avatarUrl === (profile.avatarUrl || "") &&
      updatedRole === (profile.role || "") &&
      updatedBio === (profile.bio || "") &&
      updatedEmail === (profile.email || "") &&
      updatedStatusBadge === (profile.statusBadge || "") &&
      updatedIsStatusOn === (profile.isStatusOn ?? true) &&
      JSON.stringify(skills) === JSON.stringify(profile.skills || []);

    if (isUnchanged) {
      onClose();
      return;
    }

    // 저장 전 username 중복 체크
    const userId = currentUser?.uid || "anonymous";
    try {
      const isAvailable = await checkUsernameAvailable(updatedUsername, userId);
      if (!isAvailable) {
        setError("username", {
          type: "manual",
          message: "이미 사용 중인 username입니다. 다른 이름을 입력해주세요.",
        });
        return;
      }
    } catch (error) {
      console.error("Failed to check username availability:", error);
    }

    const newProfile: ProfileData = {
      ...profile,
      username: updatedUsername,
      displayName: updatedName,
      name: updatedName,
      handle: updatedHandle,
      avatarText: updatedAvatarText,
      avatarUrl,
      role: updatedRole,
      bio: updatedBio,
      email: updatedEmail,
      statusBadge: updatedStatusBadge,
      isStatusOn: updatedIsStatusOn,
      skills,
    };

    try {
      await onSave(newProfile);
      onClose();
    } catch (error) {
      if (error instanceof UsernameTakenError) {
        setError("username", {
          type: "manual",
          message: "이미 사용 중인 username입니다. 다른 이름을 입력해주세요.",
        });
        return;
      }
      console.error("Failed to update profile:", error);
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 백드롭 오버레이 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 모달 윈도우 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-edit-profile-title"
        className={cn(
          "relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl z-10 overflow-hidden shadow-2xl transition-all animate-in zoom-in-95 duration-200",
          theme === "toss" && "bg-white border border-[#E5E8EB]",
          theme === "neobrutalism" &&
            "bg-white border-3 border-black shadow-[6px_6px_0px_#000] rounded-2xl",
          theme === "glass" &&
            "bg-[#131926]/95 border border-white/15 text-white backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
        )}
      >
        {/* 모달 헤더 */}
        <div
          className={cn(
            "flex items-center justify-between px-6 py-4 border-b shrink-0",
            theme === "toss" && "border-[#F2F4F6]",
            theme === "neobrutalism" && "border-b-2 border-black bg-[#FEF08A]",
            theme === "glass" && "border-white/10"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">👤</span>
            <h2
              id="modal-edit-profile-title"
              className={cn(
                "font-bold text-base",
                theme === "toss" && "text-[#191F28]",
                theme === "neobrutalism" && "text-black font-black text-lg",
                theme === "glass" && "text-white"
              )}
            >
              프로필 정보 수정
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
              theme === "toss" &&
                "text-[#8B95A1] hover:bg-[#F2F4F6] hover:text-[#191F28]",
              theme === "neobrutalism" &&
                "border-2 border-black bg-white text-black hover:bg-yellow-200 shadow-[1px_1px_0px_#000]",
              theme === "glass" && "text-slate-400 hover:text-white hover:bg-white/10"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 모달 스크롤 폼 본문 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
          noValidate
        >
          <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
            {/* 프로필 사진 또는 캐릭터 아이콘 선택 */}
            <div
              className={cn(
                "p-4 rounded-2xl border space-y-3",
                theme === "toss" && "bg-[#F9FAFB] border-[#E5E8EB]",
                theme === "neobrutalism" && "bg-[#FEF08A]/40 border-2 border-black",
                theme === "glass" && "bg-white/[0.04] border-white/15"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ProfileAvatar
                    avatarUrl={avatarUrl}
                    avatarText={watch("avatarText")}
                    name={watch("name") || profile.name}
                    theme={theme}
                    size="xl"
                  />
                  <div className="flex flex-col gap-1">
                    <span className={getLabelStyles()}>프로필 사진 / 캐릭터</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                          "h-8 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
                          theme === "toss" &&
                            "bg-[#3182F6] text-white hover:bg-[#1B64DA] tds-pressable",
                          theme === "neobrutalism" &&
                            "bg-[#BAE6FD] text-black border-2 border-black shadow-[2px_2px_0px_#000] font-black",
                          theme === "glass" &&
                            "bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/30"
                        )}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>사진 업로드</span>
                      </button>

                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl("")}
                          className={cn(
                            "h-8 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer",
                            theme === "toss" &&
                              "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]",
                            theme === "neobrutalism" &&
                              "bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] font-bold",
                            theme === "glass" &&
                              "bg-white/10 text-slate-300 hover:bg-white/20"
                          )}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>사진 제거</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {photoError && (
                <p className="text-xs text-red-500 font-medium">{photoError}</p>
              )}

              {/* 캐릭터 아이콘 선택 */}
              <div className="space-y-1.5">
                <span className={cn("block text-[11px]", theme === "glass" ? "text-slate-400" : "text-[#6B7684]")}>
                  또는 캐릭터 아이콘 선택:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {CHARACTER_AVATARS.map((emoji) => {
                    const isSelected = !avatarUrl && watch("avatarText") === emoji;
                    return (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleSelectCharacter(emoji)}
                        className={cn(
                          "w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer",
                          theme === "toss" &&
                            (isSelected
                              ? "bg-[#E8F3FF] ring-2 ring-[#3182F6]"
                              : "bg-white border border-[#E5E8EB] hover:bg-[#F2F4F6]"),
                          theme === "neobrutalism" &&
                            (isSelected
                              ? "bg-[#FEF08A] border-2 border-black shadow-[2px_2px_0px_#000]"
                              : "bg-white border-2 border-black hover:bg-zinc-100"),
                          theme === "glass" &&
                            (isSelected
                              ? "bg-cyan-500/30 border border-cyan-400 ring-1 ring-cyan-400"
                              : "bg-white/5 border border-white/10 hover:bg-white/15")
                        )}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 공유 URL용 username */}
            <div className="space-y-1.5">
              <label className={getLabelStyles()}>
                사용자 ID (username · 공유 URL용) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="예: honggildong"
                {...register("username")}
                className={getInputStyles(!!errors.username)}
              />
              {errors.username ? (
                <p className="text-xs text-red-500 font-medium">
                  {errors.username.message}
                </p>
              ) : (
                <p className="text-[11px] text-[#8B95A1]">
                  영문 소문자, 숫자, -, _만 가능하며 저장 전 중복 여부를 확인합니다.
                </p>
              )}
            </div>

            {/* 표시 이름(displayName) & 아바타 텍스트 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1.5">
                <label className={getLabelStyles()}>
                  표시 이름 (displayName) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 최혁진"
                  {...register("name")}
                  className={getInputStyles(!!errors.name)}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className={getLabelStyles()}>아바타 글자</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="예: 최"
                  {...register("avatarText")}
                  className={getInputStyles(!!errors.avatarText)}
                />
                {errors.avatarText && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.avatarText.message}
                  </p>
                )}
              </div>
            </div>

            {/* 직무/역할 & 핸들 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className={getLabelStyles()}>직무 / 역할</label>
                <input
                  type="text"
                  placeholder="예: 프론트엔드 개발자"
                  {...register("role")}
                  className={getInputStyles(!!errors.role)}
                />
                {errors.role && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className={getLabelStyles()}>
                  핸들 (@) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: @cheesebab123"
                  {...register("handle")}
                  className={getInputStyles(!!errors.handle)}
                />
                {errors.handle && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.handle.message}
                  </p>
                )}
              </div>
            </div>

            {/* 이메일 주소 (이메일 문의 카드 연동) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className={getLabelStyles()}>
                  이메일 주소 (문의 카드 연동) <span className="text-red-500">*</span>
                </label>
              </div>
              <input
                type="email"
                placeholder="예: choieese.dev@gmail.com"
                {...register("email")}
                className={getInputStyles(!!errors.email)}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 자기소개 (Bio) */}
            <div className="space-y-1.5">
              <label className={getLabelStyles()}>자기소개</label>
              <textarea
                rows={3}
                placeholder="자신을 소개하는 문구를 작성해주세요."
                {...register("bio")}
                className={cn(
                  getInputStyles(!!errors.bio),
                  "h-auto py-2.5 resize-none leading-relaxed"
                )}
              />
              {errors.bio && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* 상태 뱃지 및 토글 */}
            <div className="space-y-2 p-3.5 rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <label className={cn(getLabelStyles(), "flex items-center gap-1.5")}>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  <span>상태 뱃지 (프로젝트 제안/구직 등)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    {...register("isStatusOn")}
                    className="w-4 h-4 rounded text-[#3182F6] focus:ring-0 cursor-pointer accent-[#3182F6]"
                  />
                  <span>표시하기</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="예: 새로운 프로젝트 제안을 환영해요"
                {...register("statusBadge")}
                className={getInputStyles(!!errors.statusBadge)}
              />
            </div>

            {/* 스킬 태그 목록 관리 */}
            <div className="space-y-2">
              <label className={getLabelStyles()}>스킬 태그</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="예: React, TypeScript (입력 후 Enter)"
                  className={getInputStyles()}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className={cn(
                    "px-4 h-11 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1",
                    theme === "toss" &&
                      "bg-[#E8F3FF] text-[#3182F6] hover:bg-[#D4E8FF]",
                    theme === "neobrutalism" &&
                      "bg-white text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] hover:bg-yellow-200",
                    theme === "glass" &&
                      "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                  )}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>추가</span>
                </button>
              </div>

              {/* 태그 리스트 */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all",
                        theme === "toss" && "bg-[#F2F4F6] text-[#4E5968]",
                        theme === "neobrutalism" &&
                          "bg-white border-2 border-black text-black font-bold shadow-[2px_2px_0px_#000]",
                        theme === "glass" &&
                          "bg-white/10 text-slate-200 border border-white/15 backdrop-blur-sm"
                      )}
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:opacity-75 cursor-pointer ml-0.5"
                        aria-label={`${skill} 삭제`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 모달 하단 액션 버튼 */}
          <div
            className={cn(
              "px-6 py-4 border-t flex items-center justify-end gap-2.5 shrink-0",
              theme === "toss" && "border-[#F2F4F6] bg-white",
              theme === "neobrutalism" && "border-t-2 border-black bg-white",
              theme === "glass" && "border-white/10 bg-[#131926]"
            )}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className={cn(
                "px-4 h-11 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                theme === "toss" &&
                  "bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]",
                theme === "neobrutalism" &&
                  "bg-white text-black border-2 border-black font-black shadow-[2px_2px_0px_#000] hover:bg-zinc-100",
                theme === "glass" &&
                  "bg-white/10 text-slate-300 hover:bg-white/15"
              )}
            >
              취소
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-5 h-11 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm",
                theme === "toss" &&
                  "bg-[#3182F6] text-white hover:bg-[#2B72D6] tds-pressable",
                theme === "neobrutalism" &&
                  "bg-[#A7F3D0] text-black border-2 border-black font-black shadow-[3px_3px_0px_#000] hover:bg-[#86efac] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]",
                theme === "glass" &&
                  "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>저장 중...</span>
                </>
              ) : (
                <span>저장하기</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
