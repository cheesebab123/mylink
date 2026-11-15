import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MyLinkState, ThemeType, ProfileData, LinkItem, CreateLinkInput, UpdateLinkInput } from "@/types";
import { DUMMY_PROFILE } from "@/data/mockData";
import {
  createLink as firestoreCreateLink,
  getLinks as firestoreGetLinks,
  updateLink as firestoreUpdateLink,
  deleteLink as firestoreDeleteLink,
  toggleLinkActive as firestoreToggleLinkActive,
  incrementClick as firestoreIncrementClick,
} from "@/services/linkService";
import {
  getProfile as firestoreGetProfile,
  updateProfileInFirestore,
} from "@/services/profileService";

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set, get) => ({
      theme: "toss",
      profile: DUMMY_PROFILE,
      links: [],
      isLoadingLinks: false,
      isLoadingProfile: false,

      setTheme: (theme: ThemeType) => set({ theme }),

      setLinks: (links: LinkItem[]) => set({ links }),

      // Firestore에서 프로필 데이터 1회 조회
      fetchProfile: async () => {
        set({ isLoadingProfile: true });
        try {
          const profile = await firestoreGetProfile();
          set({ profile, isLoadingProfile: false });
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          set({ isLoadingProfile: false });
        }
      },

      // 프로필 수정: 로컬 상태 즉시 반영 + Firestore 저장 (실패 시 롤백)
      updateProfile: async (updatedFields: Partial<ProfileData>) => {
        const previousProfile = get().profile;
        const newProfile: ProfileData = {
          ...previousProfile,
          ...updatedFields,
        };

        set({ profile: newProfile });

        try {
          await updateProfileInFirestore(newProfile);
        } catch (error) {
          console.error("Failed to update profile in Firestore:", error);
          set({ profile: previousProfile });
          throw error;
        }
      },

      // 페이지 최초 진입 시 Firestore에서 링크 목록 1회 조회
      fetchLinks: async () => {
        set({ isLoadingLinks: true });
        try {
          const links = await firestoreGetLinks();
          set({ links, isLoadingLinks: false });
        } catch (error) {
          console.error("Failed to fetch links via getDocs:", error);
          set({ isLoadingLinks: false });
        }
      },

      // 새 링크 추가: 파이어스토어 저장 후 로컬 상태 최상단에 즉시 추가 (서버 재호출 없음)
      addLink: async (newLinkData: CreateLinkInput): Promise<LinkItem> => {
        try {
          const createdLink = await firestoreCreateLink(newLinkData);
          set((state) => ({
            links: [createdLink, ...state.links.filter((l) => l.id !== createdLink.id)],
          }));
          return createdLink;
        } catch (error) {
          console.error("Failed to add link to Firestore:", error);
          throw error;
        }
      },

      // 링크 수정: 로컬 상태 즉시 반영 + 파이어스토어 업데이트 (실패 시 롤백)
      updateLink: async (id: string, input: UpdateLinkInput): Promise<void> => {
        const previousLinks = get().links;
        const now = new Date().toISOString();

        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? {
                  ...link,
                  ...input,
                  updatedAt: now,
                }
              : link
          ),
        }));

        try {
          await firestoreUpdateLink(id, input);
        } catch (error) {
          console.error("Failed to update link in Firestore:", error);
          set({ links: previousLinks });
          throw error;
        }
      },

      // 링크 삭제: 로컬 상태 즉시 제거 + 파이어스토어 삭제 (실패 시 롤백)
      deleteLink: async (id: string) => {
        const previousLinks = get().links;
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));

        try {
          await firestoreDeleteLink(id);
        } catch (error) {
          console.error("Failed to delete link in Firestore:", error);
          set({ links: previousLinks });
          throw error;
        }
      },

      // 링크 공개/비공개 토글: 로컬 상태 즉시 반영 + 파이어스토어 업데이트 (실패 시 롤백)
      toggleLinkActive: async (id: string) => {
        const previousLinks = get().links;
        const targetLink = previousLinks.find((l) => l.id === id);
        if (!targetLink) return;

        const nextActive = !targetLink.isActive;
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? {
                  ...link,
                  isActive: nextActive,
                  updatedAt: new Date().toISOString(),
                }
              : link
          ),
        }));

        try {
          await firestoreToggleLinkActive(id, targetLink.isActive);
        } catch (error) {
          console.error("Failed to toggle link active status:", error);
          set({ links: previousLinks });
          throw error;
        }
      },

      // 링크 클릭수 카운트: 로컬 상태 즉시 증가 + 파이어스토어 업데이트
      incrementClick: async (id: string) => {
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? {
                  ...link,
                  clicks: (link.clicks || 0) + 1,
                  updatedAt: new Date().toISOString(),
                }
              : link
          ),
        }));

        try {
          await firestoreIncrementClick(id);
        } catch (error) {
          console.error("Failed to increment click in Firestore:", error);
        }
      },

      resetToDefault: () =>
        set({
          theme: "toss",
          profile: DUMMY_PROFILE,
        }),
    }),
    {
      name: "mylink-storage",
      storage: createJSONStorage(() => localStorage),
      // Firestore가 링크의 원천이므로 profile과 theme만 로컬 스토리지에 영속화
      partialize: (state) => ({
        theme: state.theme,
        profile: state.profile,
      }),
    }
  )
);
