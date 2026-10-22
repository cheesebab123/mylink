import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MyLinkState, ThemeType, ProfileData } from "@/types";
import { DUMMY_PROFILE, DUMMY_LINKS } from "@/data/mockData";

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set) => ({
      theme: "toss",
      profile: DUMMY_PROFILE,
      links: DUMMY_LINKS,

      setTheme: (theme: ThemeType) => set({ theme }),

      updateProfile: (updatedProfile: Partial<ProfileData>) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updatedProfile,
          },
        })),

      addLink: (newLinkData) =>
        set((state) => {
          const now = new Date().toISOString();
          const newLink = {
            ...newLinkData,
            id: `link-${Date.now()}`,
            clicks: 0,
            isActive: newLinkData.isActive ?? true,
            order: newLinkData.order ?? state.links.length + 1,
            createdAt: now,
            updatedAt: now,
          };
          return {
            links: [...state.links, newLink],
          };
        }),

      deleteLink: (id: string) =>
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        })),

      toggleLinkActive: (id: string) =>
        set((state) => ({
          links: state.links.map((link) =>
            link.id === id
              ? {
                  ...link,
                  isActive: !link.isActive,
                  updatedAt: new Date().toISOString(),
                }
              : link
          ),
        })),

      incrementClick: (id: string) =>
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
        })),

      resetToDefault: () =>
        set({
          theme: "toss",
          profile: DUMMY_PROFILE,
          links: DUMMY_LINKS,
        }),
    }),
    {
      name: "mylink-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
