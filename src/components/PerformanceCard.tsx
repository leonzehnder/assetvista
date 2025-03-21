
import { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PerformanceDataPoint } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PerformanceCardProps {
  data: PerformanceDataPoint[];
}

const PerformanceCard = ({ data }: PerformanceCardProps) => {
  const latestPerformance = useMemo(() => {
    return data[data.length - 1];
  }, [data]);

  const performanceAvg = useMemo(() => {
    const sum = data.reduce((acc, curr) => acc + curr.value, 0);
    return sum / data.length;
  }, [data]);

  const isPositive = performanceAvg >= 0;

  return (
    <Card className="animate-fade-up" style={{ animationDelay: "350ms" }}>
      <CardHeader className="pb-2">
        <h3 className="text-base font-medium text-foreground">Performance</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Latest (Today)</span>
            <span
              className={cn(
                "flex items-center text-sm font-medium",
                latestPerformance.value >= 0 ? "text-success" : "text-danger"
              )}
            >
              {latestPerformance.value >= 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {latestPerformance.value >= 0 ? "+" : ""}
              {latestPerformance.value.toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average (2 Weeks)</span>
            <span
              className={cn(
                "flex items-center text-sm font-medium",
                isPositive ? "text-success" : "text-danger"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {isPositive ? "+" : ""}
              {performanceAvg.toFixed(2)}%
            </span>
          </div>
          
          <div className="pt-2 mt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Trend</span>
              <div
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  isPositive ? "bg-success-light text-success" : "bg-danger-light text-danger"
                )}
              >
                {isPositive ? "Upward" : "Downward"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
