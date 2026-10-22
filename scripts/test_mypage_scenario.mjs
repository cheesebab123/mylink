import { chromium } from "playwright";

async function runMyPageScenarioTest() {
  console.log("🚀 Starting MyPage Link Management Scenario Test...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();

  try {
    // 1. 메인 페이지 접속
    console.log("1. Navigating to Main Page (http://localhost:3000)...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // 2. 상단 바 마이페이지 버튼 클릭
    console.log("2. Clicking MyPage icon in TopBar...");
    const myPageBtn = page.getByTitle("마이페이지 (링크 관리)").first();
    await myPageBtn.click();

    // 3. 마이페이지 URL 및 헤더 검증
    await page.waitForURL("**/mypage", { timeout: 5000 });
    console.log("✓ Successfully navigated to /mypage!");

    const myPageHeader = page.getByRole("heading", { name: "마이페이지" });
    await myPageHeader.waitFor({ state: "visible" });
    console.log("✓ MyPage header is visible!");

    // 4. '새 링크 추가' 버튼 클릭 -> 다이얼로그 오픈
    console.log("3. Opening Add Link Dialog in MyPage...");
    const addBtn = page.getByRole("button", { name: "새 링크 추가" });
    await addBtn.click();

    const dialogTitle = page.getByRole("heading", { name: "새 링크 추가" });
    await dialogTitle.waitFor({ state: "visible" });
    console.log("✓ Add Link Dialog opened in MyPage!");

    // 5. 폼 입력
    console.log("4. Filling link form in MyPage...");
    await page.fill('input[placeholder="예: 내 포트폴리오 웹사이트"]', "토스 공식 디자인 시스템");
    await page.fill('input[placeholder*="https://example.com"]', "https://toss.im");
    await page.fill('input[placeholder="예: 작업물과 프로젝트 모음집"]', "토스 TDS 컴포넌트와 가이드라인");

    // 아이콘 선택 (추천)
    const iconBtn = page.locator('button[title="추천"]');
    if (await iconBtn.isVisible()) {
      await iconBtn.click();
    }

    // 뱃지 선택
    const badgeBtn = page.getByRole("button", { name: "#포트폴리오" });
    if (await badgeBtn.isVisible()) {
      await badgeBtn.click();
    }

    // 6. '링크 추가하기' 클릭
    console.log("5. Submitting form...");
    const submitBtn = page.getByRole("button", { name: "링크 추가하기", exact: true });
    await submitBtn.click();

    // 7. 마이페이지 토스트 및 목록 반영 검증
    console.log("6. Verifying added link in MyPage list...");
    const toast = page.getByText("'토스 공식 디자인 시스템' 링크를 추가했어요");
    await toast.waitFor({ state: "visible", timeout: 3000 });
    console.log("✓ Toast notification displayed!");

    const newLinkInMyPage = page.getByText("토스 공식 디자인 시스템", { exact: true });
    await newLinkInMyPage.waitFor({ state: "visible" });
    console.log("✓ New link rendered in MyPage!");

    // 8. 메인 페이지로 돌아가서 반영 확인
    console.log("7. Navigating back to Main Page to verify synchronization...");
    const backBtn = page.getByTitle("메인 페이지로 돌아가기").first();
    await backBtn.click();
    await page.waitForURL("http://localhost:3000/", { timeout: 5000 });

    const newLinkInMain = page.getByRole("link", { name: /토스 공식 디자인 시스템/i }).first();
    await newLinkInMain.waitFor({ state: "visible" });
    console.log("✓ Newly added link is visible on Main Profile Page!");

    // 9. 스크린샷 캡처
    await page.screenshot({ path: "mypage-main-test-result.png", fullPage: true });
    console.log("✓ Screenshot captured: mypage-main-test-result.png");

    console.log("\n🎉 ALL MYPAGE SCENARIO TESTS PASSED SUCCESSFULLY! ✅");
  } catch (error) {
    console.error("❌ Test Failed:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runMyPageScenarioTest();
