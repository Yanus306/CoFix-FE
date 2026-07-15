export const mockQuizList = [
  {
    id: 1,
    title: "문제 1.",
    question: "다음은 중복 요소를 확인하는 코드입니다. ... (생략)",
    codeSnippet: `// AS-IS: O(N^2)\nconst hasDuplicate = (arr) => {\n  return arr.some((item, index) => arr.indexOf(item) !== index);\n};\n\n// TO-BE: O(N)\nconst optimizedHasDuplicate = (arr) => {\n  const seen = new [  A  ]();\n  return arr.some(item => {\n    if (seen.[  B  ](item)) return true;\n    seen.add(item);\n    return false;\n  });\n};`,
    language: "javascript",
    options: ["1. A: Set, B: has", "2. A: Array, B: find", "3. A: Map, B: includes", "4. A: Set, B: Contails"],
    answerIndex: 0,
    explanation: "자바스크립트의 Set 객체는 데이터의 중복을 허용하지 않으며, 특정 요소가 존재하는지 확인하는 has() 메서드는 평균적으로 $O(1)$의 시간 복잡도를 가집니다. 따라서 배열을 한 번 순회($O(N)$)하면서 Set을 활용하면 전체 시간 복잡도를 $O(N)$으로 대폭 개선할 수 있습니다."
  },
  {
    id: 2,
    title: "문제 2.",
    question: "React에서 상태(State)가 업데이트될 때 컴포넌트는 어떻게 반응하나요?",
    codeSnippet: null, 
    language: null, 
    options: ["1. 새로고침된다.", "2. 리렌더링된다.", "3. 아무 변화가 없다.", "4. 에러가 발생한다."],
    answerIndex: 1,
    explanation: "React는 컴포넌트의 상태(State)나 속성(Props)이 변경되면, 변경된 데이터에 맞추어 화면을 다시 그리기 위해 해당 컴포넌트를 리렌더링(Re-rendering)합니다. 브라우저 전체가 새로고침되는 것과는 다릅니다."
  },
  {
    id: 3,
    title: "문제 3.",
    question: "다음 CSS 중 Flexbox에서 항목들을 교차축(Cross Axis)의 중앙에 정렬하는 속성은?",
    codeSnippet: `.container {\n  display: flex;\n  /* 빈칸 */: center;\n}`,
    language: "css",
    options: ["1. justify-content", "2. align-items", "3. align-content", "4. text-align"],
    answerIndex: 1,
    explanation: "Flexbox 레이아웃에서 주축(Main Axis)을 기준으로 한 정렬은 justify-content를 사용하고, 수직 방향인 교차축(Cross Axis)을 기준으로 한 정렬은 align-items를 사용합니다."
  }
];