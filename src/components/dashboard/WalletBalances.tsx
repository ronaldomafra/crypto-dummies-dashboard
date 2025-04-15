
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WalletBalances = () => {
  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
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
            </div>
          </TabsContent>
          <TabsContent value="usd-m">
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground text-center py-8">
                No USD-M balances available
              </div>
            </div>
          </TabsContent>
          <TabsContent value="coin-m">
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground text-center py-8">
                No COIN-M balances available
              </div>
            </div>
          </TabsContent>
          <TabsContent value="arbitrage">
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground text-center py-8">
                No Arbitrage Bot balances available
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletBalances;
