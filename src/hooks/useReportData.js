import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 👉 1. 추가된 부분: 응답 상태를 먼저 확인하고 에러를 던지는 안전한 fetch 함수
const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("401_UNAUTHORIZED");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function useReportData() {
  const [summary, setSummary] = useState({ codingTime: 0, vulnerabilityCount: 0, resolveCount: 0 });
  const [topIssues, setTopIssues] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const headers = { Authorization: `Bearer ${token}` };

        // 👉 2. 수정된 부분: fetch 대신 위에서 만든 fetchJson을 사용합니다.
        const [summaryRes, categoryRes, improveRes, dailyRes] = await Promise.all([
          fetchJson(`${API_BASE}/codingState/summary`, { headers }),
          fetchJson(`${API_BASE}/vulnerability/category`, { headers }),
          fetchJson(`${API_BASE}/codingState/improve`, { headers }),
          fetchJson(`${API_BASE}/codingState/daily`, { headers })
        ]);

        // 1. 누적 코딩 수치 요약 세팅
        setSummary(summaryRes);

        // 2. AI 감지 누적 최다 취약점 TOP 5 세팅
        const sortedCategories = categoryRes.sort((a, b) => b.count - a.count);
        const top5 = sortedCategories.slice(0, 5).map(item => ({
          title: item.dataset,
          count: item.count
        }));
        setTopIssues(top5);

        // 👉 요구사항: 1위(빨간색), 2위(노란색) 취약점 따로 저장 (ReviewNote용)
        if (top5.length > 0) {
          localStorage.setItem("top2Vulnerabilities", JSON.stringify(top5.slice(0, 2)));
        }

        // 3. 개발자 핵심 역량 분석 (SkillRadar) 세팅
        const radar = improveRes.map(item => ({
          subject: item.dataset,
          score: item.count,
          fullMark: 100 // 필요에 따라 만점 기준 조정
        }));
        setRadarData(radar);

        // 4. 약점 발생 및 개선 추이 (IssueChart) 세팅
        if (dailyRes && dailyRes.counts) {
          const startDate = new Date(dailyRes.start);
          const chart = dailyRes.counts.map((item, index) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            return {
              date: `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
              typeA: item.vulnerabilityCount,
              typeB: item.improvementCount
            };
          });
          setChartData(chart);
        }
      } catch (error) {
        // 👉 3. 수정된 부분: 401 에러(권한 없음) 발생 시 화면이 터지지 않고 알림을 띄웁니다.
        console.error("데이터를 불러오는데 실패했습니다.", error);
        if (error.message === "401_UNAUTHORIZED") {
          alert("로그인이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.");
          // 필요시 아래 주석을 해제하여 로그인 페이지로 강제 이동시킬 수 있습니다.
          window.location.href = "/dashboard";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { summary, topIssues, radarData, chartData, loading };
}