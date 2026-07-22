export const mockReviewDetail = {
  id: 1,
  title: "중첩 루프 최적화 및 시간 복잡도 개선",
  content: "중첩 루프와 O(N^2) 성능 저하 문제",
  date: "2026-05-18",
  guide: `## 🚨 문제: 중첩 루프와 $O(N^2)$ 성능 저하

반복문 안에 또 다른 반복문(예: \`map\` 안에서 \`.includes()\` 사용)을 겹쳐 쓰면, 연산량이 **데이터의 제곱($N^2$)**으로 폭발합니다. 

데이터가 조금만 커져도 화면이 심하게 버벅이거나 멈추는 주원인이 됩니다.

---

## 💡 해결: 자료구조(Hash Map, Set) 활용

매번 배열을 처음부터 끝까지 검색하지 말고, 필요한 데이터를 미리 **객체(Object)**나 **Set**에 '사전'처럼 저장해 두고 꺼내 쓰는 방식으로 개선해야 합니다.

### ✨ 핵심 원리
* **탐색 시간 단축:** Set이나 Map/Object를 사용하면 값을 한 번에 즉시 찾아낼 수 있습니다. (탐색 시간 $O(1)$)
* **시간 복잡도 개선:** 이중 루프($O(N^2)$)를 단일 루프($O(N)$)로 쪼갤 수 있어 **성능이 획기적으로 개선**됩니다.

---

## 💻 코드 비교

### ❌ 개선 전 (이중 루프 - $O(N^2)$)
\`\`\`javascript
// map 내부에서 includes(배열 순회)를 수행하여 N * N 번 연산 발생
const result = listA.map(item => {
  const exists = listB.includes(item.id); // O(N) 탐색
  return { ...item, exists };
});
\`\`\`

### ✅ 개선 후 (Set 활용 - $O(N)$)
\`\`\`javascript
// 미리 Set을 만들어 두어 탐색 속도를 O(1)로 최적화
const setB = new Set(listB.map(item => item.id));

const result = listA.map(item => {
  const exists = setB.has(item.id); // O(1) 탐색
  return { ...item, exists };
});
\`\`\`
`,
};

export const mockReviewDetail2 = {
  id: 2,
  title: "임시 리뷰 항목",
  content: "추가 예정 문제 코드",
  date: "2026-05-20",
  guide: "", 
};

export const mockReviewList = [mockReviewDetail, mockReviewDetail2];