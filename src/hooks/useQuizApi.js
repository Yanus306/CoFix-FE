import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useQuizApi(difficulty) {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        // 로컬스토리지나 상위에서 저장한 유저의 약점 목록을 가져오거나 기본값 설정
        const top2 = JSON.parse(
          localStorage.getItem("top2Vulnerabilities") || "[]",
        );
        const vulnerabilities =
          top2.length > 0
            ? top2.map((v) => v.dataset || "syntax_structure") // 한글 title 대신 dataset(영어) 사용
            : ["syntax_structure"];

        console.log("퀴즈 요청 데이터:", {
          difficulty,
          vulnerability: vulnerabilities,
        });

        const response = await fetch(`${BASE_URL}/quiz`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            difficulty: difficulty || "medium",
            vulnerability: vulnerabilities,
            count: 5, 
          }),
        });

        if (!response.ok) {
          // 💡 백엔드에서 내려주는 ErrorResponse의 message를 파싱합니다.
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`HTTP ${response.status}: ${errorData.message || '서버에서 퀴즈를 생성할 수 없습니다.'}`);
        }

        const data = await response.json();

        // 백엔드 응답 구조를 프론트엔드 포맷에 맞게 매핑
        const formattedQuiz = data.map((item) => ({
          title: item.question || "맞춤 퀴즈",
          question: item.explain || item.question,
          codeSnippet: item.code ? item.code.content : null,
          language: item.code ? item.code.language : "javascript",
          options: item.choices || [],
          answerIndex: item.answer,
          explanation: item.explain || "해설이 없습니다.",
        }));

        setQuizList(formattedQuiz);
      } catch (err) {
        console.error("퀴즈를 불러오는데 실패했습니다.", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [difficulty]);

  return { quizList, loading, error };
}