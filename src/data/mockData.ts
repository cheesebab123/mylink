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
