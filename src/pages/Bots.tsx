
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BotCard from "@/components/bots/BotCard";
import BotCreateDialog from "@/components/bots/BotCreateDialog";

// Dados simulados para demonstração
const demoAssets = [
  {
    id: "1",
    name: "Bot de Arbitragem BTC",
    pair: "BTC/USDT",
    type: "Arbitragem",
    status: "ativo",
    profit: "+123.45",
    exchange: "Binance",
  },
  {
    id: "2",
    name: "Bot de Tendência ETH",
    pair: "ETH/USDT",
    type: "Tendência",
    status: "ativo",
    profit: "+67.89",
    exchange: "Bybit",
  },
  {
    id: "3",
    name: "Bot de Grid SOL",
    pair: "SOL/USDT",
    type: "Grid",
    status: "inativo",
    profit: "-12.34",
    exchange: "Kucoin",
  },
];

const Bots = () => {
  const [assets, setAssets] = useState(demoAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredAssets = assets.filter((asset) => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.exchange.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBot = (botData: any) => {
    const newBot = {
      id: `${assets.length + 1}`,
      ...botData,
    };
    setAssets([...assets, newBot]);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Bots</h1>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-crypto-yellow text-black hover:bg-crypto-yellow/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar Bot
            </Button>
          </div>
          
          <Card className="bg-crypto-gray border-crypto-lightgray">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crypto-text w-4 h-4" />
                  <Input 
                    placeholder="Pesquisar bots..." 
                    className="pl-9 bg-crypto-lightgray border-crypto-lightgray text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <BotCard key={asset.id} bot={asset} />
            ))}
          </div>
          
          {filteredAssets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-crypto-text">
              <p className="text-lg">Nenhum bot encontrado</p>
              <p className="text-sm">Tente ajustar sua pesquisa ou crie um novo bot</p>
            </div>
          )}
        </div>
      </div>
      
      <BotCreateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateBot}
      />
    </div>
  );
};

export default Bots;
