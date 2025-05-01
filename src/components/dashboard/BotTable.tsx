
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronUp, ChevronDown, EyeOff, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const bots = [
  { id: 1, name: "Robô BTX", status: "online", exchange: "Binance", pair: "BTC/USDT", profit: "+2.5%", lastUpdate: "3 min atrás" },
  { id: 2, name: "Arbitragem BNB", status: "offline", exchange: "Bybit", pair: "BNB/USDT", profit: "-0.8%", lastUpdate: "20 min atrás" },
  { id: 3, name: "Grid SOL", status: "online", exchange: "Kucoin", pair: "SOL/USDT", profit: "+1.2%", lastUpdate: "5 min atrás" },
  { id: 4, name: "DCA ETH", status: "online", exchange: "Binance", pair: "ETH/USDT", profit: "+3.7%", lastUpdate: "1 min atrás" },
];

const BotTable = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Robôs Ativos</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleVisibility}>
            {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isHidden ? "Mostrar" : "Ocultar"}
          </Button>
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Novo Robô
          </Button>
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleMinimize}>
            {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            {isMinimized ? "Expandir" : "Minimizar"}
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-muted-foreground py-3 pl-4">
                    <Checkbox />
                  </th>
                  <th className="text-left font-medium text-muted-foreground py-3">Nome</th>
                  <th className="text-left font-medium text-muted-foreground py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground py-3">Exchange</th>
                  <th className="text-left font-medium text-muted-foreground py-3">Par</th>
                  <th className="text-left font-medium text-muted-foreground py-3">Lucro</th>
                  <th className="text-left font-medium text-muted-foreground py-3">Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                {bots.map((bot) => (
                  <tr key={bot.id} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 pl-4"><Checkbox /></td>
                    <td className="py-3">{bot.name}</td>
                    <td className="py-3">
                      <Badge 
                        variant="outline" 
                        className={`
                          ${bot.status === "online" 
                            ? "text-trading-success border-trading-success" 
                            : "text-trading-error border-trading-error"}
                        `}
                      >
                        {bot.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </td>
                    <td className="py-3">{isHidden ? "•••••" : bot.exchange}</td>
                    <td className="py-3">{isHidden ? "•••••" : bot.pair}</td>
                    <td className={`py-3 ${bot.profit.includes("+") ? "text-trading-success" : "text-trading-error"}`}>
                      {isHidden ? "•••••" : bot.profit}
                    </td>
                    <td className="py-3 text-muted-foreground">{bot.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default BotTable;
