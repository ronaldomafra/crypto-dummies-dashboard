
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WalletBalances from "./WalletBalances";
import BalancePieChart from "./BalancePieChart";
import AccumulatedValueChart from "./AccumulatedValueChart";

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardContent className="p-6">
        <div className="flex flex-col gap-8">
          {/* Top Section - Balance Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Total Balance</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The total value of all your assets</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">
                {hideBalance ? "••••••" : "94,836.95"}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setHideBalance(!hideBalance)}
              >
                {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">USDT</span>
            </div>

            <div className="py-2 px-3 bg-crypto-lightgray rounded-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Today's PNL</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profit and Loss for today</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-crypto-positive text-sm font-medium">
                + $65,231.76
              </div>
            </div>
          </div>

          {/* Bottom Section - Tabs */}
          <Tabs defaultValue="wallet-balances" className="w-full">
            <TabsList className="bg-transparent border-b border-crypto-lightgray w-full justify-start mb-6">
              <TabsTrigger value="wallet-balances" className="data-[state=active]:bg-transparent">
                Wallet Balances
              </TabsTrigger>
              <TabsTrigger value="asset-distribution" className="data-[state=active]:bg-transparent">
                Asset Distribution
              </TabsTrigger>
              <TabsTrigger value="accumulated-value" className="data-[state=active]:bg-transparent">
                Accumulated Value
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wallet-balances">
              <WalletBalances />
            </TabsContent>

            <TabsContent value="asset-distribution">
              <BalancePieChart />
            </TabsContent>

            <TabsContent value="accumulated-value">
              <AccumulatedValueChart />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
