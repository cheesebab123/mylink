import { LinkItem, CreateLinkInput, UpdateLinkInput } from "./link";

export type ThemeType = "toss" | "neobrutalism" | "glass";

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface ProfileData {
  username?: string;
  displayName?: string;
  theme?: ThemeType;
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
  user: AuthUser | null;
  isAuthLoading: boolean;
  profile: ProfileData;
  links: LinkItem[];
  isLoadingLinks: boolean;
  isLoadingProfile: boolean;
  setTheme: (theme: ThemeType) => void;
  setUser: (user: AuthUser | null) => void;
  setAuthLoading: (loading: boolean) => void;
  setLinks: (links: LinkItem[]) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (profile: Partial<ProfileData>) => Promise<void>;
  fetchLinks: () => Promise<void>;
  addLink: (link: CreateLinkInput) => Promise<LinkItem>;
  updateLink: (id: string, input: UpdateLinkInput) => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
  toggleLinkActive: (id: string) => Promise<void>;
  incrementClick: (id: string) => Promise<void>;
  resetToDefault: () => void;
}
