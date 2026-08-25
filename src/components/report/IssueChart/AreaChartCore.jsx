import React, { useRef, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function AreaChartCore({ data, visible }) {
  const chartWidth = data?.length > 5 ? `${(data.length / 5) * 100}%` : "100%";
  
  const scrollRef = useRef(null);
  const yAxisContainerRef = useRef(null);
  const [yAxisWidth, setYAxisWidth] = useState(80);

  // 처음 렌더링 시 스크롤을 맨 우측으로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]); 

  // 브라우저 줌(Zoom) 시 vw를 px로 실시간 변환하여 빈틈 방지
  useEffect(() => {
    if (!yAxisContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setYAxisWidth(entry.contentRect.width); 
      }
    });
    observer.observe(yAxisContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // X축 텍스트 렌더링 
  const renderCustomXAxisTick = ({ x, y, payload, index }) => {
    return (
      <text
        x={x}
        y={y}
        dy={10}
        // 첫 번째 항목의 왼쪽이 잘리지 않도록 시작점 기준으로 정렬
        textAnchor={index === 0 ? "start" : "middle"}
        fill="var(--color-gray400)"
        fontSize="1.2vh"
      >
        {payload.value}
      </text>
    );
  };

  const renderHiddenXAxisTick = ({ x, y, payload, index }) => {
    return (
      <text
        x={x}
        y={y}
        dy={10}
        textAnchor={index === 0 ? "start" : "middle"}
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
      <div 
        ref={yAxisContainerRef} 
        className="w-[4.17vw] shrink-0 h-full z-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <XAxis 
              dataKey="date" 
              axisLine={{ stroke: "transparent", strokeWidth: "0.2vh" }} 
              tickLine={false}
              interval="preserveStartEnd" 
              tick={renderHiddenXAxisTick} 
            />
            
            <YAxis
              width={yAxisWidth} 
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

              <Tooltip 
                cursor={{ 
                  stroke: 'var(--color-gray400)', 
                  strokeWidth: "0.1vh",
                  strokeDasharray: '3 3' 
                }}
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 30, 0.9)', 
                  borderRadius: '0.42vw',
                  border: 'none', 
                  color: '#fff',
                  padding: '1vh 1vw', 
                  fontSize: '1.2vh' 
                }}
                itemStyle={{ 
                  fontSize: '1.2vh', 
                  paddingTop: '0.5vh', 
                  color: 'var(--color-gray400)'
                }}
                labelStyle={{ 
                  fontSize: '1.2vh', 
                  color: 'var(--color-gray200)',
                  marginBottom: '0.5vh'
                }}
                formatter={(value, name) => [
                  `${value}건`, 
                  name === 'typeA' ? '약점 발생 빈도' : '개선 빈도'
                ]}
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