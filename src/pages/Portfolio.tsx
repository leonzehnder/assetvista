
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import PortfolioSummary from "@/components/PortfolioSummary";
import PortfolioValueChart from "@/components/PortfolioValueChart";
import DailyPerformanceChart from "@/components/DailyPerformanceChart";
import HoldingsTable from "@/components/HoldingsTable";
import PerformanceCard from "@/components/PerformanceCard";
import { 
  clients, 
  getPortfolioSummary, 
  getPortfolioValueTrend, 
  getDailyPerformance, 
  getHoldings 
} from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Portfolio = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast.success("Portfolio data loaded successfully");
    }, 800);
    return () => clearTimeout(timer);
  }, [clientId]);

  if (!clientId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Client not found</h1>
          <p className="text-muted-foreground mb-4">Please select a client from the clients page</p>
          <Button asChild>
            <Link to="/">Go back to clients</Link>
          </Button>
        </div>
      </div>
    );
  }

  const client = clients.find(c => c.id === clientId);
  
  if (!client) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Client not found</h1>
          <p className="text-muted-foreground mb-4">The requested client doesn't exist</p>
          <Button asChild>
            <Link to="/">Go back to clients</Link>
          </Button>
        </div>
      </div>
    );
  }

  const summary = getPortfolioSummary(clientId);
  const valueData = getPortfolioValueTrend(clientId);
  const performanceData = getDailyPerformance(clientId);
  const holdings = getHoldings(clientId);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-medium text-muted-foreground">Loading portfolio data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <Button 
                variant="ghost" 
                asChild 
                className="mb-2 pl-0 hover:bg-transparent text-muted-foreground"
              >
                <Link to="/" className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Clients
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Portfolio Dashboard</h1>
            </div>
            
            <div className="flex items-center bg-white border border-border rounded-lg px-4 py-2 text-sm">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Today</span>
              <div className="ml-2 px-2 py-0.5 rounded-full text-xs bg-success-light text-success font-medium">
                +{summary.changePercentage.toFixed(2)}%
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">{client.portfolioType}</h2>
            <p className="text-muted-foreground">Client: {client.name}</p>
          </div>
          
          <PortfolioSummary summary={summary} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <PortfolioValueChart data={valueData} />
            </div>
            <DailyPerformanceChart data={performanceData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            <div className="lg:col-span-3">
              <HoldingsTable holdings={holdings} />
            </div>
            <div className="lg:col-span-1">
              <PerformanceCard data={performanceData} />
              
              <Card className="mt-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
                <CardHeader className="pb-2">
                  <h3 className="text-base font-medium text-foreground">Quick Actions</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline" onClick={() => toast.info("This feature is coming soon!")}>
                      View Reports
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => toast.info("This feature is coming soon!")}>
                      Set Alerts
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => toast.info("This feature is coming soon!")}>
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
