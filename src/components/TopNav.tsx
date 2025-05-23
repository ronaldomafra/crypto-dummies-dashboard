
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import { 
  Bell, ChevronDown, Globe, LogOut, Search, Settings, User,
  LayoutDashboard, Bot, Wallet
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const TopNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-16 border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center gap-8">
        <Logo size="sm" />
        
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <LayoutDashboard className="mr-1" size={16} />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/bots")}>
            <Bot className="mr-1" size={16} />
            Bots
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/carteiras")}>
            <Wallet className="mr-1" size={16} />
            Carteiras
          </Button>
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Pesquisar..." 
            className="pl-8 w-60 bg-secondary"
          />
        </div>
        
        <ThemeToggle />
        
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Globe size={20} />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-trading-error">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNav;
