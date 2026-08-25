import React, { useRef, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function AreaChartCore({ data, visible }) {
  const chartWidth = data?.length > 5 ? `${(data.length / 5) * 100}%` : "100%";
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]); 

  const renderCustomXAxisTick = ({ x, y, payload, index }) => {
    const isFirst = index === 0;
    
    const shiftedX = isFirst ? x - 20 : x;

    return (
      <text
        x={shiftedX} 
        y={y}
        dy={10}
        textAnchor={isFirst ? "start" : "middle"}
        fill="var(--color-gray400)"
        fontSize="1.2vh"
      >
        {payload.value}
      </text>
    );
  };

  const renderHiddenXAxisTick = ({ x, y, payload, index }) => {
    const isFirst = index === 0;
    
    const shiftedX = isFirst ? x - 20 : x; 

    return (
      <text
        x={shiftedX}
        y={y}
        dy={10}
        textAnchor={isFirst ? "start" : "middle"}
        fill="transparent"
        fontSize="1.2vh"
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className="flex w-[28vw] h-[26vh] mr-[2vw]">
      
      {/* 고정된 Y축 영역 */}
      <div className="w-[4.17vw] shrink-0 h-full z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false}
              interval="preserveStartEnd" 
              tick={renderHiddenXAxisTick} 
            />
            
            <YAxis
              width={80} 
              allowDecimals={false}
              axisLine={{ stroke: "rgb(75 85 99)", strokeWidth: "0.2vh" }}
              tickLine={false}
              tick={{ fill: "var(--color-gray400)", fontSize: "1.2vh" }}
              tickFormatter={(value) => (value === 0 ? "" : `${value}건`)}
              tickMargin={20}
            />
            <Area dataKey="typeA" stroke="none" fill="none" />
            <Area dataKey="typeB" stroke="none" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 스크롤되는 X축 및 데이터 영역 */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-x-auto overflow-y-hidden outline-none"
      >
        <div style={{ width: chartWidth, height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <XAxis
                dataKey="date"
                axisLine={{ stroke: "rgb(75 85 99)", strokeWidth: "0.2vh" }}
                tickLine={false}
                interval="preserveStartEnd" 
                tick={renderCustomXAxisTick} 
              />
              
              <YAxis 
                width={0} 
                axisLine={false} 
                tickLine={false} 
                tick={false} 
                allowDecimals={false} 
              />

              <Area
                type="linear"
                dataKey="typeA"
                stroke="rgb(143 57 248 / 60%)"
                fill="rgb(143 57 248 / 20%)"
                strokeWidth="0.1vh"
                hide={!visible.typeA}
              />

              <Area
                type="linear"
                dataKey="typeB"
                stroke="rgb(59 130 246 / 60%)"
                fill="rgb(59 130 246 / 20%)"
                strokeWidth="0.1vh"
                hide={!visible.typeB}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}

export default AreaChartCore;