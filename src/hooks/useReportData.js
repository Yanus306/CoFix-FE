import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
  const [summary, setSummary] = useState({
    codingTime: 0,
    vulnerabilityCount: 0,
    resolveCount: 0,
  });
  const [topIssues, setTopIssues] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [summaryRes, categoryRes, improveRes, dailyRes] =
          await Promise.all([
            fetchJson(`${API_BASE}/codingState/summary`, { headers }),
            fetchJson(`${API_BASE}/vulnerability/category`, { headers }),
            fetchJson(`${API_BASE}/codingState/improve`, { headers }),
            fetchJson(`${API_BASE}/codingState/daily`, { headers }),
          ]);

        // 누적 코딩 수치 요약 세팅
        setSummary(summaryRes);

        // AI 감지 누적 최다 취약점 TOP 5 세팅
        const sortedCategories = categoryRes.sort((a, b) => b.count - a.count);
        const top5 = sortedCategories.slice(0, 5).map((item) => ({
          title: item.name,
          count: item.count,
          description: item.description, 
        }));
        setTopIssues(top5);

        // 1위(빨간색), 2위(노란색) 취약점 따로 저장
        if (top5.length > 0) {
          localStorage.setItem(
            "top2Vulnerabilities",
            JSON.stringify(top5.slice(0, 2)),
          );
        }

        // 개발자 핵심 역량 분석 세팅
        const radar = improveRes.map((item) => ({
          subject: item.name,
          score: item.count,
          fullMark: 100, 
        }));
        setRadarData(radar);

        // 약점 발생 및 개선 추이 세팅
        if (dailyRes && dailyRes.counts) {
          const startDate = new Date(dailyRes.start);
          const chart = dailyRes.counts.map((item, index) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            return {
              date: `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`,
              typeA: item.vulnerabilityCount,
              typeB: item.improvementCount,
            };
          });
          setChartData(chart);
        }
      } catch (error) {
        //  401 에러 발생 시 화면이 터지지 않고 알림을 띄웁니다.
        console.error("데이터를 불러오는데 실패했습니다.", error);
        if (error.message === "401_UNAUTHORIZED") {
          alert("로그인이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.");
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