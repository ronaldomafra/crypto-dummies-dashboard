
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { PanelLeft } from "lucide-react";

const assetDistribution = [
  { name: "Bitcoin", value: 40, color: "#F7931A" },
  { name: "Ethereum", value: 25, color: "#627EEA" },
  { name: "Stablecoins", value: 15, color: "#34DB9E" },
  { name: "Altcoins", value: 20, color: "#3498DB" },
];

const botPerformance = [
  { name: "Bot A", value: 85, color: "#00E396" },
  { name: "Bot B", value: 65, color: "#34DB9E" },
  { name: "Bot C", value: 45, color: "#3498DB" },
  { name: "Bot D", value: 30, color: "#627EEA" },
];

const marketData = [
  { name: "Jan", bitcoin: 42000, ethereum: 3200 },
  { name: "Fev", bitcoin: 44000, ethereum: 3100 },
  { name: "Mar", bitcoin: 40000, ethereum: 2800 },
  { name: "Abr", bitcoin: 38000, ethereum: 2600 },
  { name: "Mai", bitcoin: 36000, ethereum: 2400 },
  { name: "Jun", bitcoin: 42000, ethereum: 2800 },
  { name: "Jul", bitcoin: 46000, ethereum: 3400 },
];

const VisaoGeral = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Visão Geral</h1>
            <Button size="sm" variant="outline" className="border-crypto-lightgray">
              <PanelLeft className="mr-2 h-4 w-4" />
              Relatórios
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-crypto-gray border-crypto-lightgray">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 124.685,50</div>
                <p className="text-xs text-crypto-positive">+8.3% desde o último mês</p>
              </CardContent>
            </Card>
            
            <Card className="bg-crypto-gray border-crypto-lightgray">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ganho Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 24.685,50</div>
                <p className="text-xs text-crypto-positive">+15.3% desde o último mês</p>
              </CardContent>
            </Card>
            
            <Card className="bg-crypto-gray border-crypto-lightgray">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Bots Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-crypto-text">3 pausados</p>
              </CardContent>
            </Card>
            
            <Card className="bg-crypto-gray border-crypto-lightgray">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Carteiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-crypto-text">2 exchanges conectadas</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-crypto-lightgray">
              <TabsTrigger value="overview">Resumo</TabsTrigger>
              <TabsTrigger value="market">Mercado</TabsTrigger>
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-crypto-gray border-crypto-lightgray">
                  <CardHeader>
                    <CardTitle>Distribuição de Ativos</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E2329",
                            borderColor: "#2B3139",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-gray border-crypto-lightgray">
                  <CardHeader>
                    <CardTitle>Desempenho dos Bots</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={botPerformance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
                        <XAxis type="number" stroke="#6B7280" />
                        <YAxis dataKey="name" type="category" stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E2329",
                            borderColor: "#2B3139",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {botPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="market" className="pt-4">
              <Card className="bg-crypto-gray border-crypto-lightgray">
                <CardHeader>
                  <CardTitle>Preços de Mercado</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1E2329",
                          borderColor: "#2B3139",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="bitcoin" name="Bitcoin" fill="#F7931A" />
                      <Bar dataKey="ethereum" name="Ethereum" fill="#627EEA" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <div className="pt-4 text-center text-crypto-text">
                Em breve: Análise detalhada de desempenho.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;
