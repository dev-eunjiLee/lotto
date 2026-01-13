import { chromium } from 'playwright';

// 동행복권 아이디와 패스워드를 설정
const USER_ID = '<아이디>'; // 수정1
const USER_PW = '<비밀번호>'; // 수정2

// 구매 개수를 설정
const COUNT = 1;

async function run(): Promise<void> {
  // chrome 브라우저를 실행
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // 로그인 페이지로 이동
  await page.goto('https://dhlottery.co.kr/user.do?method=login');

  // 아이디 입력
  const idInput = page.locator('[placeholder="아이디"]');
  await idInput.click();
  await idInput.fill(USER_ID);

  // 비밀번호 입력
  const pwInput = page.locator('[placeholder="비밀번호"]');
  await pwInput.fill(USER_PW);

  // 로그인 버튼 클릭
  const loginButton = page.locator('form[name="jform"]').getByText('로그인');
  await loginButton.click();
  await page.waitForURL('**/common.do**');

  // 로또 구매 페이지로 이동
  await page.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do');

  // "비정상적인 방법으로 접속하였습니다" 팝업 닫기
  await page.locator('#popupLayerAlert').getByRole('button', { name: '확인' }).click();

  // 자동번호발급 클릭
  await page.getByText('자동번호발급').click();

  // 구매할 개수 선택
  await page.locator('select').selectOption(String(COUNT));

  // 확인 클릭
  await page.getByRole('button', { name: '확인' }).click();

  // 구매하기 클릭
  await page.locator('input:has-text("구매하기")').click();

  await page.waitForTimeout(2000);

  // 구매 확인 팝업에서 확인 클릭
  await page.locator('text=확인 취소 >> input[type="button"]').click();

  // 레이어 닫기
  await page.locator('input[name="closeLayer"]').click();

  // ---------------------
  await context.close();
  await browser.close();
}

run().catch(console.error);
