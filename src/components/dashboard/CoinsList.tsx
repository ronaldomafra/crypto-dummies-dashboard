
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, EyeOff, Eye, ChevronRight } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Coin = {
  id: number;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  volume: string;
  marketCap: string;
};

const coins: Coin[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: "$54,321.00", change24h: "+2.5%", volume: "$45.2B", marketCap: "$1.02T" },
  { id: 2, name: "Ethereum", symbol: "ETH", price: "$1,875.43", change24h: "+1.2%", volume: "$23.5B", marketCap: "$226.8B" },
  { id: 3, name: "Binance Coin", symbol: "BNB", price: "$321.75", change24h: "-0.8%", volume: "$1.9B", marketCap: "$54.1B" },
  { id: 4, name: "Solana", symbol: "SOL", price: "$85.32", change24h: "+4.3%", volume: "$3.2B", marketCap: "$32.1B" },
  { id: 5, name: "Cardano", symbol: "ADA", price: "$0.52", change24h: "-1.5%", volume: "$1.1B", marketCap: "$18.3B" },
];

const CoinsList = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [expandedCoin, setExpandedCoin] = useState<number | null>(null);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const toggleCoinExpand = (coinId: number) => {
    if (expandedCoin === coinId) {
      setExpandedCoin(null);
    } else {
      setExpandedCoin(coinId);
    }
  };

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Lista de Moedas</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleVisibility}>
            {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isHidden ? "Mostrar" : "Ocultar"}
          </Button>
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleMinimize}>
            {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            {isMinimized ? "Expandir" : "Minimizar"}
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>24h</TableHead>
                <TableHead className="hidden md:table-cell">Volume</TableHead>
                <TableHead className="hidden md:table-cell">Cap. de Mercado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin) => (
                <>
                  <TableRow 
                    key={coin.id} 
                    className="cursor-pointer"
                    onClick={() => toggleCoinExpand(coin.id)}
                  >
                    <TableCell>
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform ${expandedCoin === coin.id ? 'rotate-90' : ''}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {coin.symbol}
                        </Badge>
                        <span className="font-medium">{coin.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {isHidden ? "•••••" : coin.price}
                    </TableCell>
                    <TableCell>
                      <span className={coin.change24h.includes('+') ? 'text-trading-success' : 'text-trading-error'}>
                        {isHidden ? "•••••" : coin.change24h}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {isHidden ? "•••••" : coin.volume}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {isHidden ? "•••••" : coin.marketCap}
                    </TableCell>
                  </TableRow>
                  {expandedCoin === coin.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="px-4 py-4 bg-muted/20">
                          <div className="w-full h-[400px] border border-border rounded-md overflow-hidden">
                            <iframe
                              title={`TradingView Chart for ${coin.name}`}
                              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_e9f33&symbol=${coin.symbol}USD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&calendar=1&theme=dark&style=1&timezone=exchange&studies=[]&withdateranges=1&showpopupbutton=1`}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default CoinsList;
