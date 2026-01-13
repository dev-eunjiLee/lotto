# lotto

지속적로또 레츠고

동행복권 로또 645 자동 구매 봇. Playwright로 브라우저를 자동화하여 로또를 구매합니다.

## 설정

`src/buy_lotto.ts` 파일에서 아래 값을 수정하세요:

```typescript
const USER_ID = '<아이디>';    // 동행복권 아이디
const USER_PW = '<비밀번호>';   // 동행복권 비밀번호
const COUNT = 1;               // 구매할 로또 개수
```

## 사용 방법

### 로컬에서 실행

```bash
# 1. 의존성 설치
npm install

# 2. Chromium 브라우저 설치
npx playwright install chromium

# 3. 실행
npm start
```

> **참고:** `npx playwright install chromium`은 Playwright가 자동화에 사용할 Chromium 브라우저를 다운로드합니다. `npm install`은 라이브러리만 설치하고 실제 브라우저 바이너리는 별도로 다운로드해야 합니다.

### GitHub Actions에서 실행

GitHub Actions는 매주 금요일 오전 8:55 (KST)에 자동으로 실행됩니다.

수동으로 트리거하려면 `.github/workflows/action.yml`에서 `on:` 부분을 수정하세요:

```yaml
on: [push]  # push할 때마다 실행
# on:
#   schedule:
#     - cron: "55 23 * * 5"
```

**GitHub Actions에서 브라우저 설치 명령어가 다른 이유:**

```bash
npx playwright install chromium --with-deps
```

| 옵션 | 설명 |
|------|------|
| `--with-deps` | 브라우저 실행에 필요한 시스템 라이브러리(폰트, 그래픽 라이브러리 등)를 함께 설치 |

- **로컬 (Mac/Windows):** OS에 필요한 라이브러리가 이미 설치되어 있어서 `--with-deps` 불필요
- **GitHub Actions (Ubuntu):** 최소한의 패키지만 설치된 환경이라 시스템 의존성을 함께 설치해야 함

**GitHub Actions에서 `npm ci`를 사용하는 이유:**

| 명령어 | 특징 |
|--------|------|
| `npm install` | package.json 기준으로 설치, lock 파일 업데이트 가능 |
| `npm ci` | package-lock.json 기준으로 정확한 버전 설치, lock 파일 수정 안 함 |

- **로컬:** `npm install` 사용. 개발 중 패키지 추가/업데이트 시 lock 파일 갱신 필요
- **CI/CD:** `npm ci` 사용. 항상 동일한 버전 설치 보장, 설치 속도도 더 빠름
