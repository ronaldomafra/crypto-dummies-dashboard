
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TotalBalance from "@/components/dashboard/TotalBalance";
import BotTable from "@/components/dashboard/BotTable";
import BalancePieChart from "@/components/dashboard/BalancePieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-background">
          <TotalBalance />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <Card className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Distribuição de Ativos</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <BalancePieChart />
              </CardContent>
            </Card>
          </div>
          <BotTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
