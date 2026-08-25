import RadarChartCore from "./RadarChartCore";

const defaultEmptyData = [
  {
    subject: "시간 복잡도 최적화",
    score: 1,
    fullMark: 100,
    description: "연산 감소 및 실행 시간 단축을 통한 효율적인 코드 작성",
  },
  {
    subject: "코드 가독성",
    score: 1,
    fullMark: 100,
    description: "직관적인 네이밍과 명확한 구조를 통한 가독성 향상",
  },
  {
    subject: "클린코드 준수 여부",
    score: 1,
    fullMark: 100,
    description: "중복 코드 제거와 단일 책임 원칙 준수를 통한 유지보수성",
  },
  {
    subject: "알고리즘 선택의 적절성",
    score: 1,
    fullMark: 100,
    description: "문제 상황과 제약 조건에 부합하는 최적의 알고리즘 선택",
  },
  {
    subject: "문제 해결력",
    score: 1,
    fullMark: 100,
    description: "로직 오류 및 예외 상황에 대한 논리적 분석과 해결책 도출",
  },
];

function SkillRadar({ data }) {
  const chartData = data && data.length >= 3 ? data : defaultEmptyData;

  return (
    <div className="panel-base justify-center w-full h-[39.26vh]">
      <div className="panel-title mt-[4vh]">취약점 개선 역량 분석</div>

      <RadarChartCore data={chartData} />
    </div>
  );
}

export default SkillRadar;