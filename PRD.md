# 📄 제품 요구사항 명세서 (PRD): 마이링크 (myLink)

> **💡 개발 진행 전략 (시연 및 단계별 접근)**:  
> 본 프로젝트는 **시연(Demo) 및 검증**을 위해 단계별(Phased)로 진행됩니다.  
> **1단계(현재)**에서는 백엔드 DB와 복잡한 관리자 대시보드/통계 기능을 보류하고, **Zustand + 로컬스토리지(localStorage)**를 활용하여 완성도 높은 **프로필 페이지와 3종 테마 전환**을 우선 구축합니다.

---

## 1. 프로젝트 개요 (Overview)
- **서비스명**: 마이링크 (myLink)
- **서비스 정의**: 나만의 링크, 포트폴리오, SNS, 작업물을 한곳에 모아 보여주는 1인 전용 올인원 링크트리 클론 서비스
- **개발 목적**: 시연 가능한 인터랙티브 프로필 페이지 구축, 개인 브랜딩 강화, 다양한 테마 경험 제공
- **핵심 가치**:
  - 🎨 **3종 테마 프리셋**: 토스 디자인 시스템(TDS, 기본), 네오브루탈리즘, 다크 글래스모피즘 즉시 전환
  - ⚡ **로컬 데이터 영속성**: Zustand + `localStorage`를 통한 데이터/테마 즉시 저장 및 유지
  - 📱 **모바일 최적화**: 모바일 셸 환경에 최적화된 반응형 UI 및 부드러운 인터랙션

---

## 2. 사용자 페르소나 및 대상 (Target Audience)
- **소유자/시연자 (Owner/Presenter)**: 프로필 정보 및 링크를 실시간으로 조작하고 다양한 테마를 발표/시연하는 사용자
- **방문자 (Visitor)**: 채용 담당자, 협업 제안자, SNS 팔로워 등 포트폴리오와 링크를 탐색하는 사용자

---

## 3. 사용자 시나리오 (User Scenarios)

### 시나리오 1: 방문자(채용 담당자/협업자)의 프로필 탐색 및 문의
1. **접속**: SNS나 이력서에 기재된 링크를 통해 마이링크(`myLink`) 프로필 페이지에 방문합니다.
2. **정보 확인**: 깔끔하게 정돈된 프로필 카드에서 아바타, 이름, 직무, 소개글, 기술 스택 태그와 "프로젝트 제안 환영" 뱃지를 확인합니다.
3. **링크 탐색**: 정렬된 링크 카드(GitHub, 기술 블로그, 포트폴리오 등)를 둘러보고 관심 있는 카드를 클릭하여 새 탭에서 프로젝트를 탐색합니다. (백그라운드에서 실시간 클릭수가 집계됩니다.)
4. **연락**: 이메일 카드 우측의 [복사] 버튼을 눌러 이메일 주소를 클립보드에 복사하고, "이메일 주소를 복사했어요" 토스트 알림을 확인한 후 제안 메일을 발송합니다.

### 시나리오 2: 시연자(발표자)의 실시간 3종 테마 전환 시연
1. **시연 시작**: 상단 TopBar의 테마 스위처를 열어 현재 기본 테마인 **토스(TDS)** 모던 미니멀 UI를 소개합니다.
2. **네오브루탈리즘 전환**: 테마 스위처에서 `Neobrutalism`을 선택합니다. 페이지 전체가 볼드한 블랙 테두리, 하드 섀도우, 비비드 팝 컬러, 레트로 윈도우 UI로 즉시 전환되는 인터랙션을 시연합니다.
3. **다크 글래스 전환**: `Dark Glass`를 선택하여 딥 다크 배경, 반투명 블러 백드롭, 네온 글로우가 적용된 사이버 룩앤필을 선보입니다.
4. **새로고침 검증**: 브라우저를 새로고침하여도 `localStorage`에 상태가 보존되어 방금 선택한 테마와 데이터가 그대로 유지됨을 검증합니다.

### 시나리오 3: 소유자의 원클릭 프로필 링크 공유
1. **공유 버튼 클릭**: 모바일 또는 데스크톱 브라우저 우측 상단의 [공유] 아이콘 버튼을 탭합니다.
2. **토스트 피드백**: 현재 페이지 URL이 클립보드에 복사되며 "프로필 링크를 복사했어요" 토스트 알림이 팝업됩니다.
3. **전송**: 메신저(카카오톡, 슬랙 등)에 붙여넣어 상대방에게 즉시 내 링크트리를 공유합니다.

---

## 4. 기술 스택 (Tech Stack)

| 구분 | 1단계 (현재 시연 범위) | 2단계 (향후 고도화 범위) |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Next.js 16 (App Router) |
| **Language** | TypeScript | TypeScript |
| **Styling** | Tailwind CSS v4, Lucide React | Tailwind CSS v4, Lucide React |
| **State Management** | **Zustand (with `persist` localStorage)** | Zustand + React Server Actions |
| **Storage / DB** | **Browser `localStorage`** | **SQLite + Prisma ORM** (PostgreSQL 호환) |
| **Authentication** | — (시연 모드) | JWT / Session 기반 관리자 인증 (`/admin`) |

