
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CarteiraCardProps {
  carteira: {
    id: string;
    nome: string;
    exchange: string;
    saldo: string;
    moedas: string[];
    imagem: string;
  };
}

const CarteiraCard = ({ carteira }: CarteiraCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="w-full h-40 bg-muted">
        <img 
          src={carteira.imagem} 
          alt={carteira.nome} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">{carteira.nome}</CardTitle>
          <Badge className="bg-trading-primary text-background font-medium">
            {carteira.exchange}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Saldo</span>
            <span className="font-medium">{carteira.saldo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Moedas</span>
            <div className="flex gap-1">
              {carteira.moedas.slice(0, 3).map((moeda) => (
                <Badge key={moeda} variant="outline" className="border-muted">
                  {moeda}
                </Badge>
              ))}
              {carteira.moedas.length > 3 && (
                <Badge variant="outline" className="border-muted">
                  +{carteira.moedas.length - 3}
                </Badge>
              )}
            </div>
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

export default CarteiraCard;
