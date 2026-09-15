<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 사용자 작업 및 대화 규칙 (User Guidelines)

## 1. 질문과 실행 요청의 엄격한 구분
- **단순 질문 및 상태 확인**:
  - 질문형 어미(~인가요?, ~볼 수 있어?, 왜 그런가요?, 이건 뭐야? 등)이거나 호기심/확인 질문인 경우, **임의로 코드를 수정하거나 터미널 명령을 실행하지 말고 친절한 설명과 답변만 제공**할 것.
- **명시적 실행 지시**:
  - 명확한 지시(~해줘, ~만들어줘, ~수정해줘, ~커밋해줘, ~실행해줘, ~추가해줘 등)가 있을 때만 실제로 파일 수정, 생성, 터미널 실행 등의 액션을 취할 것.

## 2. 작업 수행 시 자율성 원칙
- 명시적인 실행 요청을 수행할 때는 중간에 불필요한 확인 질문을 반복하지 말고, **끝까지 작업을 자율적으로 완수한 뒤 최종 결과만 깔끔하게 보고**할 것.

## 3. 답변 스타일
- 불필요한 사족을 줄이고 핵심 위주로 명확하고 직관적으로 설명할 것.
