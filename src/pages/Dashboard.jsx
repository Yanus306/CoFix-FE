import CodingSummary from '../components/dashboard/CodingSummary';
import CodeComparison from '../components/dashboard/AiCorrectionPanel';
import VulnerabilityTop2 from '../components/dashboard/VulnerabilityTop2';
import CustomQuiz from '../components/dashboard/CustomQuiz';

function Dashboard() {
  return (
    <div className="flex flex-col justify-between items-center gap-[0.62vh] w-full h-full">
      <CodingSummary />
      <CodeComparison />
      <div className="flex w-full h-[23.24vh] justify-between items-center">
        <VulnerabilityTop2 />
        <CustomQuiz />
      </div>
    </div>
  )
}

export default Dashboard;