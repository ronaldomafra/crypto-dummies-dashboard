
import { useState } from "react";
import {
  Card,
  CardContent,
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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const assetDistribution = [
  { name: "Spot", value: 20, color: "#3498DB" },
  { name: "USD-M", value: 30, color: "#34DB9E" },
  { name: "COIN-M", value: 10, color: "#F0B90B" },
  { name: "Arbitrage Bot", value: 10, color: "#00E396" },
];

const accumulatedValueData = [
  { name: "Jan", value: 30000 },
  { name: "Feb", value: 35000 },
  { name: "Mar", value: 32000 },
  { name: "Apr", value: 40000 },
  { name: "May", value: 45000 },
  { name: "Jun", value: 52000 },
  { name: "Jul", value: 67000 },
  { name: "Aug", value: 72000 },
  { name: "Sep", value: 83000 },
  { name: "Oct", value: 94836 },
];

const TotalBalance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <Card className="bg-crypto-gray border-crypto-lightgray">
      <CardHeader className="pb-2">
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
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Balance Information */}
          <div className="w-full md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold">
                {hideBalance ? "••••••" : "94,836.95"}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 h-8 w-8"
                onClick={() => setHideBalance(!hideBalance)}
              >
                {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" className="h-6 ml-1">
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
          </div>

          {/* Charts and Data Visualization */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="assets" className="w-full">
              <TabsList className="bg-crypto-lightgray mb-4 w-full justify-start">
                <TabsTrigger value="assets">Asset Distribution</TabsTrigger>
                <TabsTrigger value="accumulated">Accumulated Value</TabsTrigger>
                <TabsTrigger value="wallets">Wallet Balances</TabsTrigger>
              </TabsList>
              
              {/* Asset Distribution Tab */}
              <TabsContent value="assets" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
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
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              
              {/* Accumulated Value Tab */}
              <TabsContent value="accumulated" className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={accumulatedValueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34DB9E" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#34DB9E" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#8E9196" />
                    <YAxis stroke="#8E9196" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
                    <RechartsTooltip 
                      contentStyle={{
                        backgroundColor: "#1E2329",
                        borderColor: "#2B3139",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Total Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#34DB9E" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
              
              {/* Wallet Balances Tab */}
              <TabsContent value="wallets">
                <Tabs defaultValue="spot" className="w-full">
                  <TabsList className="bg-crypto-lightgray mb-4 justify-start">
                    <TabsTrigger value="spot">Spot</TabsTrigger>
                    <TabsTrigger value="usd-m">USD©-M</TabsTrigger>
                    <TabsTrigger value="coin-m">COIN-M</TabsTrigger>
                    <TabsTrigger value="arbitrage">Arbitrage Bot</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="spot">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Balance (BTC)</div>
                      <div className="text-2xl font-bold">567.12345678</div>
                      <div className="text-sm text-muted-foreground">≈ $123,456.54</div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>Available Balance</div>
                        <div className="font-medium">123.45678 BTC</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Frozen Balance</div>
                        <div className="font-medium">0.00000000 BTC</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="usd-m">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Balance (USD-M)</div>
                      <div className="text-2xl font-bold">12,345.67</div>
                      <div className="text-sm text-muted-foreground">≈ $12,345.67</div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>Available Balance</div>
                        <div className="font-medium">12,345.67 USD</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Frozen Balance</div>
                        <div className="font-medium">0.00 USD</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="coin-m">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Balance (COIN-M)</div>
                      <div className="text-2xl font-bold">98.76543210</div>
                      <div className="text-sm text-muted-foreground">≈ $45,678.90</div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>Available Balance</div>
                        <div className="font-medium">98.76543210 COIN</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Frozen Balance</div>
                        <div className="font-medium">0.00000000 COIN</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="arbitrage">
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-semibold">Balance (Arbitrage)</div>
                      <div className="text-2xl font-bold">789.01234567</div>
                      <div className="text-sm text-muted-foreground">≈ $987,654.32</div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>Available Balance</div>
                        <div className="font-medium">789.01234567 BOT</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Frozen Balance</div>
                        <div className="font-medium">0.00000000 BOT</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Active Bots</div>
                        <div className="font-medium">12</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
