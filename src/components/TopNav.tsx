
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { 
  Bell, ChevronDown, Globe, LogOut, Search, Settings, User 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const TopNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-16 border-b border-crypto-lightgray flex items-center px-4 justify-between">
      <div className="flex items-center gap-8">
        <Logo size="sm" />
        
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">Buy Crypto</Button>
          <Button variant="ghost" size="sm">Markets</Button>
          <Button variant="ghost" size="sm">Trade <ChevronDown size={16} /></Button>
          <Button variant="ghost" size="sm">Futures <ChevronDown size={16} /></Button>
          <Button variant="ghost" size="sm">Earn</Button>
          <Button variant="ghost" size="sm">Learn <ChevronDown size={16} /></Button>
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 w-60 bg-crypto-lightgray focus:bg-crypto-gray"
          />
        </div>
        
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
          <DropdownMenuContent align="end" className="w-56 bg-crypto-gray border-crypto-lightgray">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-crypto-negative">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button size="sm" className="bg-crypto-yellow hover:bg-crypto-yellow/90 text-black">
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default TopNav;
