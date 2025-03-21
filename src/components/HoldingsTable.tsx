
import { ArrowUpRight, ArrowDownRight, Eye } from "lucide-react";
import { Holding } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HoldingsTableProps {
  holdings: Holding[];
}

const HoldingsTable = ({ holdings }: HoldingsTableProps) => {
  return (
    <div className="bg-white rounded-lg border border-border p-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-base font-medium text-foreground mb-4">Holdings</h3>
      <div className="overflow-x-auto">
        <table className="w-full holdings-table">
          <thead>
            <tr>
              <th className="text-left">Symbol</th>
              <th className="text-left">Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">Change</th>
              <th className="text-right">Shares</th>
              <th className="text-right">Value</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.symbol} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-primary">{holding.symbol}</td>
                <td className="py-3 px-4">{holding.name}</td>
                <td className="py-3 px-4 text-right">${holding.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end">
                    <span
                      className={cn(
                        "flex items-center",
                        holding.change >= 0 ? "text-success" : "text-danger"
                      )}
                    >
                      {holding.change >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {holding.change >= 0 ? "+" : ""}
                      {holding.change.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">{holding.shares}</td>
                <td className="py-3 px-4 text-right font-medium">${holding.value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</td>
                <td className="py-3 px-4 text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;
