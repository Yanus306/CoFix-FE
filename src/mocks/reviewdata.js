export const MOCK_REVIEWS = [
  { id: 1, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.07", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 2, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.06", content: "불명확한 변수명 사용" },
  { id: 3, badgeType: "omission", badge: "예외처리 누락", date: "2026.07.05", content: "예외 처리 잘못함" },
  { id: 4, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.04", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 5, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.03", content: "규칙에 맞지않는 변수명 사용" },
  { id: 6, badgeType: "omission", badge: "괄호 및 구호 누락", date: "2026.07.02", content: "문장 끝에 세미콜론 누락" },
  { id: 7, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.01", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 8, badgeType: "omission", badge: "메모리 누수", date: "2026.06.30", content: "동적 할당 후 free() 함수 호출 누락" },

  
  { id: 9, badgeType: "discord", badge: "타입 불일치", date: "2026.06.29", content: "정수형과 실수형 연산 시 데이터 손실 발생" },
  { id: 10, badgeType: "overlap", badge: "무한 루프", date: "2026.06.28", content: "반복문 탈출 조건(break) 설정 오류" },
  { id: 11, badgeType: "omission", badge: "경계값 오차", date: "2026.06.27", content: "배열 인덱스 범위를 초과하는 Off-by-one 에러" },
  { id: 12, badgeType: "discord", badge: "카멜케이스 미적용", date: "2026.06.26", content: "네이밍 컨벤션 미준수로 인한 가독성 저하" },
  { id: 13, badgeType: "overlap", badge: "재귀 호출 초과", date: "2026.06.25", content: "기저 조건 누락으로 인한 스택 오버플로우" },
  { id: 14, badgeType: "omission", badge: "NULL 검사 누락", date: "2026.06.24", content: "포인터 참 참조 전 NULL 포인터 검사 미실행" },
  { id: 15, badgeType: "discord", badge: "매개변수 순서", date: "2026.06.23", content: "함수 호출 시 인자 전달 순서 오작동" },
  { id: 16, badgeType: "overlap", badge: "비효율적 탐색", date: "2026.06.22", content: "이진 탐색 대신 선형 탐색을 사용하여 시간 지연" },
  { id: 17, badgeType: "omission", badge: "초기화 누락", date: "2026.06.21", content: "지역 변수 선언 후 쓰레기값 있는 상태로 사용" },
  { id: 18, badgeType: "discord", badge: "상수명 규칙", date: "2026.06.20", content: "대문자 스네이크 케이스 미적용 (const 변수)" },
  { id: 19, badgeType: "overlap", badge: "중복 계산", date: "2026.06.19", content: "동적 계획법(DP) 메모이제이션 미적용" },
  { id: 20, badgeType: "overlap", badge: "중첩 반복문", date: "1999.01.01", content: "중첩 루프로 인한 시간 복잡도 초과" }
];

export const BADGE_COLORS = {
  overlap: "badge-red",
  discord: "badge-yellow",
  omission: "badge-white"
};