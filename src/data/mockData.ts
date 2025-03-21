
// Mock data for the asset management application

export interface Client {
  id: string;
  name: string;
  portfolioType: string;
  totalValue: number;
  changePercentage: number;
  lastUpdated: string;
  avatarUrl?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  holdings: number;
  lastUpdated: string;
}

export interface PortfolioTimepoint {
  date: string;
  value: number;
}

export interface Holding {
  symbol: string;
  name: string;
  price: number;
  change: number;
  shares: number;
  value: number;
}

export interface PerformanceDataPoint {
  date: string;
  value: number;
}

// Clients data
export const clients: Client[] = [
  {
    id: "1",
    name: "Robert Meyer",
    portfolioType: "Growth Portfolio",
    totalValue: 60289332,
    changePercentage: 1.33,
    lastUpdated: "2023-03-20",
    avatarUrl: "/lovable-uploads/f4290682-ae34-4a1d-8868-985357548fb0.png"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    portfolioType: "Conservative Portfolio",
    totalValue: 1245000,
    changePercentage: 0.87,
    lastUpdated: "2023-03-20"
  },
  {
    id: "3",
    name: "Michael Zhang",
    portfolioType: "Balanced Portfolio",
    totalValue: 2890000,
    changePercentage: -0.25,
    lastUpdated: "2023-03-20"
  },
  {
    id: "4",
    name: "Emily Wilson",
    portfolioType: "Income Portfolio",
    totalValue: 980000,
    changePercentage: 0.42,
    lastUpdated: "2023-03-20"
  },
  {
    id: "5",
    name: "James Taylor",
    portfolioType: "Growth & Income Portfolio",
    totalValue: 1750000,
    changePercentage: 1.05,
    lastUpdated: "2023-03-20"
  },
  {
    id: "6",
    name: "Jennifer Lopez",
    portfolioType: "Aggressive Growth Portfolio",
    totalValue: 3200000,
    changePercentage: 2.13,
    lastUpdated: "2023-03-20"
  }
];

// Function to get portfolio summary data for a specific client
export const getPortfolioSummary = (clientId: string): PortfolioSummary => {
  const client = clients.find(c => c.id === clientId);
  if (!client) {
    throw new Error(`Client with ID ${clientId} not found`);
  }

  return {
    totalValue: client.totalValue,
    previousValue: client.id === "1" ? 59500000 : client.totalValue * 0.98,
    change: client.id === "1" ? 789332 : client.totalValue * 0.02,
    changePercentage: client.changePercentage,
    holdings: client.id === "1" ? 6 : 8,
    lastUpdated: client.lastUpdated
  };
};

// Portfolio value trend data
export const getPortfolioValueTrend = (clientId: string): PortfolioTimepoint[] => {
  // Starting with an approximate base value
  const baseValue = clients.find(c => c.id === clientId)?.totalValue || 1000000;
  const baseValueInThousands = baseValue / 1000;
  
  return [
    { date: "03/08", value: baseValueInThousands * 0.92 },
    { date: "03/09", value: baseValueInThousands * 0.94 },
    { date: "03/10", value: baseValueInThousands * 0.95 },
    { date: "03/11", value: baseValueInThousands * 0.97 },
    { date: "03/12", value: baseValueInThousands * 0.96 },
    { date: "03/13", value: baseValueInThousands * 0.98 },
    { date: "03/14", value: baseValueInThousands * 0.99 },
    { date: "03/15", value: baseValueInThousands * 0.98 },
    { date: "03/16", value: baseValueInThousands * 0.99 },
    { date: "03/17", value: baseValueInThousands * 1.01 },
    { date: "03/18", value: baseValueInThousands * 1.02 },
    { date: "03/19", value: baseValueInThousands },
    { date: "03/20", value: baseValueInThousands * 1.03 }
  ];
};

// Daily performance data
export const getDailyPerformance = (clientId: string): PerformanceDataPoint[] => {
  return [
    { date: "03/08", value: 0.8 },
    { date: "03/09", value: 0.3 },
    { date: "03/10", value: 1.2 },
    { date: "03/11", value: 1.0 },
    { date: "03/12", value: 0.9 },
    { date: "03/13", value: -1.5 },
    { date: "03/14", value: 1.8 },
    { date: "03/15", value: 0.2 },
    { date: "03/16", value: 0.5 },
    { date: "03/17", value: 0.4 },
    { date: "03/18", value: 2.1 },
    { date: "03/19", value: 2.3 },
    { date: "03/20", value: 1.1 }
  ];
};

// Holdings data
export const getHoldings = (clientId: string): Holding[] => {
  if (clientId === "1") {
    return [
      { symbol: "MSFT", name: "Microsoft Corporation", price: 403.78, change: 0.80, shares: 30, value: 12113.4 },
      { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 1.39, shares: 50, value: 8936 },
      { symbol: "META", name: "Meta Platforms Inc.", price: 478.22, change: -0.95, shares: 15, value: 7173.3 },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.35, change: 0.62, shares: 40, value: 7134 },
      { symbol: "GOOG", name: "Alphabet Inc.", price: 147.60, change: 1.20, shares: 35, value: 5166 },
      { symbol: "TSLA", name: "Tesla Inc.", price: 175.34, change: -1.50, shares: 25, value: 4383.5 }
    ];
  } else {
    // Generic holdings for other clients
    return [
      { symbol: "MSFT", name: "Microsoft Corporation", price: 403.78, change: 0.80, shares: 5, value: 2018.9 },
      { symbol: "AAPL", name: "Apple Inc.", price: 178.72, change: 1.39, shares: 8, value: 1429.76 },
      { symbol: "META", name: "Meta Platforms Inc.", price: 478.22, change: -0.95, shares: 2, value: 956.44 },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.35, change: 0.62, shares: 6, value: 1070.1 },
      { symbol: "GOOG", name: "Alphabet Inc.", price: 147.60, change: 1.20, shares: 4, value: 590.4 },
      { symbol: "TSLA", name: "Tesla Inc.", price: 175.34, change: -1.50, shares: 3, value: 526.02 },
      { symbol: "JPM", name: "JPMorgan Chase & Co", price: 197.45, change: 0.30, shares: 5, value: 987.25 },
      { symbol: "V", name: "Visa Inc.", price: 275.98, change: 0.45, shares: 4, value: 1103.92 }
    ];
  }
};

// Function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Function to format percentage
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};
