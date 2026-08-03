import { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function RadarChartCore({ data }) {
  // 툴팁 상태(표시 여부, 위치, 텍스트) 관리
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  const CustomTick = (props) => {
    const { payload, x, y, cx, cy, textAnchor, data } = props;

    const gap = 1.08;
    const newX = cx + (x - cx) * gap;
    const newY = cy + (y - cy) * gap;

    const matchedItem = data?.find((item) => item.subject === payload.value);
    const hoverText = matchedItem?.description || "해당 항목에 대한 설명이 없습니다.";

    return (
      <text
        x={newX}
        y={newY}
        textAnchor={textAnchor}
        fill="var(--color-gray400)"
        fontSize="1.48vh"
        fontFamily="Pretendard"
        dy={4}
        className="cursor-pointer"
        // 툴팁 켜기
        onMouseEnter={(e) => {
          const rect = e.target.getBoundingClientRect();
          setTooltip({
            visible: true,
            x: rect.left + rect.width / 2, 
            y: rect.top,    
            text: hoverText,
          });
        }}
        // 툴팁 끄기
        onMouseLeave={() => {
          setTooltip({ ...tooltip, visible: false });
        }}
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className="relative flex justify-center items-center w-[28vw] h-[30vh] select-none outline-none">
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid
            gridType="polygon"
            stroke="var(--color-white-5)"
            strokeWidth="0.09vh"
            fill="var(--color-white-3)"
            radialLines={false}
          />
          
          <PolarAngleAxis 
            dataKey="subject" 
            tick={<CustomTick data={data} />} 
          />
          
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          
          <Radar
            name="역량"
            dataKey="score"
            fill="var(--color-purple500-30)"
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* 커스텀 툴팁 영역 */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: tooltip.y, 
            left: tooltip.x,
          }}
        >
          {/* 툴팁 박스 */}
          <div className="absolute bottom-full mb-[1vh] flex px-[1vw] py-[0.5vh] bg-gray700 text-gray200 text-[1.5vh] rounded shadow-lg whitespace-nowrap transform -translate-x-1/2">
            {tooltip.text}
            
            {/* 툴팁 아래 꼬리 부분 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[0.6vh] border-transparent border-t-gray700"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RadarChartCore;