import RadarChartCore from "./RadarChartCore";

const defaultEmptyData = [
  { subject: "시간 복잡도 최적화", score: 1, fullMark: 100 },
  { subject: "코드 가독성", score: 1, fullMark: 100 },
  { subject: "클린코드 준수 여부", score: 1, fullMark: 100 },
  { subject: "알고리즘 선택의 적절성", score: 1, fullMark: 100 },
  { subject: "문제 해결력", score: 1, fullMark: 100 },
];

function SkillRadar({ data }) {
  const chartData = data && data.length >= 3 ? data : defaultEmptyData;

  return (
    <div className="panel-base justify-center w-full h-[39.26vh]">
      <div className="panel-title mt-[4vh]">개발자 핵심 역량 분석</div>
      
      <RadarChartCore data={chartData} />
    </div>
  );
}

export default SkillRadar;