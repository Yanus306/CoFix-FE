export const chatSessions = [
  { 
    id: 1, 
    title: "메모리 누수 분석", 
    date: "2026.07.07",
    messages: [
      { id: 101, role: "user", message: "메모리 누수 분석하는 방법 알려줘." },
      { id: 102, role: "ai", message: "메모리 누수를 분석하기 위해서는 먼저 프로파일링 도구를 사용해야 합니다.\n\nChrome DevTools의 Memory 탭에서 Heap Snapshot을 찍어 객체들의 참조 상태를 확인해 보세요." }
    ]
  },
  { 
    id: 2, 
    title: "변수명 컨벤션", 
    date: "2026.07.07",
    messages: [
      { id: 201, role: "user", message: "프론트엔드 변수명 짓는 규칙 추천해 줘." },
      { id: 202, role: "ai", message: "상수는 스네이크 케이스(UPPER_SNAKE_CASE), 일반 변수나 함수는 카멜 케이스(camelCase), React 컴포넌트는 파스칼 케이스(PascalCase)를 사용하는 것을 권장합니다." }
    ]
  },
  { 
    id: 3, 
    title: "API 호출 최적화", 
    date: "2026.07.07",
    messages: [
      { id: 301, role: "user", message: "API 호출이 너무 잦은데 최적화 방법이 있을까?" },
      { id: 302, role: "ai", message: "Debounce나 Throttle 기법을 적용하거나, React Query(TanStack Query) 같은 상태 관리 라이브러리의 캐싱 기능을 활용해 보세요." }
    ]
  },
  { id: 4, title: "중첩 루프 관련 해결 방법", date: "2026.07.07", messages: [] },
  { id: 5, title: "비정상적인 리소스 관리", date: "2026.07.07", messages: [] },
  { id: 6, title: "API 호출 최적화", date: "2026.07.07", messages: [] },
  { id: 7, title: "API 호출 최적화", date: "2026.07.07", messages: [] },
  { id: 8, title: "중첩 루프 관련 해결 방법", date: "2026.07.07", messages: [] },
  { id: 9, title: "비정상적인 리소스 관리", date: "2026.07.07", messages: [] },
  { id: 10, title: "API 호출 최적화", date: "2026.07.07", messages: [] },
  { id: 11, title: "API 호출 최적화", date: "2026.07.07", messages: [] },
];