
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Bot {
  id: string;
  pair: string;
  type: string;
  position: "long" | "short";
  investment: string;
  currentPositions: string;
  btc: string;
  profit: string;
  profitValue: number;
}

// Sample data
const botData: Bot[] = [
  {
    id: "1",
    pair: "BTC/USDT",
    type: "Perp",
    position: "long",
    investment: "3.89737162",
    currentPositions: "123456.78 USDT",
    btc: "0.11 BTC",
    profit: "+123456.78 USDT",
    profitValue: 123456.78,
  },
  {
    id: "2",
    pair: "ETH/USDT",
    type: "Perp",
    position: "short",
    investment: "3.89737162",
    currentPositions: "123456.78 USDT",
    btc: "0.11 BTC",
    profit: "+123456.78 USDT",
    profitValue: 123456.78,
  },
  {
    id: "3",
    pair: "SOL/USDT",
    type: "Perp",
    position: "long",
    investment: "3.89737162",
    currentPositions: "123456.78 USDT",
    btc: "0.11 BTC",
    profit: "+123456.78 USDT",
    profitValue: 123456.78,
  },
  {
    id: "4",
    pair: "BNB/USDT",
    type: "Perp",
    position: "short",
    investment: "3.89737162",
    currentPositions: "123456.78 USDT",
    btc: "0.11 BTC",
    profit: "+123456.78 USDT",
    profitValue: 123456.78,
  },
];

const BotTable = () => {
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handlePairClick = (pair: string) => {
    setSelectedPair(pair);
    setIsChartOpen(true);
  };

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <>
      <Card className="bg-crypto-gray border-crypto-lightgray">
        <CardHeader className="pb-0 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Arbitrage Bot</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-crypto-lightgray">
              Running
            </Button>
            <Button variant="outline" size="sm" className="border-crypto-lightgray">
              Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-crypto-lightgray hover:bg-transparent">
                <TableHead className="text-crypto-text">Portfolio</TableHead>
                <TableHead className="text-crypto-text text-right">Total Investment</TableHead>
                <TableHead className="text-crypto-text text-right">Current Positions</TableHead>
                <TableHead className="text-crypto-text text-right">Total Arbitrage Profit</TableHead>
                <TableHead className="text-crypto-text text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {botData.map((bot) => (
                <>
                  <TableRow 
                    key={bot.id} 
                    className={cn(
                      "border-crypto-lightgray hover:bg-crypto-lightgray cursor-pointer",
                      expandedRowId === bot.id && "bg-crypto-lightgray"
                    )}
                    onClick={() => toggleRow(bot.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        <div className={cn(
                          "w-1.5 h-4 rounded-sm mr-1",
                          bot.position === "long" ? "bg-crypto-positive" : "bg-crypto-negative"
                        )} />
                        <span>{bot.pair}</span>
                        <span className="text-xs bg-crypto-lightgray px-1.5 py-0.5 rounded">10x</span>
                        {expandedRowId === bot.id ? (
                          <ChevronUp size={16} className="ml-1" />
                        ) : (
                          <ChevronDown size={16} className="ml-1" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {bot.position === "long" ? (
                          <span className="text-crypto-positive inline-flex items-center">
                            <ArrowUp size={12} /> Long
                          </span>
                        ) : (
                          <span className="text-crypto-negative inline-flex items-center">
                            <ArrowDown size={12} /> Short
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{bot.investment}</TableCell>
                    <TableCell className="text-right">
                      <div>{bot.currentPositions}</div>
                      <div className="text-xs text-muted-foreground">{bot.btc}</div>
                    </TableCell>
                    <TableCell className="text-right text-crypto-positive">{bot.profit}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        size="sm" 
                        className="text-crypto-yellow hover:text-crypto-yellow bg-transparent hover:bg-crypto-lightgray border-crypto-yellow"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePairClick(bot.pair);
                        }}
                      >
                        View Bots
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRowId === bot.id && (
                    <TableRow className="border-crypto-lightgray bg-crypto-lightgray">
                      <TableCell colSpan={5} className="p-0">
                        <div className="w-full h-[400px] overflow-hidden">
                          <iframe
                            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${bot.pair?.replace('/', '')}&interval=1H&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=exchange&withdateranges=1&allowtransparency=true`}
                            className="w-full h-full border-0"
                            title={`TradingView Chart - ${bot.pair}`}
                          ></iframe>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isChartOpen} onOpenChange={setIsChartOpen}>
        <DialogContent className="sm:max-w-[900px] bg-crypto-gray border-crypto-lightgray">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedPair} Chart (1 Hour)</span>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X size={20} />
                </Button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-[500px] overflow-hidden">
            <iframe
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${selectedPair?.replace('/', '')}&interval=1H&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=exchange&withdateranges=1&allowtransparency=true`}
              className="w-full h-full border-0"
              title={`TradingView Chart - ${selectedPair}`}
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BotTable;
