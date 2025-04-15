
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", ganho: 400, investido: 240 },
  { name: "Fev", ganho: 300, investido: 240 },
  { name: "Mar", ganho: 520, investido: 240 },
  { name: "Abr", ganho: 280, investido: 240 },
  { name: "Mai", ganho: 900, investido: 240 },
  { name: "Jun", ganho: 600, investido: 240 },
  { name: "Jul", ganho: 1100, investido: 500 },
];

const Ganhos = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Ganhos</h1>
            <div className="flex gap-4">
              <Button size="sm" variant="outline" className="border-crypto-lightgray">
                Relatórios
              </Button>
              <Button size="sm" variant="outline" className="border-crypto-lightgray">
                Exportar
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="total" className="w-full">
            <TabsList className="bg-crypto-lightgray">
              <TabsTrigger value="total">Ganhos Totais</TabsTrigger>
              <TabsTrigger value="mensal">Ganhos Mensais</TabsTrigger>
              <TabsTrigger value="bot">Por Bot</TabsTrigger>
              <TabsTrigger value="carteira">Por Carteira</TabsTrigger>
            </TabsList>
            <TabsContent value="total" className="pt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-crypto-gray border-crypto-lightgray">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total de Ganhos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 24.685,50</div>
                    <p className="text-xs text-crypto-positive">+15.3% desde o último mês</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-gray border-crypto-lightgray">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Ganho Médio Mensal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 3.526,50</div>
                    <p className="text-xs text-crypto-positive">+5.2% desde o último mês</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-crypto-gray border-crypto-lightgray">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23.8%</div>
                    <p className="text-xs text-crypto-positive">+2.1% desde o último mês</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 bg-crypto-gray border-crypto-lightgray">
                <CardHeader>
                  <CardTitle>Progresso de Ganhos</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: "#1E2329", borderColor: "#2B3139" }} />
                      <Area type="monotone" dataKey="ganho" stroke="#00E396" fill="rgba(0, 227, 150, 0.2)" />
                      <Area type="monotone" dataKey="investido" stroke="#3498DB" fill="rgba(52, 152, 219, 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mensal" className="pt-4">
              <Card className="bg-crypto-gray border-crypto-lightgray">
                <CardHeader>
                  <CardTitle>Ganhos Mensais</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: "#1E2329", borderColor: "#2B3139" }} />
                      <Line type="monotone" dataKey="ganho" stroke="#00E396" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bot">
              <div className="pt-4 text-center text-crypto-text">
                Selecione um bot para visualizar seus ganhos.
              </div>
            </TabsContent>
            
            <TabsContent value="carteira">
              <div className="pt-4 text-center text-crypto-text">
                Selecione uma carteira para visualizar seus ganhos.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Ganhos;
