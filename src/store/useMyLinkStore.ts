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
