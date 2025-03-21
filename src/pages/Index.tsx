
import { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ClientCard from "@/components/ClientCard";
import { Input } from "@/components/ui/input";
import { clients } from "@/data/mockData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.portfolioType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Clients</h1>
              <p className="text-muted-foreground mt-1">
                Manage your client portfolios
              </p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-foreground">No clients found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
