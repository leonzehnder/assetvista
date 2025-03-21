
import { PerformanceDataPoint } from "@/data/mockData";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useMemo } from "react";

interface DailyPerformanceChartProps {
  data: PerformanceDataPoint[];
}

const DailyPerformanceChart = ({ data }: DailyPerformanceChartProps) => {
  const formattedData = useMemo(() => {
    return data.map(point => ({
      ...point,
      value: Number(point.value.toFixed(2))
    }));
  }, [data]);

  // Find the min and max values for the chart domain
  const minValue = useMemo(() => {
    const min = Math.min(...formattedData.map(item => item.value));
    return min < 0 ? min * 1.1 : -0.5;
  }, [formattedData]);

  const maxValue = useMemo(() => {
    const max = Math.max(...formattedData.map(item => item.value));
    return max * 1.1;
  }, [formattedData]);

  return (
    <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "250ms" }}>
      <h3 className="text-base font-medium text-foreground mb-4">Daily Performance</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis 
              domain={[minValue, maxValue]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e2e8f0",
                padding: "8px 12px"
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Performance']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <ReferenceLine y={0} stroke="#e2e8f0" />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              fill={(data) => data.value >= 0 ? "#22c55e" : "#ef4444"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyPerformanceChart;
