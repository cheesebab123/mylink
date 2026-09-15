import { LinkItem, CreateLinkInput, UpdateLinkInput } from "@/types";

// Mock Initial Data for Scaffolding
export const INITIAL_LINKS: LinkItem[] = [
  {
    id: "1",
    title: "GitHub 저장소",
    url: "https://github.com",
    description: "오픈소스 프로젝트 및 코드 저장소",
    clicks: 128,
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "공식 블로그",
    url: "https://velog.io",
    description: "개발 및 기술 아티클 공유 블로그",
    clicks: 84,
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "LinkedIn 프로필",
    url: "https://linkedin.com",
    description: "비즈니스 및 경력 프로필",
    clicks: 45,
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getLinks(): Promise<LinkItem[]> {
  return Promise.resolve(INITIAL_LINKS);
}

export async function createLink(input: CreateLinkInput): Promise<LinkItem> {
  const newLink: LinkItem = {
    ...input,
    id: Math.random().toString(36).substring(2, 9),
    clicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(newLink);
}

export async function updateLink(id: string, input: UpdateLinkInput): Promise<LinkItem | null> {
  const existing = INITIAL_LINKS.find((item) => item.id === id);
  if (!existing) return null;
  const updated: LinkItem = {
    ...existing,
    ...input,
    updatedAt: new Date().toISOString(),
  };
  return Promise.resolve(updated);
}
