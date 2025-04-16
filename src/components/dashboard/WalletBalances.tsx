
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WalletBalances = () => {
  return (
    <Card className="bg-crypto-gray border-crypto-lightgray h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Wallet Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spot">
          <TabsList className="bg-crypto-lightgray mb-4">
            <TabsTrigger value="spot">Spot</TabsTrigger>
            <TabsTrigger value="usd-m">USD©-M</TabsTrigger>
            <TabsTrigger value="coin-m">COIN-M</TabsTrigger>
            <TabsTrigger value="arbitrage">Arbitrage Bot</TabsTrigger>
          </TabsList>
          <TabsContent value="spot">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Balance (BTC)</div>
              <div className="text-3xl font-bold">567.12345678</div>
              <div className="text-sm text-muted-foreground">≈ $123,456,7.54</div>
              
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Total Funding(BTC)</div>
                  <div className="text-crypto-positive text-2xl font-semibold">+567.12345678</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">≈ $123,456,7.54</div>
              </div>
              
              <div className="mt-4 border-t border-crypto-lightgray pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Available Balance</div>
                  <div className="text-sm font-medium">123.45678 BTC</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Frozen Balance</div>
                  <div className="text-sm font-medium">0.00000000 BTC</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="usd-m">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Balance (USD-M)</div>
              <div className="text-3xl font-bold">12,345.67</div>
              <div className="text-sm text-muted-foreground">≈ $12,345.67</div>
              
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Total Funding(USD)</div>
                  <div className="text-crypto-positive text-2xl font-semibold">+10,234.56</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">≈ $10,234.56</div>
              </div>
              
              <div className="mt-4 border-t border-crypto-lightgray pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Available Balance</div>
                  <div className="text-sm font-medium">12,345.67 USD</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Frozen Balance</div>
                  <div className="text-sm font-medium">0.00 USD</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="coin-m">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Balance (COIN-M)</div>
              <div className="text-3xl font-bold">98.76543210</div>
              <div className="text-sm text-muted-foreground">≈ $45,678.90</div>
              
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Total Funding</div>
                  <div className="text-crypto-positive text-2xl font-semibold">+45.67890123</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">≈ $21,345.67</div>
              </div>
              
              <div className="mt-4 border-t border-crypto-lightgray pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Available Balance</div>
                  <div className="text-sm font-medium">98.76543210 COIN</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Frozen Balance</div>
                  <div className="text-sm font-medium">0.00000000 COIN</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="arbitrage">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">Balance (Arbitrage)</div>
              <div className="text-3xl font-bold">789.01234567</div>
              <div className="text-sm text-muted-foreground">≈ $987,654.32</div>
              
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">Total Funding</div>
                  <div className="text-crypto-positive text-2xl font-semibold">+234.56789012</div>
                </div>
                <div className="text-right text-sm text-muted-foreground">≈ $567,890.12</div>
              </div>
              
              <div className="mt-4 border-t border-crypto-lightgray pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Available Balance</div>
                  <div className="text-sm font-medium">789.01234567 BOT</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Frozen Balance</div>
                  <div className="text-sm font-medium">0.00000000 BOT</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Active Bots</div>
                  <div className="text-sm font-medium">12</div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm">Total Profit</div>
                  <div className="text-sm font-medium text-crypto-positive">+123.45678901 BOT</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletBalances;
