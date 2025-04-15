
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
    <Card className="bg-crypto-gray border-crypto-lightgray overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{bot.name}</CardTitle>
          <Badge className={bot.status === "ativo" ? "bg-crypto-positive" : "bg-crypto-negative"}>
            {bot.status === "ativo" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Par</span>
            <span className="font-medium">{bot.pair}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Tipo</span>
            <span className="font-medium">{bot.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Exchange</span>
            <span className="font-medium">{bot.exchange}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Lucro</span>
            <span className={`font-medium flex items-center ${isProfit ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
              {isProfit ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {bot.profit}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-crypto-yellow text-crypto-yellow hover:bg-crypto-lightgray">
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BotCard;
