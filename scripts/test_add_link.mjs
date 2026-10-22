import { chromium } from "playwright";

async function runTest() {
  console.log("🚀 Starting Playwright Browser Test for Link Addition Scenario...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();

  try {
    // 1. 페이지 접속
    console.log("1. Navigating to http://localhost:3000 ...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // 2. 초기 링크 수 확인
    const initialLinks = await page.locator("a[href]").count();
    console.log(`Initial link elements count: ${initialLinks}`);

    // 3. '링크 추가' 버튼 클릭
    console.log("2. Clicking '링크 추가' button...");
    const addLinkBtn = page.getByRole("button", { name: "링크 추가" }).first();
    await addLinkBtn.click();

    // 4. 다이얼로그 노출 확인
    const dialogTitle = page.getByText("새 링크 추가");
    await dialogTitle.waitFor({ state: "visible" });
    console.log("✓ Add Link Dialog opened successfully!");

    // 5. 폼 데이터 입력
    console.log("3. Filling link form fields...");
    await page.fill('input[placeholder="예: 내 포트폴리오 웹사이트"]', "AI 혁신 연구소");
    await page.fill('input[placeholder*="https://example.com"]', "https://ai.google.dev");
    await page.fill('input[placeholder="예: 작업물과 프로젝트 모음집"]', "최신 인공지능 연구 및 프로젝트");

    // 아이콘 선택 (추천 / Sparkles)
    const iconBtn = page.locator('button[title="추천"]');
    if (await iconBtn.isVisible()) {
      await iconBtn.click();
      console.log("✓ Icon selected: Sparkles (추천)");
    }

    // 뱃지 태그 선택 (#추천)
    const badgeBtn = page.getByRole("button", { name: "#추천" });
    if (await badgeBtn.isVisible()) {
      await badgeBtn.click();
      console.log("✓ Badge selected: #추천");
    }

    // 6. '링크 추가하기' 제출 버튼 클릭
    console.log("4. Submitting form...");
    const submitBtn = page.getByRole("button", { name: "링크 추가하기", exact: true });
    await submitBtn.click();

    // 7. 토스트 알림 검증
    console.log("5. Verifying Toast feedback...");
    const toast = page.getByText("'AI 혁신 연구소' 링크를 추가했어요");
    await toast.waitFor({ state: "visible", timeout: 3000 });
    console.log("✓ Toast notification displayed properly!");

    // 8. 추가된 링크 카드 UI 검증
    console.log("6. Verifying added link in the list...");
    const newLinkCard = page.getByRole("link", { name: /AI 혁신 연구소/i }).first();
    await newLinkCard.waitFor({ state: "visible" });
    console.log("✓ New link item rendered in the link list!");

    const newLinkDesc = page.getByText("최신 인공지능 연구 및 프로젝트", { exact: true });
    await newLinkDesc.waitFor({ state: "visible" });
    console.log("✓ New link description verified!");

    // 9. 로컬스토리지 영속성 검증 (새로고침)
    console.log("7. Reloading page to verify localStorage persistence...");
    await page.reload({ waitUntil: "networkidle" });
    const persistedLink = page.getByRole("link", { name: /AI 혁신 연구소/i }).first();
    await persistedLink.waitFor({ state: "visible" });
    console.log("✓ New link persisted successfully in localStorage after reload!");

    // 10. 테마 변경 테스트 (네오브루탈리즘 & 다크글래스)
    console.log("8. Testing theme switching with new link...");
    const themeSwitcher = page.locator("button:has-text('토스 (TDS)')").or(page.getByRole("button", { name: "토스 (TDS)" })).first();
    if (await themeSwitcher.isVisible()) {
      await themeSwitcher.click();
      const neoOption = page.getByText("네오브루탈리즘");
      if (await neoOption.isVisible()) {
        await neoOption.click();
        console.log("✓ Switched to Neobrutalism theme successfully!");
      }
    }

    // 11. 스크린샷 캡처
    await page.screenshot({ path: "test-result.png", fullPage: true });
    console.log("✓ Full page screenshot saved to test-result.png");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! ✅");
  } catch (error) {
    console.error("❌ Test Failed:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
