
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExchangeConfigProps {
  onSave: (config: ExchangeConfigData) => void;
  onCancel: () => void;
}

interface ExchangeConfigData {
  baseUrl?: string;
  apiKey?: string;
  secretKey?: string;
}

const exchanges = [
  { id: "binance", name: "Binance" },
  { id: "ftx", name: "FTX" },
  { id: "coinbase", name: "Coinbase" },
  { id: "kucoin", name: "KuCoin" },
];

export const ExchangeConfig: React.FC<ExchangeConfigProps> = ({ onSave, onCancel }) => {
  const [selectedExchange, setSelectedExchange] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  
  const handleSave = () => {
    onSave({
      baseUrl: selectedExchange,
      apiKey,
      secretKey,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configurar Exchange</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Exchange</label>
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma exchange" />
            </SelectTrigger>
            <SelectContent>
              {exchanges.map((exchange) => (
                <SelectItem key={exchange.id} value={exchange.id}>
                  {exchange.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">API Key</label>
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Cole sua API key aqui"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Secret Key</label>
          <Input
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            type="password"
            placeholder="Cole sua Secret key aqui"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
};
