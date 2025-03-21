
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PortfolioSummary as PortfolioSummaryType } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface PortfolioSummaryCardProps {
  summary: PortfolioSummaryType;
}

const PortfolioSummary = ({ summary }: PortfolioSummaryCardProps) => {
  const isPositive = summary.change >= 0;

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg border border-border p-5 animate-fade-up">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Value</h3>
        <p className="text-2xl font-semibold text-foreground">${formatNumber(summary.totalValue)}</p>
      </div>
      
      <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "50ms" }}>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Previous Value</h3>
        <p className="text-2xl font-semibold text-foreground">${formatNumber(summary.previousValue)}</p>
      </div>
      
      <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Change</h3>
        <div className="flex items-center">
          <p 
            className={cn(
              "text-2xl font-semibold",
              isPositive ? "text-success" : "text-danger"
            )}
          >
            {isPositive ? "+" : ""}${formatNumber(summary.change)}
          </p>
          <span 
            className={cn(
              "ml-2 flex items-center text-sm font-medium rounded-full px-2 py-0.5",
              isPositive ? "bg-success-light text-success" : "bg-danger-light text-danger"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {isPositive ? "+" : ""}
            {summary.changePercentage.toFixed(2)}%
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "150ms" }}>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Holdings</h3>
        <p className="text-2xl font-semibold text-foreground">{summary.holdings}</p>
      </div>
    </div>
  );
};

export default PortfolioSummary;
