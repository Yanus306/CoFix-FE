import { useReportData } from "../hooks/useReportData";
import WholeSummary from "../components/report/WholeSummary";
import SkillRadar from "../components/report/SkillRadar/SkillRadar";
import TopIssues5 from "../components/report/TopIssues5";
import BadgeList from "../components/report/BadgeList";
import IssueChart from "../components/report/IssueChart/IssueChart";
import { useSessionCheck } from "../hooks/SessionExpiry";

function Report() {
  const { summary, topIssues, radarData, chartData, loading } = useReportData();

  useSessionCheck();

  
  if (loading) return <div className="flex justify-center items-center w-full h-full text-white">데이터를 불러오는 중입니다...</div>;

  return (
    <div className="flex flex-col justify-between items-center gap-[0.62vh] w-full h-full">
      <WholeSummary data={summary} />
      
      <div className="flex w-full h-[65.93vh] justify-between items-center">
        <div className="flex flex-col justify-between items-center w-[37.86vw] h-full">
          <SkillRadar data={radarData} />
          <TopIssues5 data={topIssues} />
        </div>

        <div className="flex flex-col justify-between items-center w-[37.86vw] h-full">
          <BadgeList />
          <IssueChart data={chartData} />
        </div>
      </div>
    </div>
  );s
}

export default Report;