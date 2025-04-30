
import { cn } from "@/lib/utils";
import { 
  BarChart2, ChevronRight, CircleDollarSign, 
  LayoutDashboard, Wallet, Settings, User, Bot, ChevronDown
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isNested?: boolean;
  isActive?: boolean;
  hasDropdown?: boolean;
  collapsed?: boolean;
}

const SidebarLink = ({ 
  icon: Icon, 
  label, 
  to, 
  isNested = false,
  hasDropdown = false,
  collapsed = false
}: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
        isActive 
          ? "bg-trading-primary/20 text-trading-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        isNested && "ml-4",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon size={20} />
      {!collapsed && (
        <>
          <span className="flex-1">{label}</span>
          {hasDropdown && <ChevronDown size={16} />}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div 
      className={cn(
        "border-r border-border h-[calc(100vh-64px)] flex flex-col py-4 transition-all duration-300 relative",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div className="flex justify-end mb-2 px-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            !collapsed && "rotate-180"
          )} />
        </Button>
      </div>

      <div className="space-y-1 px-2">
        <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" collapsed={collapsed} />
        <SidebarLink icon={Bot} label="Bots" to="/bots" collapsed={collapsed} />
        <SidebarLink icon={Wallet} label="Carteiras" to="/carteiras" collapsed={collapsed} />
        <SidebarLink icon={CircleDollarSign} label="Ganhos" to="/ganhos" collapsed={collapsed} />
        <SidebarLink icon={BarChart2} label="Visão Geral" to="/visao-geral" collapsed={collapsed} />
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="space-y-1 px-2">
          <SidebarLink icon={User} label="Conta" to="/conta" hasDropdown collapsed={collapsed} />
          <SidebarLink icon={Settings} label="Configurações" to="/configuracoes" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
