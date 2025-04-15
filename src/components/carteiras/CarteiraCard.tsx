
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
    <Card className="bg-crypto-gray border-crypto-lightgray overflow-hidden">
      <div className="w-full h-40 bg-crypto-lightgray">
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
          <Badge className="bg-crypto-yellow text-black font-medium">
            {carteira.exchange}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Saldo</span>
            <span className="font-medium">{carteira.saldo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-crypto-text text-sm">Moedas</span>
            <div className="flex gap-1">
              {carteira.moedas.slice(0, 3).map((moeda) => (
                <Badge key={moeda} variant="outline" className="border-crypto-lightgray">
                  {moeda}
                </Badge>
              ))}
              {carteira.moedas.length > 3 && (
                <Badge variant="outline" className="border-crypto-lightgray">
                  +{carteira.moedas.length - 3}
                </Badge>
              )}
            </div>
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

export default CarteiraCard;
