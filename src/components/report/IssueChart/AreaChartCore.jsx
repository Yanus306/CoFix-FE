import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function AreaChartCore({ data, visible }) {
  return (
    <div className="w-[28vw] h-[26vh] mr-[2vw] outline-none pointer-events-none">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "rgb(75 85 99)", strokeWidth: "0.2vh" }}
            tickLine={false}
            tick={{ fill: "var(--color-gray400)", fontSize: "1.2vh" }}
            dy={10} 
          />

          <YAxis
            width={80} 
            axisLine={{ stroke: "rgb(75 85 99)", strokeWidth: "0.2vh" }}
            tickLine={false}
            tick={{ fill: "var(--color-gray400)", fontSize: "1.2vh" }}
            tickFormatter={(value) => (value === 0 ? "" : `${value}건`)}
            tickMargin={20}
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
  );
}

export default AreaChartCore;