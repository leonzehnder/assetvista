
import { useMemo } from "react";
import { PortfolioTimepoint } from "@/data/mockData";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PortfolioValueChartProps {
  data: PortfolioTimepoint[];
}

const PortfolioValueChart = ({ data }: PortfolioValueChartProps) => {
  const formattedData = useMemo(() => {
    return data.map(point => ({
      ...point,
      value: Number(point.value.toFixed(2))
    }));
  }, [data]);

  // Find the min and max values for the chart domain
  const minValue = useMemo(() => {
    return Math.floor(Math.min(...formattedData.map(item => item.value)) * 0.9);
  }, [formattedData]);

  const maxValue = useMemo(() => {
    return Math.ceil(Math.max(...formattedData.map(item => item.value)) * 1.1);
  }, [formattedData]);

  return (
    <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-base font-medium text-foreground mb-4">Portfolio Value Trend</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.375rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e2e8f0",
                padding: "8px 12px"
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioValueChart;
