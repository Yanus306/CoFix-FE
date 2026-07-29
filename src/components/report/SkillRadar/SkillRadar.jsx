import RadarChartCore from "./RadarChartCore";

function SkillRadar({ data }) {
  return (
    <div className="panel-base justify-center w-full h-[39.26vh]">
      <div className="panel-title mt-[4vh]">개발자 핵심 역량 분석</div>
      {data.length > 0 ? (
          <RadarChartCore data={data} />
      ) : (
          <div className="text-gray400 mt-4">데이터가 부족합니다.</div>
      )}
    </div>
  );
}

export default SkillRadar;