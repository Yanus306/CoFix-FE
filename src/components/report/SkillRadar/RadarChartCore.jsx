import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function CustomTick(props) {
  const { payload, x, y, cx, cy, textAnchor } = props;

  const gap = 1.08;
  const newX = cx + (x - cx) * gap;
  const newY = cy + (y - cy) * gap;

  return (
    <text
      x={newX}
      y={newY}
      textAnchor={textAnchor}
      fill="var(--color-gray400)"
      fontSize="1.48vh" 
      fontFamily="Pretendard"
      dy={4}
    >
      {payload.value}
    </text>
  );
}

function RadarChartCore({ data }) {
  return (
    <div className="flex justify-center items-center w-[28vw] h-[30vh] pointer-events-none select-none outline-none">
      
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
            tick={<CustomTick />} 
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
      
    </div>
  );
}

export default RadarChartCore;