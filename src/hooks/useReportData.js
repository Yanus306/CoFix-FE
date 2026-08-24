import { useState, useEffect } from "react";
import { authFetch } from "../api/client"; // 실제 경로에 맞게 수정

const fetchJson = async (url, options) => {
  const response = await authFetch(url, options);
  if (!response.ok) {
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
        const [summaryRes, categoryRes, improveRes, dailyRes] =
          await Promise.all([
            fetchJson(`/codingState/summary`),
            fetchJson(`/vulnerability/category`),
            fetchJson(`/codingState/improve`),
            fetchJson(`/codingState/daily`),
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
            
            description: item.description 
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
        // authFetch가 401이면 이미 내부적으로 로그아웃 처리(alert + 리다이렉트)를 함
        console.error("데이터를 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { summary, topIssues, radarData, chartData, loading };
}