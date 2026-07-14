export const mockQuizList = [
  {
    id: 1,
    title: "문제 1.",
    question: "다음은 중복 요소를 확인하는 코드입니다. ... (생략)",
    codeSnippet: `// AS-IS: O(N^2)\nconst hasDuplicate = (arr) => {\n  return arr.some((item, index) => arr.indexOf(item) !== index);\n};\n\n// TO-BE: O(N)\nconst optimizedHasDuplicate = (arr) => {\n  const seen = new [  A  ]();\n  return arr.some(item => {\n    if (seen.[  B  ](item)) return true;\n    seen.add(item);\n    return false;\n  });\n};`,
    language: "javascript",
    options: ["1. A: Set, B: has", "2. A: Array, B: find", "3. A: Map, B: includes", "4. A: Set, B: Contails"],
    answerIndex: 0,
    explanation: "자바스크립트의 Set 객체는..."
  },
  {
    id: 2,
    title: "문제 2.",
    question: "React에서 상태(State)가 업데이트될 때 컴포넌트는 어떻게 반응하나요?",
    codeSnippet: null, 
    language: null, 
    options: ["1. 새로고침된다.", "2. 리렌더링된다.", "3. 아무 변화가 없다.", "4. 에러가 발생한다."],
    answerIndex: 1,
    explanation: "React는 컴포넌트의..."
  },
  {
    id: 3,
    title: "문제 3.",
    question: "다음 CSS 중 Flexbox에서 항목들을 교차축(Cross Axis)의 중앙에 정렬하는 속성은?",
    codeSnippet: `.container {\n  display: flex;\n  /* 빈칸 */: center;\n}`,
    language: "css",
    options: ["1. justify-content", "2. align-items", "3. align-content", "4. text-align"],
    answerIndex: 1,
    explanation: "Flexbox 레이아웃에서..."
  }
];