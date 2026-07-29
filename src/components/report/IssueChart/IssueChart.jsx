import React, { useState } from "react";
import AreaChartCore from "./AreaChartCore";

function IssueChart({ data }) {
const [visible, setVisible] = useState({ typeA: true, typeB: true });

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

      <AreaChartCore data={data} visible={visible} />
      
    </div>
  );
}

export default IssueChart;