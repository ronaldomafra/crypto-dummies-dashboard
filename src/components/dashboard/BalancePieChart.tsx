
import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, EyeOff, Eye } from "lucide-react";
import PNLChart from "./PNLChart";

const data = [
  { name: "Spot", value: 20, color: "#3498DB" },
  { name: "USD-M", value: 30, color: "#34DB9E" },
  { name: "COIN-M", value: 10, color: "#F0B90B" },
  { name: "Robô de Arbitragem", value: 10, color: "#00E396" },
];

const BalancePieChart = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Distribuição de Ativos</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleVisibility}>
            {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {isHidden ? "Mostrar" : "Ocultar"}
          </Button>
          <Button variant="outline" size="sm" className="h-8 flex items-center gap-1" onClick={toggleMinimize}>
            {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            {isMinimized ? "Expandir" : "Minimizar"}
          </Button>
        </div>
      </CardHeader>
      {!isMinimized && (
        <CardContent className="px-0">
          <Tabs defaultValue="distribution" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="distribution">Distribuição</TabsTrigger>
              <TabsTrigger value="pnl">PNL</TabsTrigger>
            </TabsList>
            <TabsContent value="distribution" className="h-56">
              {isHidden ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Valores ocultos
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                        padding: "4px 8px",
                        color: "var(--foreground)"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
            <TabsContent value="pnl" className="h-56">
              {isHidden ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Valores ocultos
                </div>
              ) : (
                <PNLChart />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default BalancePieChart;
