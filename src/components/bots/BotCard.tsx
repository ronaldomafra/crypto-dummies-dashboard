
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

interface BotCardProps {
  bot: {
    id: string;
    name: string;
    pair: string;
    type: string;
    status: string;
    profit: string;
    exchange: string;
  };
}

const BotCard = ({ bot }: BotCardProps) => {
  const isProfit = !bot.profit.startsWith("-");

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{bot.name}</CardTitle>
          <Badge className={bot.status === "ativo" ? "bg-trading-success" : "bg-trading-error"}>
            {bot.status === "ativo" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Par</span>
            <span className="font-medium">{bot.pair}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Tipo</span>
            <span className="font-medium">{bot.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Exchange</span>
            <span className="font-medium">{bot.exchange}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Lucro</span>
            <span className={`font-medium flex items-center ${isProfit ? 'text-trading-success' : 'text-trading-error'}`}>
              {isProfit ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {bot.profit}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-trading-primary text-trading-primary hover:bg-muted">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BotCard;
