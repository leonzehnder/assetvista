
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Users, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  to: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, text, to, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-foreground/70")} />
      <span>{text}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-screen w-60 border-r border-border flex flex-col bg-sidebar">
      <div className="p-6">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white">A</span>
          AssetVista
        </h1>
      </div>
      
      <div className="flex-1 px-3 py-2 space-y-1">
        <SidebarItem
          icon={BarChart3}
          text="Investments"
          to="/investments"
          isActive={currentPath.includes('/portfolio')}
        />
        <SidebarItem
          icon={Users}
          text="Clients"
          to="/"
          isActive={currentPath === '/'}
        />
      </div>
      
      <div className="px-3 py-6 space-y-1 border-t border-border">
        <SidebarItem
          icon={Settings}
          text="Settings"
          to="/settings"
          isActive={currentPath === '/settings'}
        />
        <SidebarItem
          icon={HelpCircle}
          text="Help & Support"
          to="/help"
          isActive={currentPath === '/help'}
        />
      </div>
    </div>
  );
};

export default Sidebar;
