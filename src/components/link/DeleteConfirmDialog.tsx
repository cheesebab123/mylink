"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { ThemeType } from "@/types";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  linkTitle: string;
  theme: ThemeType;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  linkTitle,
  theme,
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to delete link:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        if (!isDeleting) onClose();
      }}
      title="정말 삭제하시겠습니까?"
      theme={theme}
      className="max-w-sm"
    >
      <div className="space-y-4 pt-1">
        {/* 링크 이름 안내 및 경고 박스 */}
        <div
          className={cn(
            "p-3.5 rounded-2xl flex flex-col gap-2",
            theme === "toss" && "bg-red-50/60 border border-red-100",
            theme === "neobrutalism" && "bg-[#FEE2E2] border-2 border-black shadow-[2px_2px_0px_#000]",
            theme === "glass" && "bg-red-950/30 border border-red-500/20"
          )}
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <p
                className={cn(
                  "text-sm font-semibold truncate",
                  theme === "toss" && "text-[#191F28]",
                  theme === "neobrutalism" && "text-black font-black",
                  theme === "glass" && "text-white"
                )}
              >
                &apos;{linkTitle}&apos;
              </p>
              <p className="text-xs text-red-500 font-bold mt-1">
                이 작업은 되돌릴 수 없습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-50",
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
            type="button"
            disabled={isDeleting}
            onClick={handleConfirm}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50",
              theme === "toss" &&
                "bg-[#F04452] text-white hover:bg-[#D93844] tds-pressable shadow-sm",
              theme === "neobrutalism" &&
                "border-2 border-black bg-[#EF4444] text-white hover:bg-red-600 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] font-black",
              theme === "glass" &&
                "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            )}
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>삭제하기</span>
          </button>
        </div>
      </div>
    </Dialog>
  );
}
