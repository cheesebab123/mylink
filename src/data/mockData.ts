import { LinkItem } from "@/types";

export interface MockProfile {
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

export const DUMMY_PROFILE: MockProfile = {
  name: "최혁진",
  handle: "@cheesebab123",
  avatarText: "최",
  role: "프론트엔드 개발자",
  bio: "인터랙티브한 사용자 경험과 감각적인 UI/UX를 고민하며 가치 있는 서비스를 만들어요.",
  email: "choieese.dev@gmail.com",
  statusBadge: "새로운 프로젝트 제안을 환영해요",
  isStatusOn: true,
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "멀티미디어",
  ],
};

export const DUMMY_LINKS: LinkItem[] = [
  {
    id: "link-1",
    title: "GitHub 저장소",
    url: "https://github.com/cheesebab123",
    description: "오픈소스 기여 및 개인 프로젝트 소스 코드를 확인해보세요",
    icon: "Github",
    badge: "오픈소스",
    category: "development",
    clicks: 128,
    isActive: true,
    order: 1,
    createdAt: "2026-05-11T09:00:00.000Z",
    updatedAt: "2026-10-10T10:00:00.000Z",
  },
  {
    id: "link-2",
    title: "기술 블로그 & 개발 회고",
    url: "https://velog.io/@cheesebab123",
    description: "프론트엔드 학습 기록과 트러블슈팅 아티클을 모아뒀어요",
    icon: "BookOpen",
    badge: "아티클",
    category: "blog",
    clicks: 245,
    isActive: true,
    order: 2,
    createdAt: "2026-05-15T14:30:00.000Z",
    updatedAt: "2026-10-09T18:20:00.000Z",
  },
  {
    id: "link-3",
    title: "마이링크 (myLink) 프로젝트",
    url: "https://github.com/cheesebab123/mylink",
    description: "Next.js 16과 토스 디자인 시스템(TDS)으로 구축한 올인원 링크트리",
    icon: "Layers",
    badge: "포트폴리오",
    category: "portfolio",
    clicks: 312,
    isActive: true,
    order: 3,
    createdAt: "2026-06-01T11:00:00.000Z",
    updatedAt: "2026-10-10T08:30:00.000Z",
  },
  {
    id: "link-4",
    title: "UI/UX 인터랙션 쇼케이스",
    url: "https://getdesign.kr",
    description: "멀티미디어 전공 기반의 감각적인 웹 인터페이스 & 모션 작업물",
    icon: "Palette",
    badge: "디자인",
    category: "design",
    clicks: 89,
    isActive: true,
    order: 4,
    createdAt: "2026-07-20T16:00:00.000Z",
    updatedAt: "2026-09-28T12:00:00.000Z",
  },
  {
    id: "link-5",
    title: "상세 이력서 & 포트폴리오 노션",
    url: "https://notion.so/cheesebab123",
    description: "경력 기술서, 프로젝트 회고, 주요 성과를 정리한 노션 페이지예요",
    icon: "FileText",
    badge: "이력서",
    category: "resume",
    clicks: 174,
    isActive: true,
    order: 5,
    createdAt: "2026-08-10T10:15:00.000Z",
    updatedAt: "2026-10-08T15:40:00.000Z",
  },
  {
    id: "link-6",
    title: "LinkedIn 프로필",
    url: "https://linkedin.com/in/cheesebab123",
    description: "커리어 네트워킹과 다양한 커피챗 제안을 기다려요",
    icon: "Share2",
    badge: "네트워킹",
    category: "social",
    clicks: 56,
    isActive: true,
    order: 6,
    createdAt: "2026-09-01T13:00:00.000Z",
    updatedAt: "2026-10-05T09:20:00.000Z",
  },
];
