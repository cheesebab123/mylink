"use client";

import { useEffect } from "react";
import { subscribeAuthState } from "@/services/authService";
import { useMyLinkStore } from "@/store/useMyLinkStore";

/**
 * 앱 전역에서 Firebase Auth 상태(onAuthStateChanged)를 감지하고
 * 사용자별 Firestore 데이터를 동기화하는 초기화 컴포넌트
 */
export function AuthInitializer() {
  const setUser = useMyLinkStore((state) => state.setUser);
  const setAuthLoading = useMyLinkStore((state) => state.setAuthLoading);
  const fetchProfile = useMyLinkStore((state) => state.fetchProfile);
  const fetchLinks = useMyLinkStore((state) => state.fetchLinks);

  useEffect(() => {
    const unsubscribe = subscribeAuthState((authUser) => {
      setUser(authUser);
      setAuthLoading(false);
      // 로그인/로그아웃 상태 변경 시 users/{uid} 또는 users/anonymous 데이터로 갱신
      fetchProfile();
      fetchLinks();
    });

    return () => unsubscribe();
  }, [setUser, setAuthLoading, fetchProfile, fetchLinks]);

  return null;
}
