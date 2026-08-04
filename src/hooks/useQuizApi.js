import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useQuizApi(difficulty, issues = []) {
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        let vulnerabilities = [];

        // 1. 먼저 웹소켓 데이터(issues)에서 id를 뽑아봅니다.
        if (issues && issues.length > 0) {
          vulnerabilities = issues.map((v) => v.id).filter(Boolean);
        }

        // 💡 2. [필살기] 데이터가 없다면 대기하지 않고 API 서버에서 직접 ID를 긁어옵니다!
        if (vulnerabilities.length === 0) {
          console.log("⚡ 웹소켓 데이터가 없어 서버에서 취약점 ID를 직접 조회합니다...");
          const vulnRes = await fetch(`${BASE_URL}/vulnerability`, { headers });
          
          if (vulnRes.ok) {
            const vulnData = await vulnRes.json();
            // 백엔드가 주는 배열에서 id만 쏙쏙 뽑아냅니다.
            vulnerabilities = vulnData.map((v) => v.id).filter(Boolean);
          }
        }

        // 3. 서버에도 진짜 약점이 단 하나도 없다면 그때만 에러 처리
        if (vulnerabilities.length === 0) {
          throw new Error("서버에 등록된 약점(ID)이 없습니다. 약점 분석 후 퀴즈를 생성할 수 있습니다.");
        }

        console.log("🔥 퀴즈 생성 최종 요청 데이터:", {
          difficulty,
          vulnerability: vulnerabilities,
        });

        // 4. 뽑아낸 id로 퀴즈 생성 POST 요청!
        const response = await fetch(`${BASE_URL}/quiz`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            difficulty: difficulty || "medium",
            vulnerability: vulnerabilities, // 백엔드가 애타게 찾던 그 'id' 배열입니다.
            count: 5,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `HTTP ${response.status}: ${errorData.message || "서버에서 퀴즈를 생성할 수 없습니다."}`
          );
        }

        const data = await response.json();

        const formattedQuiz = data.map((item) => ({
          title: "맞춤 퀴즈", 
          question: item.question,    
          codeSnippet: item.code ? item.code.content : null,
          language: item.code ? item.code.language : "javascript",
          options: item.choices || [],
          answerIndex: item.answer,
          explanation: item.explain || "해설이 없습니다.",
        }));

        setQuizList(formattedQuiz);
      } catch (err) {
        console.error("🚨 퀴즈 생성 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [difficulty, JSON.stringify(issues)]);

  return { quizList, loading, error };
}