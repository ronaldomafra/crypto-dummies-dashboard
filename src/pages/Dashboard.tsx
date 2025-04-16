
import { Button } from "@/components/ui/button";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import TotalBalance from "@/components/dashboard/TotalBalance";
import BalancePieChart from "@/components/dashboard/BalancePieChart";
import WalletBalances from "@/components/dashboard/WalletBalances";
import BotTable from "@/components/dashboard/BotTable";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TotalBalance />
            </div>
            <div>
              <BalancePieChart />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <WalletBalances />
            </div>
            <div className="lg:col-span-2">
              <BotTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
