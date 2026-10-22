import { chromium } from "playwright";

async function runValidationTest() {
  console.log("🚀 Starting Zod & React Hook Form Validation Browser Test...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();

  try {
    // 1. 마이페이지 접속
    console.log("1. Navigating to http://localhost:3000/mypage ...");
    await page.goto("http://localhost:3000/mypage", { waitUntil: "networkidle" });

    // 2. '새 링크 추가' 버튼 클릭 -> 다이얼로그 오픈
    console.log("2. Opening Add Link Dialog...");
    const addBtn = page.getByRole("button", { name: "새 링크 추가" });
    await addBtn.click();

    const dialogTitle = page.getByRole("heading", { name: "새 링크 추가" });
    await dialogTitle.waitFor({ state: "visible" });
    console.log("✓ Dialog opened!");

    // 3. 빈 폼 제출 시도 (유효성 검증 테스트 1: 필수값 누락)
    console.log("3. Submitting empty form to test required field validation...");
    const submitBtn = page.getByRole("button", { name: "링크 추가하기", exact: true });
    await submitBtn.click();

    // 에러 메시지 노출 검증
    const titleError = page.getByText("링크 제목을 입력해주세요.");
    await titleError.waitFor({ state: "visible" });
    console.log("✓ Title required validation error displayed: '링크 제목을 입력해주세요.'");

    const urlError = page.getByText("URL 주소를 입력해주세요.");
    await urlError.waitFor({ state: "visible" });
    console.log("✓ URL required validation error displayed: 'URL 주소를 입력해주세요.'");

    // 4. 잘못된 URL 입력 시도 (유효성 검증 테스트 2: URL 형식 오류)
    console.log("4. Entering invalid URL format to test regex/URL validation...");
    await page.fill('#link-title', "검증 테스트 제목");
    await page.fill('#link-url', "not-a-valid-url-format");
    await submitBtn.click();

    const invalidUrlError = page.getByText("올바른 웹사이트 URL 형식을 입력해주세요.");
    await invalidUrlError.waitFor({ state: "visible" });
    console.log("✓ URL format validation error displayed: '올바른 웹사이트 URL 형식을 입력해주세요.'");

    // 5. 올바른 정보 입력 후 제출 (유효성 통과 테스트)
    console.log("5. Entering valid inputs and submitting...");
    await page.fill('#link-url', "https://github.com/facebook/react");
    await page.fill('#link-description', "리액트 공식 깃허브 저장소");

    // 아이콘 선택
    const iconBtn = page.locator('button[title="코드"]');
    if (await iconBtn.isVisible()) {
      await iconBtn.click();
      console.log("✓ Selected icon: Code");
    }

    // 뱃지 선택
    const badgeBtn = page.getByRole("button", { name: "#오픈소스" });
    if (await badgeBtn.isVisible()) {
      await badgeBtn.click();
      console.log("✓ Selected badge: #오픈소스");
    }

    await submitBtn.click();

    // 6. 성공 토스트 및 등록 결과 검증
    console.log("6. Verifying successful submission...");
    const successToast = page.getByText("'검증 테스트 제목' 링크를 추가했어요");
    await successToast.waitFor({ state: "visible", timeout: 3000 });
    console.log("✓ Success toast displayed!");

    const addedLink = page.getByText("검증 테스트 제목", { exact: true });
    await addedLink.waitFor({ state: "visible" });
    console.log("✓ Validated link added and rendered in MyPage!");

    console.log("\n🎉 ALL ZOD & REACT HOOK FORM VALIDATION TESTS PASSED! ✅");
  } catch (error) {
    console.error("❌ Validation Test Failed:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runValidationTest();
