
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CarteiraCard from "@/components/carteiras/CarteiraCard";
import CarteiraCreateSheet from "@/components/carteiras/CarteiraCreateSheet";

// Dados simulados para demonstração
const demoCarteiras = [
  {
    id: "1",
    nome: "Carteira Binance Principal",
    exchange: "Binance",
    saldo: "12.345 USDT",
    moedas: ["BTC", "ETH", "SOL", "ADA"],
    imagem: "/placeholder.svg"
  },
  {
    id: "2",
    nome: "Carteira Bybit Spot",
    exchange: "Bybit",
    saldo: "5.678 USDT",
    moedas: ["BTC", "ETH", "LINK"],
    imagem: "/placeholder.svg"
  },
  {
    id: "3",
    nome: "Carteira Kucoin Futuros",
    exchange: "Kucoin",
    saldo: "9.012 USDT",
    moedas: ["BTC", "ETH", "DOT", "AVAX"],
    imagem: "/placeholder.svg"
  },
];

const Carteiras = () => {
  const [carteiras, setCarteiras] = useState(demoCarteiras);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  
  const filteredCarteiras = carteiras.filter((carteira) => 
    carteira.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carteira.exchange.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCarteira = (carteiraData: any) => {
    const newCarteira = {
      id: `${carteiras.length + 1}`,
      ...carteiraData,
    };
    setCarteiras([...carteiras, newCarteira]);
    setIsCreateSheetOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Carteiras</h1>
            <Button 
              onClick={() => setIsCreateSheetOpen(true)}
              className="bg-crypto-yellow text-black hover:bg-crypto-yellow/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar Carteira
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
                    placeholder="Pesquisar carteiras..." 
                    className="pl-9 bg-crypto-lightgray border-crypto-lightgray text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCarteiras.map((carteira) => (
              <CarteiraCard key={carteira.id} carteira={carteira} />
            ))}
          </div>
          
          {filteredCarteiras.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-crypto-text">
              <p className="text-lg">Nenhuma carteira encontrada</p>
              <p className="text-sm">Tente ajustar sua pesquisa ou crie uma nova carteira</p>
            </div>
          )}
        </div>
      </div>
      
      <CarteiraCreateSheet
        open={isCreateSheetOpen}
        onClose={() => setIsCreateSheetOpen(false)}
        onSubmit={handleCreateCarteira}
      />
    </div>
  );
};

export default Carteiras;
