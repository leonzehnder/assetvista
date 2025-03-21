
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Client, formatCurrency } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
  const isPositive = client.changePercentage >= 0;
  
  // Generate initials for avatar fallback
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      to={`/portfolio/${client.id}`}
      className="block group"
    >
      <div className="bg-white rounded-lg border border-border p-6 transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={client.avatarUrl} alt={client.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.portfolioType}</p>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center text-sm font-medium rounded-full px-2.5 py-0.5",
              isPositive ? "bg-success-light text-success" : "bg-danger-light text-danger"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            {isPositive ? "+" : ""}
            {client.changePercentage.toFixed(2)}%
          </div>
        </div>
        
        <div>
          <div className="text-2xl font-semibold text-foreground">
            {formatCurrency(client.totalValue)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Updated {client.lastUpdated}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
