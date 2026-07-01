# 🚀 CoFix (AI 기반 코딩 학습 서비스) - Frontend

> **2026년 국립경국대학교 야누스(yANUs) 2팀 프로젝트**
> 
> 사용자의 코딩 데이터를 실시간으로 분석하여 논리적 병목 지점을 파악하고, 스스로 문제를 해결할 수 있도록 돕는 **학습 특화형 능동형 AI 코칭 플랫폼**입니다. 본 레포지토리는 CoFix의 **웹 대시보드 및 사용자 인터페이스(Front-End)** 소스 코드를 포함하고 있습니다.

<br/>

## 📌 주요 기능 (Frontend)
본 프로젝트의 프론트엔드는 IDE 플러그인 및 백엔드와 연동되어 다음의 기능들을 시각화하고 사용자에게 제공합니다.

- **📊 학습자 맞춤형 대시보드:** 실시간 코딩 데이터 및 학습 성취도를 시각화하여 제공
- **💬 실시간 AI 코칭 인터페이스:** 학습자 취약점에 기반한 힌트 및 논리 교정 팝업/채팅(Chat UI) 기능
- **📖 맞춤형 학습 콘텐츠 뷰어:** 파악된 약점을 보완하기 위한 개인화된 리팩토링 예제 및 문제 풀이 화면 제공
- **📈 통합 학습 리포트 & 오답 노트:** 주/월간 종합 리포트 및 취약점 재학습 관리를 위한 화면 제공

<br/>

## 🛠 기술 스택 (Tech Stack)

### Core
- **Library:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React-Router-Dom

### Architecture & Management
- **State Management:** Zustand *(예정 - 필요에 따라 수정)*
- **HTTP Client:** Axios *(예정 - 필요에 따라 수정)*
- **Package Manager:** npm

<br/>

## 📂 폴더 구조 (Directory Structure)

```text
COFIX-FRONT/
├── public/               # 정적 파일 (파비콘 등)
├── src/
│   ├── api/              # 백엔드 서버 API 통신 로직 모음
│   ├── assets/           # 이미지, 아이콘, 폰트 등 에셋 파일
│   ├── components/       # 재사용 가능한 UI 컴포넌트 (버튼, 모달, 헤더 등)
│   ├── hooks/            # 커스텀 React Hooks (상태 관리, 데이터 패칭 등)
│   ├── pages/            # 라우터로 연결되는 실제 페이지 단위 컴포넌트
│   ├── store/            # 전역 상태 관리 (유저 정보, 학습 데이터 등)
│   ├── utils/            # 데이터 포맷팅, 파싱 등 공통 유틸리티 함수
│   ├── App.jsx           # 최상위 라우팅 및 전역 레이아웃 설정
│   ├── main.jsx          # React 애플리케이션 진입점
│   └── index.css         # Tailwind CSS 글로벌 설정
├── .gitignore            # Git 업로드 제외 파일 목록
├── eslint.config.js      # ESLint 설정
├── index.html            # 메인 HTML 템플릿
├── package.json          # 프로젝트 의존성 및 스크립트 관리
├── postcss.config.js     # PostCSS 설정 (Tailwind 연동)
├── tailwind.config.js    # Tailwind CSS 테마 및 설정
└── vite.config.js        # Vite 빌드 도구 설정