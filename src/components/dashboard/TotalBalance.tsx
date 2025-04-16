
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, EyeOff, HelpCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";

const assetDistribution = [
  { name: "Spot", value: 20, color: "#3498DB" },
  { name: "USD-M", value: 30, color: "#34DB9E" },
  { name: "COIN-M", value: 10, color: "#F0B90B" },
  { name: "Arbitrage Bot", value: 10, color: "#00E396" },
];

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle className="text-xl font-semibold mr-2">Total Balance</CardTitle>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHideBalance(!hideBalance)}
          >
            {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <div className="text-3xl font-semibold">
                    {hideBalance ? "••••••" : "94.836.95"}
                  </div>
                  <Button variant="ghost" className="h-6 ml-2">
                    USDT <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="mt-4 py-2 px-3 bg-crypto-lightgray rounded-md flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <span>Today's PNL</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5">
                            <Info className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Profit and Loss for today</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className={hideBalance ? "blur-sm" : "text-crypto-positive text-sm font-medium"}>
                    + $65,231.76
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  You can go to Bot account Profit and Loss analysis details page from here.
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-4">Asset Distribution</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {assetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          backgroundColor: "#1E2329",
                          borderColor: "#2B3139",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        formatter={(value) => <span className="text-xs text-crypto-text">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="spot" className="h-full">
              <TabsList className="bg-crypto-lightgray mb-4">
                <TabsTrigger value="spot">Spot</TabsTrigger>
                <TabsTrigger value="usd-m">USD©-M</TabsTrigger>
                <TabsTrigger value="coin-m">COIN-M</TabsTrigger>
                <TabsTrigger value="arbitrage">Arbitrage Bot</TabsTrigger>
              </TabsList>
              <TabsContent value="spot" className="h-[calc(100%-40px)]">
                <div className="flex flex-col gap-4 h-full">
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
              <TabsContent value="usd-m" className="h-[calc(100%-40px)]">
                <div className="flex flex-col gap-4 h-full">
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
              <TabsContent value="coin-m" className="h-[calc(100%-40px)]">
                <div className="flex flex-col gap-4 h-full">
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
              <TabsContent value="arbitrage" className="h-[calc(100%-40px)]">
                <div className="flex flex-col gap-4 h-full">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
