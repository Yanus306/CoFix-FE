import React, { useState } from "react";
import AreaChartCore from "./AreaChartCore";

const trendData = [
  { date: "04.28", typeA: 5, typeB: 2 },
  { date: "05.12", typeA: 4, typeB: 6 },
  { date: "05.20", typeA: 5, typeB: 3 },
  { date: "05.22", typeA: 5, typeB: 2 },
  { date: "05.26", typeA: 5, typeB: 3 },
  { date: "05.27", typeA: 5, typeB: 3 },
  { date: "06.01", typeA: 2, typeB: 7 },
  { date: "06.15", typeA: 6, typeB: 4 },
  { date: "07.02", typeA: 8, typeB: 5 },
  { date: "07.15", typeA: 5, typeB: 2 },
];

function IssueChart() {
  const [visible, setVisible] = useState({
    typeA: true,
    typeB: true,
  });

  const toggleVisibility = (dataKey) => {
    setVisible((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <div className="panel-base justify-center w-full h-[39.26vh] gap-[0.2vh]">
      <div className="panel-title mt-[1vh] mb-[0.5vh]">약점 발생 및 개선 추이</div>

      <div className="flex gap-[1vw]">
        <button
          onClick={() => toggleVisibility("typeA")}
          className={`px-[1vw] py-[0.5vh] rounded-[1.04vw] text-[1.11vh] font-bold transition-all ${
            visible.typeA
              ? "badge badge-purple"
              : "badge badge-white"
          }`}
        >
          약점 발생 빈도
        </button>
        <button
          onClick={() => toggleVisibility("typeB")}
          className={`px-[1vw] py-[0.5vh] rounded-[1.04vw] text-[1.11vh] font-bold transition-all ${
            visible.typeB
              ? "badge badge-blue"
              : "badge badge-white"
          }`}
        >
          개선 빈도
        </button>
      </div>

      <AreaChartCore data={trendData} visible={visible} />
      
    </div>
  );
}

export default IssueChart;