export const APP_CONFIG = {
  name: "myLink",
  description: "나만의 링크를 한 곳에서 관리하고 공유하는 마이링크 서비스",
  url: "https://mylink.example.com",
} as const;

export const NAV_LINKS = [
  { label: "홈", href: "/" },
  { label: "내 링크", href: "/links" },
  { label: "통계", href: "/analytics" },
] as const;
