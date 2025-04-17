
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const assetDistribution = [
  { name: "Spot", value: 30, color: "#3498DB" },
  { name: "USD-M", value: 35, color: "#34DB9E" },
  { name: "COIN-M", value: 15, color: "#F0B90B" },
  { name: "Arbitrage Bot", value: 20, color: "#00E396" },
];

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('spot');

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section - Balance Information */}
          <div className="w-full md:w-2/5">
            <div className="flex items-center gap-2 mb-4">
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

            <div className="flex items-center gap-2 mb-6">
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

            <div className="py-2 px-3 bg-crypto-lightgray rounded-md flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Today's PNL</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4" />
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

            <div className="space-y-4">
              <div className="flex gap-2">
                {['spot', 'usd-m', 'coin-m', 'arbitrage-bot'].map((wallet) => (
                  <Button
                    key={wallet}
                    variant={selectedWallet === wallet ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedWallet(wallet)}
                    className="text-xs capitalize"
                  >
                    {wallet.replace('-', ' ')}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm mb-1">Balance (BTC)</div>
                  <div className="text-xl font-bold">567.12345678</div>
                  <div className="text-sm text-muted-foreground">≈ $123,456.54</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Available Balance</span>
                    <span className="text-sm font-medium">123.45678 BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Frozen Balance</span>
                    <span className="text-sm font-medium">0.00000000 BTC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Charts */}
          <div className="w-full md:w-3/5">
            <Tabs defaultValue="asset-distribution" className="w-full">
              <TabsList className="bg-transparent border-b border-crypto-lightgray w-full justify-start mb-6">
                <TabsTrigger value="asset-distribution" className="data-[state=active]:bg-transparent">
                  Asset Distribution
                </TabsTrigger>
                <TabsTrigger value="accumulated-value" className="data-[state=active]:bg-transparent">
                  Accumulated Value
                </TabsTrigger>
              </TabsList>

              <TabsContent value="asset-distribution" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {assetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                    />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`]}
                      contentStyle={{
                        backgroundColor: "#1E2329",
                        borderColor: "#2B3139",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="accumulated-value">
                {/* You can implement the accumulated value chart here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
