import CodingSummary from '../components/dashboard/CodingSummary';
import VulnerabilityMain from '../components/dashboard/VulnerabilityScanner/VulnerabilityMain';
import VulnerabilityTop2 from '../components/dashboard/VulnerabilityTop2';
import CustomQuiz from '../components/dashboard/CustomQuiz/CustomQuiz';
import { useDashboardWebSocket } from '../hooks/useDashboardWebSocket';

function Dashboard() {
    // 토큰 가져오는 로직
    // const token = localStorage.getItem('accessToken'); 
    
    // 커스텀 훅으로 실시간 데이터 구독
    // const dashboardData = useDashboardWebSocket(token);
    const dashboardData = useDashboardWebSocket(); // 토큰 없이 호출

    // 취약점 배열 안전하게 추출
    const vulnerabilities = dashboardData.dashboardVulnerabilities;

    return (
        <div className="flex flex-col justify-between items-center gap-[0.62vh] w-full h-full">
            {/* 요약 패널로 데이터 전달 */}
            <CodingSummary 
                filePath={dashboardData.filePath}
                lastCodingTime={dashboardData.lastCodingTime}
                lastTypingWpm={dashboardData.lastTypingWpm}
                vulnerabilityCount={vulnerabilities?.length ?? 0}
            />
            
            {/* 메인 취약점 스캐너로 데이터 전달 */}
            <VulnerabilityMain issues={vulnerabilities} />
            
            <div className="flex w-full h-[23.24vh] justify-between items-center">
                {/* TOP 2 패널로 데이터 전달 */}
                <VulnerabilityTop2 issues={vulnerabilities} />
                <CustomQuiz />
            </div>
        </div>
    )
}

export default Dashboard;