---

## 5. 정보 구조도 (Information Architecture)

```
[마이링크 (myLink)]
 └── 🌐 프로필 메인 화면 (/)
      ├── 상단 TopBar
      │    ├── myLink 로고 & 타이틀
      │    ├── 🎨 테마 스위처 (TDS / 네오브루탈리즘 / 다크 글래스 전환)
      │    └── 프로필 링크 공유 버튼
      │
      ├── 프로필 헤더 카드
      │    ├── 아바타, 이름, 직무/역할
      │    ├── 프로젝트 제안 상태 칩 (Open for Work)
      │    ├── 친절한 소개글 (Bio)
      │    └── 스킬 태그 리스트
      │
      ├── 링크 목록 영역 (ListRows)
      │    ├── 아이콘, 제목, 설명, 뱃지
      │    ├── 클릭 시 새 탭 이동 및 로컬 클릭 카운트 증가
      │    └── 테마별 맞춤형 카드 스타일링
      │
      ├── 연락처 & 이메일 카드
      │    └── 원클릭 이메일 복사 및 피드백
      │
      ├── 하단 고정 Primary CTA (BottomCTA)
      │    └── 이메일 바로 보내기 액션
      │
      └── 전역 토스트 (Toast)
           └── 복사 완료 및 테마 변경 피드백 알림
```

---

## 6. 핵심 기능 요구사항 (Functional Requirements)

### 6.1. 1단계: 프로필 페이지 및 로컬 상태 관리 (현재 개발 범위)
1. **Zustand 스토어 기반 데이터 관리 (`localStorage` 영속화)**
   - `profile`: 이름, 역할, 핸들, 소개글, 아바타, 상태 뱃지, 스킬 목록
   - `links`: 링크 목록(id, title, url, description, icon, badge, clicks, isActive)
   - `theme`: 현재 선택된 테마 (`'toss'` | `'neobrutalism'` | `'glass'`)
   - 초기 접속 시 기본 데이터가 로드되며, 수정/클릭 발생 시 로컬스토리지에 자동 동기화

2. **3종 테마 시스템 (Theme Switcher)**
   - **Toss (토스 디자인 시스템, 기본)**: 미니멀 그레이스케일, 토스 블루(`#3182F6`), 둥근 라운드, 차분하고 정갈한 가독성
   - **Neobrutalism (네오브루탈리즘)**: 볼드한 블랙 보더, 하드 섀도우, 비비드 옐로우/핑크 팝 컬러, 레트로 윈도우 UI
   - **Dark Glass (다크 글래스모피즘)**: 딥 다크 배경, 반투명 블러 백드롭, 사이버 네온 글로우

3. **인터랙션 및 피드백**
   - 링크 클릭 시 카운트 증가 및 외부 링크 새 탭 오픈
   - 이메일 복사 / 링크 공유 시 즉각적인 토스트 팝업 안내
   - 부드러운 테마 전환 트랜지션

### 6.2. 2단계: 관리자 대시보드 및 백엔드 고도화 (추후 진행)
1. **관리자 인증 (`/admin/login`)**: 비밀번호 기반 세션 인증
2. **링크 관리 대시보드 (`/admin`)**:
   - 링크 CRUD 모달 및 폼
   - `@dnd-kit` 드래그 앤 드롭 링크 순서 변경
   - 공개/비공개 토글 스위치
3. **클릭 통계 및 분석**: 링크별 실시간 클릭수 집계 및 간단한 통계 지표
4. **Prisma + DB 영속화**: 서버 사이드 데이터베이스 저장

---

## 7. 데이터 스키마 정의 (TypeScript Interface)

```typescript
export type ThemeType = 'toss' | 'neobrutalism' | 'glass';

export interface ProfileData {
  name: string;
  handle: string;
  avatarText: string;
  role: string;
  bio: string;
  email: string;
  statusBadge: string;
  isStatusOn: boolean;
  skills: string[];
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
  icon: string; // 'Github' | 'BookOpen' | 'Layers' | 'Palette' | 'ExternalLink' 등
  badge?: string;
  order: number;
  isActive: boolean;
  clicks: number;
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
```

---

## 8. 단계별 개발 마일스톤 (Milestones)

- **[현재] Phase 1: 시연용 프로필 페이지 & 로컬 테마 시스템**
  - Zustand `persist` 스토어 구성 (`localStorage`)
  - 3종 테마 전환 스위처 및 테마별 UI 스타일 완성
  - 프로필, 링크 리스트, 연락처 카드, 토스트 연동
- **[보류/차후] Phase 2: 관리자 대시보드 & DB 구축**
  - SQLite + Prisma ORM 스키마 구축
  - `/admin` 링크 추가/수정/삭제 및 드래그 앤 드롭
  - 링크 클릭 통계 대시보드
