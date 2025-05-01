
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EyeOff, Download, Plus, Eye, ChevronUp, ChevronDown } from "lucide-react";

const TotalBalance = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Card className="bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-lg font-medium">Saldo Total</CardTitle>
            <CardDescription>Seu saldo total em todas as exchanges</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleVisibility}>
              {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {isHidden ? "Mostrar" : "Ocultar"}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="w-4 h-4" /> Exportar
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleMinimize}>
              {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              {isMinimized ? "Expandir" : "Minimizar"}
            </Button>
          </div>
        </div>
      </CardHeader>
      {!isMinimized && (
        <>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full md:w-auto grid-cols-3 h-auto p-1">
                <TabsTrigger value="all" className="text-xs py-1 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
                <TabsTrigger value="spot" className="text-xs py-1 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Spot</TabsTrigger>
                <TabsTrigger value="future" className="text-xs py-1 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Futuros</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Saldo total</div>
                    <div className="text-3xl font-bold">
                      {isHidden ? "••••••••" : "$24,309.50"}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (30d)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$2,145.30"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (hoje)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$567.89"}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="spot" className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Saldo Spot</div>
                    <div className="text-3xl font-bold">
                      {isHidden ? "••••••••" : "$12,154.75"}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (30d)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$845.50"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (hoje)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$125.40"}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="future" className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Saldo Futuros</div>
                    <div className="text-3xl font-bold">
                      {isHidden ? "••••••••" : "$12,154.75"}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (30d)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$1,299.80"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Ganhos (hoje)</div>
                      <div className="text-xl font-semibold text-trading-success">
                        {isHidden ? "••••••" : "+$442.49"}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar Exchange
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default TotalBalance;
