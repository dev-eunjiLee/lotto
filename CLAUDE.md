# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

동행복권 로또 자동 구매 봇. Playwright를 사용해 동행복권 사이트에 로그인하고 로또 645를 자동 구매한다.

## Tech Stack

- Node.js 20
- TypeScript
- Playwright (브라우저 자동화)
- GitHub Actions (매주 금요일 KST 08:55 자동 실행)

## Development Commands

```bash
npm install                # 의존성 설치
npx playwright install chromium --with-deps  # 브라우저 설치
npm run build              # TypeScript 컴파일
npm start                  # 빌드 후 실행
```

## Architecture

- `src/buy_lotto.ts`: 메인 스크립트. 동행복권 로그인 → 로또 구매 페이지 이동 → 자동번호 발급 → 구매
- `.github/workflows/action.yml`: GitHub Actions 스케줄러 (매주 금요일 실행)

## Configuration

`src/buy_lotto.ts` 상단의 상수를 수정:
- `USER_ID`: 동행복권 아이디
- `USER_PW`: 동행복권 비밀번호
- `COUNT`: 구매할 로또 개수 (기본값: 1)

## Commit Message Convention

```
<type>(<optional scope>): <한글 설명>
```

- 제목: 50자 이내, 한글로 작성
- 본문: 제목 아래 빈 줄 후 72자 이내로 "왜" 변경했는지 설명
- 문장이 끝나지 않으면 줄바꿈 하지 않음

**타입:**
- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 포맷팅 (코드 변경 없음)
- `refactor`: 리팩토링 (기능 변경 없음)
- `test`: 테스트 추가/수정
- `chore`: 빌드/도구 수정
