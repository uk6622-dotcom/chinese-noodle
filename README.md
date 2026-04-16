# 중국 면요리 여행 어플

중국의 유명 면요리 맛집을 탐색할 수 있는 간단한 React + Vite 앱입니다.

## 실행 방법

1. `npm install`
2. `npm run dev`

## 기능

- 도시별 면요리 맛집 검색
- 네이티브 스타일 필터링
- 일정에 맛집 추가/삭제 가능한 여행 플래너
- 검색 결과 기반 추천 지역 표시
- **AI 여행 추천**: AutoGen을 사용하여 개인화된 여행 계획 생성

## AI 여행 추천 사용법

1. Python 환경 설정 및 AutoGen 설치:
   ```
   pip install pyautogen
   ```

2. OpenAI API 키 설정:
   - 환경 변수 `OPENAI_API_KEY`에 API 키를 설정하거나, 스크립트 실행 시 입력하세요.

3. 스크립트 실행:
   ```
   python travel_agent.py
   ```

4. 방문하고 싶은 도시를 입력하면 AI가 상세한 여행 추천을 제공합니다.

## 개발

`src/App.tsx`에서 맛집 데이터를 수정하고, 디자인은 `src/style.css`를 조정하세요.
