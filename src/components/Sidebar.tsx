
import { cn } from "@/lib/utils";
import { 
  BarChart2, ChevronDown, CircleDollarSign, 
  CreditCard, HelpCircle, LayoutDashboard, Wallet,
  Settings, TrendingUp, User, Users, Bot
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isNested?: boolean;
  isActive?: boolean;
  hasDropdown?: boolean;
}

const SidebarLink = ({ 
  icon: Icon, 
  label, 
  to, 
  isNested = false,
  hasDropdown = false
}: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
        isActive 
          ? "bg-crypto-lightgray text-white" 
          : "text-crypto-text hover:bg-crypto-lightgray hover:text-white",
        isNested && "ml-4"
      )}
    >
      <Icon size={20} />
      <span className="flex-1">{label}</span>
      {hasDropdown && <ChevronDown size={16} />}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="w-56 border-r border-crypto-lightgray h-[calc(100vh-64px)] flex flex-col py-4">
      <div className="space-y-1 px-2">
        <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
        <SidebarLink icon={Bot} label="Bots" to="/bots" />
        <SidebarLink icon={Wallet} label="Carteiras" to="/carteiras" />
        <SidebarLink icon={CircleDollarSign} label="Ganhos" to="/ganhos" />
        <SidebarLink icon={BarChart2} label="Financiamento" to="/financiamento" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-crypto-lightgray">
        <div className="space-y-1 px-2">
          <SidebarLink icon={User} label="Pedidos" to="/pedidos" hasDropdown />
          <SidebarLink icon={Users} label="Centro de Recompensas" to="/recompensas" />
          <SidebarLink icon={HelpCircle} label="Indicações" to="/indicacoes" />
          <SidebarLink icon={User} label="Conta" to="/conta" hasDropdown />
          <SidebarLink icon={Settings} label="Configurações" to="/configuracoes" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
