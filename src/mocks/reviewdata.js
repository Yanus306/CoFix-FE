export const MOCK_REVIEWS = [
  { id: 1, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.07", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 2, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.06", content: "불명확한 변수명 사용" },
  { id: 3, badgeType: "omission", badge: "예외처리 누락", date: "2026.07.05", content: "예외 처리 잘못함" },
  { id: 4, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.04", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 5, badgeType: "discord", badge: "변수명 불일치", date: "2026.07.03", content: "규칙에 맞지않는 변수명 사용" },
  { id: 6, badgeType: "omission", badge: "괄호 및 구호 누락", date: "2026.07.02", content: "문장 끝에 세미콜론 누락" },
  { id: 7, badgeType: "overlap", badge: "중첩 반복문", date: "2026.07.01", content: "중첩 루프로 인한 시간 복잡도 초과" },
  { id: 8, badgeType: "overlap", badge: "중첩 반복문", date: "1999.01.01", content: "중첩 루프로 인한 시간 복잡도 초과" }
];

export const BADGE_COLORS = {
  overlap: "badge-red",
  discord: "badge-yellow",
  omission: "badge-white"
};