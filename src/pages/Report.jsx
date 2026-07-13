import WholeSummary from "../components/report/WholeSummary";
import SkillRadar from "../components/report/SkillRadar/SkillRadar";
import TopIssues5 from "../components/report/TopIssues5";
import BadgeList from "../components/report/BadgeList";
import IssueChart from "../components/report/IssueChart";

function Report() {
  return (
    <div className="flex flex-col justify-between items-center gap-[0.62vh] w-full h-full">
      <WholeSummary />
      <div className="flex w-full h-[65.93vh] justify-between items-center">
        <div className="flex flex-col justify-between items-center w-[37.86vw] h-full">
          <SkillRadar />
          <TopIssues5 />
        </div>

        <div className="flex flex-col justify-between items-center w-[37.86vw] h-full">
          <BadgeList />
          <IssueChart />
        </div>
      </div>
    </div>
  );
}

export default Report;
