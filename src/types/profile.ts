import { LinkItem } from "./link";

export type ThemeType = "toss" | "neobrutalism" | "glass";

export interface ProfileData {
  name: string;
  handle: string;
  avatarText: string;
  avatarUrl?: string;
  role: string;
  bio: string;
  email: string;
  statusBadge: string;
  isStatusOn: boolean;
  skills: string[];
}

export interface MyLinkState {
  theme: ThemeType;
  profile: ProfileData;
  links: LinkItem[];
  setTheme: (theme: ThemeType) => void;
  updateProfile: (profile: Partial<ProfileData>) => void;
  incrementClick: (id: string) => void;
  resetToDefault: () => void;
}
